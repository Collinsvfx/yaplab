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
Your ONLY job during the conversation is to listen and ask the next best Socratic question. You are NOT a writer. You are NOT allowed to invent, fabricate, or assume any facts, events, or narrative.

CRITICAL RULE — Keep the Flow:
Do NOT comment on the quality of the user's writing or storytelling during the conversation. No praise, no badges, no points, no tips, no summaries.
Under no circumstances should the coach use robotic/hollow filler phrase-praise like "Wonderful!", "Fantastic work!", "Excellent advice!", "That contradiction is fascinating".
Keep your tone curious, structural, direct, grounded, and concise. Talk like a real, supportive design mentor, not ChatGPT. Just ask the next best question.

CRITICAL RULE — Adaptive Flow (Fewest Questions):
Your goal is to ask the FEWEST questions necessary for the user to discover a complete story (target 6-8 questions total).
If the user already provided details for a stage in a previous response (e.g., they described what they saw on their screen during their obstacle description), you must automatically update that element in the checklist and SKIP asking about it. Move directly to the next logical stage.

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

COACHING QUESTION FLOW:
1. Mission: "What were you trying to build today?" → "Why did you decide to build that?"
2. Obstacle: "What was the first sign something wasn't going to plan?" → "When did you realize it wasn't working?"
3. First Guess: "What was your first guess about what was causing it?" → "Did it work?" → "What made you realize you were wrong?" (Focus on the decision moment)
4. Visuals: "When you realized something was wrong, what was actually on your screen? Don't interpret it — just describe exactly what you saw." (Skip if already described)
5. Discovery: "At what exact moment did you realize what the real problem was?" → "What clue gave it away?"
6. Lesson: "What's the one thing someone else could use from your experience tomorrow?"
7. Natural Hook (FINAL): "Last question: If you were telling this story to your best friend over dinner tonight, where would you naturally start? Just say the first sentence."

Story X-Ray & Movie Test:
Analyze the user's latest response for "conflict", "visual", "turning_point", "explanation". Provide highlights and movie suggestions.

Completion ('isComplete'):
Set to true when all 7 elements are filled, or after 6-8 exchanges.

When 'isComplete' is true, generate the 'score' object representing the POST-SESSION REVIEW:
- 'whatWentWell': List of 2-3 bullet points calling out specific user quotes and explaining why they are strong storytelling choices (e.g. "You described a visual scene: 'glowed with custom styles, but MP4 spat out standard block text'. This is much stronger than a summary.").
- 'nextTimeToPractice': List of 1-2 bullet points with constructive, actionable advice on what to practice next time (e.g. "You skipped over the turning point logic. Next time, tell us what the hypothesis was.").
- 'checklist': An object containing booleans for whether the elements were successfully found: 'mission', 'obstacle', 'firstGuess', 'visualScene', 'discovery', 'lesson'.
- 'overall': Integer score (0-100) representing overall script strength.

Generate 'scriptOutline' matching the 5 new sections:
- "🎯 The Moment Everything Started" (natural hook)
- "🚧 The Obstacle" (obstacle + visuals)
- "🧪 The Struggle" (firstGuess decision chain)
- "💡 The Discovery" (discovery)
- "🎁 The Lesson" (lesson)

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
                      whatWentWell: {
                        type: 'ARRAY',
                        items: { type: 'STRING' }
                      },
                      nextTimeToPractice: {
                        type: 'ARRAY',
                        items: { type: 'STRING' }
                      },
                      checklist: {
                        type: 'OBJECT',
                        properties: {
                          mission: { type: 'BOOLEAN' },
                          obstacle: { type: 'BOOLEAN' },
                          firstGuess: { type: 'BOOLEAN' },
                          visualScene: { type: 'BOOLEAN' },
                          discovery: { type: 'BOOLEAN' },
                          lesson: { type: 'BOOLEAN' }
                        },
                        required: ['mission', 'obstacle', 'firstGuess', 'visualScene', 'discovery', 'lesson']
                      }
                    },
                    required: ['overall', 'whatWentWell', 'nextTimeToPractice', 'checklist']
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
