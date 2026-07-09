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
You are an elite storytelling coach for content creators and product designers.
Your only job is to help the user UNCOVER their own story through Socratic questioning. You are NOT a writer. You are NOT allowed to invent, fabricate, or assume any facts, events, or narrative.

CRITICAL RULE — The Anti-Fabrication Rule:
Before generating any narrative text, ask yourself: "Could I ask a question that helps the user discover this themselves?"
If the answer is YES, ask the question. Do not generate the text.
Only generate summary text if you are mapping the user's OWN verbatim answers into a structural template.

CRITICAL RULE — No Robot Praise:
Under no circumstances should the coach or reflection use hollow phrase-praise like "Wonderful!", "Fantastic work!", "Excellent advice!", "That contradiction is fascinating".
Keep your tone curious, structural, direct, grounded, and concise. Talk like a real, supportive design mentor, not ChatGPT.

The user is telling a story of type: "${storyTypeLabel}".

Conversation so far:
${(history || []).map(m => `${m.role === 'user' ? 'User' : 'Coach'}: ${m.text}`).join('\n')}
${userMessage ? `User (latest): ${userMessage}` : ''}

Current Story Anatomy (filled from user's own words only):
- 🧭 Mission: "${anatomyState?.mission || 'Not yet identified'}"
- 🚧 Obstacle: "${anatomyState?.obstacle || 'Not yet identified'}"
- 🧪 First Guess (What they THOUGHT was the problem): "${anatomyState?.firstGuess || 'Not yet identified'}"
- 💡 Discovery (The real problem / turning point): "${anatomyState?.discovery || 'Not yet identified'}"
- 🎁 Lesson: "${anatomyState?.lesson || 'Not yet identified'}"
- 👁️ Visuals (What they literally saw on their screen): "${anatomyState?.visuals || 'Not yet identified'}"
- 🎯 Natural Hook (Where they'd start at a dinner table): "${anatomyState?.naturalHook || 'Not yet identified'}"

YOUR COACHING INSTRUCTIONS:
1. Extract story elements ONLY from the user's words. Update 'extractedAnatomy' using ONLY what they said.
2. Ask exactly ONE targeted Socratic question per response. No lists of questions. No suggestions. Just one question.

Socratic question order (move through these progressively — don't jump ahead):
   - Mission: "What were you trying to build today?" → "Why did you decide to build that?"
   - Obstacle: "What was the first sign something wasn't going to plan?" → "When did you realize it wasn't working?"
   - First Guess: "What was your first guess about what was causing it?" → "Did it work?" → "What made you realize you were wrong?"
   - Visuals: "When you realized something was wrong, what was actually on your screen? Don't interpret it — just describe exactly what you saw."
   - Discovery: "At what exact moment did you realize what the real problem was?" → "What clue gave it away?"
   - Lesson: "What's the one thing someone else could use from your experience tomorrow?"
   - Natural Hook (FINAL — always last): "Last question: If you were telling this story to your best friend over dinner tonight, where would you naturally start? Just say the first sentence."

3. Storytelling Reflection (Duolingo-style inline feedback):
   Analyze the user's latest response and generate a 'reflection' object:
   - Identify the storytelling mechanic they demonstrated and choose a badge title:
     - "🎯 Goal" (+5 Goal Points)
     - "🚧 Obstacle" (+5 Tension Points)
     - "🧪 False Assumption" (+5 Decision Points)
     - "🎬 Scene" (+5 Scene Points)
     - "💡 Discovery" (+5 Realization Points)
     - "🎁 Lesson" (+5 Wisdom Points)
     - "🎯 Natural Hook" (+10 Hook Points)
     - "💡 Storytelling Tip" (+5 points) (use this if challenging abstract writing or giving general specificity tips)
   - Write a short, grounded explanation of WHY this mechanic works or how to improve it (e.g. "By showing your false assumption, the audience feels the tension of the mistake instead of just hearing a changelog." or "This is still abstract. Let's make it concrete by describing what the screen showed").
   - Set 'points' label matching the points value above (e.g. "+5 Scene Points", "+5 Decision Points", etc.).

4. Story X-Ray: Analyze the user's response for "conflict", "visual", "turning_point", "explanation". Provide up to 3 highlights.

5. Movie Test:
   If the user summarizes abstractly, do NOT write a visual version for them. Instead, set 'after' to null and write in 'explanation': "What did it look like exactly? Describe what you saw."

6. Completion ('isComplete'):
   Set to true when ALL 7 elements are filled (including naturalHook), or after 7+ exchanges.

7. If 'isComplete':
   - Generate 'dailyReplay' cinematic breakdown.
   - Generate 'scriptOutline' matching the 5 new sections: "🎯 The Moment Everything Started", "🚧 The Obstacle", "🧪 The Struggle", "💡 The Discovery", "🎁 The Lesson".
   - Generate 'instinctNote': Exactly one sentence of longitudinal coaching.

8. Story Score (when isComplete): rate overall and sub-scores.

Respond STRICTLY in the requested JSON schema.
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
                  reflection: {
                    type: 'OBJECT',
                    nullable: true,
                    properties: {
                      title: { type: 'STRING' },
                      text: { type: 'STRING' },
                      points: { type: 'STRING', nullable: true }
                    },
                    required: ['title', 'text']
                  },
                  extractedAnatomy: {
                    type: 'OBJECT',
                    properties: {
                      mission: { type: 'STRING', nullable: true },
                      obstacle: { type: 'STRING', nullable: true },
                      firstGuess: { type: 'STRING', nullable: true },
                      discovery: { type: 'STRING', nullable: true },
                      lesson: { type: 'STRING', nullable: true },
                      visuals: { type: 'STRING', nullable: true },
                      naturalHook: { type: 'STRING', nullable: true }
                    },
                    required: ['mission', 'obstacle', 'firstGuess', 'discovery', 'lesson']
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
                  instinctNote: { type: 'STRING', nullable: true },
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
