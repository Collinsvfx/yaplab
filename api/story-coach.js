// api/story-coach.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { storyType, history, userMessage, anatomyState } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not configured on Vercel.' });
  }

  // Define the story type labels
  const STORY_TYPES = {
    built: 'I Built Something',
    failed: 'I Failed At Something',
    learned: 'I Learned Something',
    surprised: 'Something Surprised Me',
    changedMind: 'I Changed My Mind',
    opinion: 'I Have An Opinion',
    disagree: 'I Disagree With Something',
    beforeAfter: 'Before vs After',
    decision: 'One Decision Changed Everything'
  };

  const storyTypeLabel = STORY_TYPES[storyType] || 'General Storytelling';

  // Construct the system prompt
  const systemPrompt = `
You are a elite storytelling and video script coach for content creators and product designers.
Your job is NOT to write the story for the user. Your job is to guide them to discover and structure the story they lived today.
Keep the tone direct, supportive, and focused on helping them spot conflicts, visual details, and lessons.

The user is telling a story of type: "${storyTypeLabel}".

Here is the current conversation history:
${(history || []).map(m => `${m.role === 'user' ? 'User' : 'Coach'}: ${m.text}`).join('\n')}
${userMessage ? `User (latest response): ${userMessage}` : ''}

Current Extracted Story Anatomy:
- Goal: "${anatomyState?.goal || 'Not yet identified'}"
- Obstacle: "${anatomyState?.obstacle || 'Not yet identified'}"
- Attempts: "${anatomyState?.attempts || 'Not yet identified'}"
- Breakthrough: "${anatomyState?.breakthrough || 'Not yet identified'}"
- Lesson: "${anatomyState?.lesson || 'Not yet identified'}"

YOUR INSTRUCTIONS:
1. Analyze the user's latest response.
2. Determine if the story elements (Goal, Obstacle, Attempts, Breakthrough, Lesson) are identified. Update the 'extractedAnatomy' object.
3. Perform a **Story X-Ray** on the user's input:
   - Identify specific key sentences or phrases in their latest response.
   - Categorize them into types: "conflict" (adds tension/curiosity), "visual" (describes something we can see/hear), "turning_point" (the aha/breakthrough moment), "explanation" (dry summary or telling rather than showing).
   - Provide a short critique message for each. Provide up to 3 highlights.
4. Perform the **Movie Test**:
   - If the user wrote a sentence that is dry/tell-style (e.g. "The system was slow", "The onboarding failed"), highlight it as "before", write a visual "after" version showing what the camera would see (e.g. "A red error message flashed and the progress bar froze for 40 seconds"), and explain why it's better.
5. Formulate the next response/question from the coach ('coachMessage'):
   - Guide the user step-by-step through the structure: Goal -> Obstacle -> Attempts -> Breakthrough -> Lesson.
   - Do NOT ask multiple questions at once. Ask exactly one highly targeted question.
   - If they are dry or summarize too much, challenge them: "If this were a movie scene, what did your screen show?" or "What did that look like exactly?"
   - Keep your coach responses short (2-3 sentences max).
6. Decide if the session is complete ('isComplete'):
   - Set 'isComplete' to true once all 5 elements of the Anatomy are filled, OR if you have exchanged at least 4 rounds (around 8-10 messages total) and have enough to build an outline.
7. If 'isComplete' is true:
   - Generate a **Daily Story Replay**: A movie-style script breakdown summarizing the narrative beats (Goal -> Obstacle -> Attempts -> Breakthrough -> Lesson) with creative cinematic emojis.
   - Generate a **Script Outline** ('scriptOutline'): An array of sections that will be exported to the Script Builder. Each section should have a 'label' (e.g., "Hook", "Obstacle", "Attempts", "Breakthrough", "Takeaway") and a 'text' draft (summarizing what they should talk about, incorporating their answers).
8. If the session is complete, calculate the **Story Score** (0-100 values) for the following metrics:
   - 'curiosity': How well the story hooks the audience and creates open loops.
   - 'conflict': The strength of the obstacle/roadblock.
   - 'visualScenes': How much the user showed visual details instead of summarizing.
   - 'emotionalJourney': The transition from struggle/frustration to breakthrough.
   - 'lesson': The clarity and value of the takeaway.
   - 'specificity': Avoidance of vague generalities.
   - Calculate 'overall' as the average. Provide a general critique explaining how to improve these scores in their next script.

You MUST respond strictly in the requested JSON schema.
`;

  // Fallback stack of Gemini models
  const modelStack = [
    'gemini-3.5-flash',
    'gemini-3.1-flash',
    'gemini-3-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite'
  ];

  let lastError = null;

  for (const model of modelStack) {
    try {
      console.log(`Attempting story coach check with model: ${model}`);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: 'OBJECT',
                properties: {
                  coachMessage: { type: 'STRING' },
                  extractedAnatomy: {
                    type: 'OBJECT',
                    properties: {
                      goal: { type: 'STRING', nullable: true },
                      obstacle: { type: 'STRING', nullable: true },
                      attempts: { type: 'STRING', nullable: true },
                      breakthrough: { type: 'STRING', nullable: true },
                      lesson: { type: 'STRING', nullable: true }
                    },
                    required: ['goal', 'obstacle', 'attempts', 'breakthrough', 'lesson']
                  },
                  xRayHighlights: {
                    type: 'ARRAY',
                    items: {
                      type: 'OBJECT',
                      properties: {
                        text: { type: 'STRING' },
                        type: { type: 'STRING', enum: ['conflict', 'visual', 'turning_point', 'explanation', 'redundant', 'neutral'] },
                        critique: { type: 'STRING' }
                      },
                      required: ['text', 'type', 'critique']
                    }
                  },
                  movieTest: {
                    type: 'OBJECT',
                    properties: {
                      before: { type: 'STRING', nullable: true },
                      after: { type: 'STRING', nullable: true },
                      explanation: { type: 'STRING', nullable: true }
                    },
                    required: ['before', 'after', 'explanation']
                  },
                  score: {
                    type: 'OBJECT',
                    properties: {
                      overall: { type: 'INTEGER' },
                      curiosity: { type: 'INTEGER' },
                      conflict: { type: 'INTEGER' },
                      visualScenes: { type: 'INTEGER' },
                      emotionalJourney: { type: 'INTEGER' },
                      lesson: { type: 'INTEGER' },
                      specificity: { type: 'INTEGER' },
                      critique: { type: 'STRING' }
                    },
                    required: ['overall', 'curiosity', 'conflict', 'visualScenes', 'emotionalJourney', 'lesson', 'specificity', 'critique']
                  },
                  isComplete: { type: 'BOOLEAN' },
                  dailyReplay: { type: 'STRING', nullable: true },
                  scriptOutline: {
                    type: 'ARRAY',
                    items: {
                      type: 'OBJECT',
                      properties: {
                        label: { type: 'STRING' },
                        text: { type: 'STRING' }
                      },
                      required: ['label', 'text']
                    }
                  }
                },
                required: ['coachMessage', 'extractedAnatomy', 'xRayHighlights', 'movieTest', 'score', 'isComplete']
              }
            }
          })
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Model ${model} failed in story coach with status ${response.status}: ${errText}`);
        lastError = new Error(`Model ${model} error (HTTP ${response.status}): ${errText}`);
        continue;
      }

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!responseText) {
        console.warn(`Model ${model} returned empty content in story coach.`);
        lastError = new Error(`Model ${model} returned empty content.`);
        continue;
      }

      const parsedResult = JSON.parse(responseText.trim());
      parsedResult.modelUsed = model;

      return res.status(200).json(parsedResult);
    } catch (err) {
      console.error(`Error in story coach request to ${model}:`, err.message);
      lastError = err;
    }
  }

  return res.status(502).json({
    error: `All fallback models failed. Last error: ${lastError ? lastError.message : 'Unknown error'}`
  });
}
