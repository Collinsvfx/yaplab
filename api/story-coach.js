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
    solvedProblem:    'I Solved a Problem',
    builtSomething:   'I Built Something New',
    madeProgress:     'I Made Progress',
    learnedSomething: 'I Learned Something',
    surprisedMe:      'Something Surprised Me',
    changedMind:      'I Changed My Mind',
    haveOpinion:      'I Have An Opinion',
    dayInLife:        'A Day In My Life'
  };

  const storyTypeLabel = STORY_TYPES[storyType] || 'General Storytelling';

  // Per-type question flows
  const QUESTION_FLOWS = {
    solvedProblem: `
QUESTION FLOW (I Solved a Problem):
1. "What were you trying to accomplish?"
2. "What problem appeared?" → "When did you first notice something was wrong?"
3. "What was your first assumption about what was causing it?" → "Why was it wrong?"
4. "What was actually on your screen when you realized it wasn't working? Describe exactly what you saw."
5. "What helped you finally solve it?" → "What was the exact moment the fix clicked?"
6. "What did you learn that someone else could use tomorrow?"
7. FINAL: "If you were telling this to a friend over dinner, what's the first sentence you'd say?"`,

    builtSomething: `
QUESTION FLOW (I Built Something New):
1. "What did you build?"
2. "Why did you decide to build it?" → "What was missing before this existed?"
3. "What part are you most proud of? What makes it work well?"
4. "What was surprisingly easy — something you expected to struggle with?"
5. "What's still unfinished or imperfect?"
6. "What's next for this?"
7. FINAL: "If you were telling a friend about this tonight, where would you start?"`,

    madeProgress: `
QUESTION FLOW (I Made Progress):
1. "What changed since yesterday / last week?"
2. "What's now working that wasn't before?"
3. "What are you most excited about right now?"
4. "What's the one thing blocking you from moving faster?"
5. "What's the next milestone you're working toward?"
6. FINAL: "If you were posting about this tonight, what would be the first sentence?"`,

    learnedSomething: `
QUESTION FLOW (I Learned Something):
1. "What did you learn?"
2. "What made you look into this in the first place?"
3. "What did you think before you learned this?"
4. "What was the specific moment the new insight landed for you?"
5. "How does this change what you'll do differently?"
6. "Who most needs to hear this, and why?"
7. FINAL: "How would you explain this to a curious friend in one sentence?"`,

    surprisedMe: `
QUESTION FLOW (Something Surprised Me):
1. "What happened that surprised you?"
2. "What were you expecting instead?"
3. "What was your first reaction when you saw it?"
4. "Why do you think it happened — what was the real reason?"
5. "What did you do differently because of this?"
6. "What should other people know about this?"
7. FINAL: "If you were telling this story tonight, where would you start?"`,

    changedMind: `
QUESTION FLOW (I Changed My Mind):
1. "What did you change your mind about?"
2. "What did you believe before?"
3. "What happened that made you question it?"
4. "Was there a specific moment, piece of evidence, or conversation that tipped you?"
5. "What do you believe now — and why is it better?"
6. "What would you tell your past self?"
7. FINAL: "How would you summarize this flip in one sentence?"`,

    haveOpinion: `
QUESTION FLOW (I Have An Opinion):
1. "What's your opinion? State it plainly."
2. "What do most people believe instead — and why?"
3. "What's the specific evidence or experience that formed your view?"
4. "Where does your opinion have limits? Where could you be wrong?"
5. "Who most needs to hear this, and what would change if they believed it?"
6. FINAL: "Say your opinion out loud as if you were starting a LinkedIn post with it."`,

    dayInLife: `
QUESTION FLOW (A Day In My Life):
1. "Walk me through your day — what happened first?"
2. "What was the highlight — the moment that stood out most?"
3. "What was harder than expected today?"
4. "What surprised you about how the day went?"
5. "What did you accomplish that you're proud of?"
6. "What's the one thing you'd do differently tomorrow?"
7. FINAL: "If someone asked 'how was your day?' at dinner tonight, what's the honest first sentence?"`,
  };

  const questionFlow = QUESTION_FLOWS[storyType] || `
QUESTION FLOW (General):
1. "What happened?"
2. "What were you expecting instead?"
3. "What was the turning point?"
4. "What did you learn?"
5. FINAL: "How would you start this story at a dinner table?"`;

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
If the user already provided details for a stage in a previous response, automatically update that element in the anatomy and SKIP asking about it. Move directly to the next logical stage.

The user is telling a story of type: "${storyTypeLabel}".

${questionFlow}

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

Story X-Ray & Movie Test:
Analyze the user's latest response for "conflict", "visual", "turning_point", "explanation". Provide highlights and movie suggestions.

Completion ('isComplete'):
Set to true when all relevant anatomy elements are filled for this story type, or after 6-8 exchanges.

When 'isComplete' is true, generate the 'score' object representing the POST-SESSION REVIEW:
- 'whatWentWell': List of 2-3 bullet points calling out specific user quotes and explaining why they are strong storytelling choices.
- 'nextTimeToPractice': List of 1-2 bullet points with constructive, actionable advice on what to practice next time.
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
