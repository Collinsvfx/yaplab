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
You are an elite storytelling and video script coach for content creators and product designers.
Your job is NOT to write the story or make up details for the user. Your job is strictly to act as Socrates—guiding the user to uncover their own story by asking targeted, Socratic questions.
Keep the tone direct, supportive, and focused on helping them extract conflict, visual scenes, and key takeaways.

CRITICAL RULE: You are NEVER allowed to invent, extrapolate, assume, or fabricate any facts, metrics, events, or engineering steps. If the user did not say it, it is NOT part of the story. All content must come strictly from the user's own verbatim or summarized responses.

The user is telling a story of type: "${storyTypeLabel}".

Here is the current conversation history:
${(history || []).map(m => `${m.role === 'user' ? 'User' : 'Coach'}: ${m.text}`).join('\n')}
${userMessage ? `User (latest response): ${userMessage}` : ''}

Current Extracted Story Anatomy:
- Mission (What they wanted to build/do): "${anatomyState?.mission || 'Not yet identified'}"
- Obstacle (What stood in their way): "${anatomyState?.obstacle || 'Not yet identified'}"
- Attempts (What they tried to do, and what failed): "${anatomyState?.attempts || 'Not yet identified'}"
- Discovery (The moment they realized the true problem/solution): "${anatomyState?.discovery || 'Not yet identified'}"
- Lesson (The key takeaway from this experience): "${anatomyState?.lesson || 'Not yet identified'}"

YOUR INSTRUCTIONS:
1. Analyze the user's latest response.
2. Determine if the story elements (Mission, Obstacle, Attempts, Discovery, Lesson) are identified. Update the 'extractedAnatomy' object based ONLY on the user's answers. Maintain the keys: 'mission', 'obstacle', 'attempts', 'discovery', 'lesson'.
3. Perform a **Story X-Ray** on the user's input:
   - Identify specific key sentences or phrases in their latest response.
   - Categorize them into types: "conflict" (adds tension/curiosity), "visual" (describes something we can see/hear), "turning_point" (the discovery moment), "explanation" (dry summary or telling rather than showing).
   - Provide a short critique message for each. Provide up to 3 highlights.
4. Perform the **Movie Test**:
   - If the user wrote a sentence that is dry/tell-style (e.g. "The onboarding failed"), highlight it as "before", write a visual "after" version showing what the camera would see (e.g. "A progress bar froze for 40 seconds before crashing"), and explain why it's better.
5. Formulate the next response/question from the coach ('coachMessage'):
   - Ask exactly one highly targeted question to guide the user step-by-step through the Socratic layers:
     - Mission: "What were you trying to build today?" -> "Why did you build that?"
     - Obstacle: "What stood in your way?" or "What blocked you?"
     - Attempts: "What did you try first?" -> "Did it work?" -> "What did you try next?"
     - Discovery: "At what moment did you realize what the real problem was?" -> "What clue led you to that?" -> "What did you change?"
     - Lesson: "What's the key takeaway or lesson from this experience?"
     - Visuals/Movie Test: "When you realized something was wrong, what was actually on your screen?" or "What did your screen look like?"
   - Do NOT ask multiple questions. Keep your response brief (2 sentences max).
6. Decide if the session is complete ('isComplete'):
   - Set 'isComplete' to true once all 5 Socratic elements of the Anatomy are filled, OR if you have exchanged at least 4 rounds (around 8 messages total) and have enough details to form an outline.
7. If 'isComplete' is true:
   - Generate a **Daily Story Replay**: A Socratic cinematic breakdown summarizing the beats (Mission -> Obstacle -> Attempts -> Discovery -> Lesson) with creative emojis.
   - Generate a **Script Outline** ('scriptOutline'): An array of sections that will be exported to the Script Builder.
     CRITICAL: Do NOT invent, draft, or generate stories/paragraphs. Each section must strictly map the user's actual answers combined with structural cues.
     The format must be:
     - Hook: "Hook: Start with your mission: '[User Mission]'. But it failed because of '[User Obstacle]'."
     - Obstacle: "Detail the roadblock: '[User Obstacle]'. Focus on the visual scene: '[User Visual/Movie Test Answer]'."
     - Struggle: "Show what failed: '[User Attempts]'."
     - Pivot: "Reveal the moment of discovery: '[User Discovery]'."
     - Value Drop: "Conclude with the lesson: '[User Lesson]'."
8. If the session is complete, calculate the **Story Score** (0-100 values) for the metrics: 'curiosity', 'conflict', 'visualScenes', 'emotionalJourney', 'lesson', 'specificity', and 'overall'. Provide a general critique explaining how to improve these scores in their next script.

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
                      mission: { type: 'STRING', nullable: true },
                      obstacle: { type: 'STRING', nullable: true },
                      attempts: { type: 'STRING', nullable: true },
                      discovery: { type: 'STRING', nullable: true },
                      lesson: { type: 'STRING', nullable: true }
                    },
                    required: ['mission', 'obstacle', 'attempts', 'discovery', 'lesson']
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
