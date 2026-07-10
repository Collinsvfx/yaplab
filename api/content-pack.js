// api/content-pack.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { source, storyType, answers, anatomy, history } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
  }

  const STORY_TYPE_LABELS = {
    solvedProblem:    'I Solved a Problem',
    builtSomething:   'I Built Something New',
    madeProgress:     'I Made Progress',
    learnedSomething: 'I Learned Something',
    surprisedMe:      'Something Surprised Me',
    changedMind:      'I Changed My Mind',
    haveOpinion:      'I Have An Opinion',
    dayInLife:        'A Day In My Life'
  };

  const storyTypeLabel = STORY_TYPE_LABELS[storyType] || 'General Story';

  let storyContext = '';

  if (source === 'quicklog') {
    const filledAnswers = (answers || []).filter(a => a.a && a.a.trim());
    storyContext = filledAnswers.map(a => `Q: ${a.q}\nA: ${a.a}`).join('\n\n');
  } else {
    const a = anatomy || {};
    const lines = [];
    if (a.mission)     lines.push(`Mission: ${a.mission}`);
    if (a.obstacle)    lines.push(`Obstacle: ${a.obstacle}`);
    if (a.firstGuess)  lines.push(`First Guess: ${a.firstGuess}`);
    if (a.visuals)     lines.push(`Visual Scene: ${a.visuals}`);
    if (a.discovery)   lines.push(`Discovery: ${a.discovery}`);
    if (a.lesson)      lines.push(`Lesson: ${a.lesson}`);
    if (a.outcome)     lines.push(`Outcome: ${a.outcome}`);
    if (a.naturalHook) lines.push(`Natural Hook: ${a.naturalHook}`);
    storyContext = lines.join('\n');
    if (history && history.length > 0) {
      const recent = history.slice(-8);
      storyContext += '\n\nConversation:\n' + recent.map(m => `${m.role === 'user' ? 'User' : 'Coach'}: ${m.text}`).join('\n');
    }
  }

  const systemPrompt = `You are a social media content strategist and ghostwriter for digital creators.

Your job: take one real creator experience and generate 4 distinct, platform-native content pieces.
Each piece MUST be rooted in the specific details, facts, decisions, and quotes from the story below.
Do NOT add facts, numbers, or details that were not in the story.
Write in first person as the creator. Be specific. Be human. Avoid generic motivational fluff.

Story Type: "${storyTypeLabel}"

Story Content:
${storyContext}

Generate all 4 formats:

1. SHORT-FORM SCRIPT (60 seconds, for YouTube Short / TikTok / Reels)
   - Start with a bold verbal hook (first sentence must grab attention)
   - 8-10 punchy lines, each on its own line
   - End with a clear payoff or call to action
   - Conversational, not essay-like

2. LINKEDIN POST
   - Open with a scroll-stopping first line (no "I am excited to share")
   - 150-250 words
   - Use white space and short paragraphs
   - End with a question or clear insight
   - Professional but personal tone

3. X (TWITTER) THREAD
   - First tweet: bold hook that stands alone
   - 5-8 tweets total
   - Each tweet: max 280 characters, punchy
   - Thread should build to a clear conclusion
   - Return as an array of tweet strings

4. YOUTUBE OUTLINE
   - Intro hook (what the video opens with)
   - Setup (context for the viewer)
   - Conflict (the problem or tension)
   - Discovery (the turning point)
   - Lesson (the takeaway)
   - Outro CTA
   - Return as a formatted string with section labels

Respond STRICTLY in the requested JSON schema.`;

  const modelStack = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ];

  let lastError = null;

  for (const model of modelStack) {
    try {
      console.log(`[ContentPack] Trying model: ${model}`);
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
                  shortFormScript: { type: 'STRING' },
                  linkedInPost:    { type: 'STRING' },
                  xThread: { type: 'ARRAY', items: { type: 'STRING' } },
                  youtubeOutline: { type: 'STRING' }
                },
                required: ['shortFormScript', 'linkedInPost', 'xThread', 'youtubeOutline']
              }
            }
          })
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        lastError = new Error(`Model ${model} error (HTTP ${response.status}): ${errText}`);
        continue;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) { lastError = new Error(`Model ${model} returned empty content.`); continue; }

      const parsed = JSON.parse(text.trim());
      parsed.modelUsed = model;
      return res.status(200).json(parsed);

    } catch (err) {
      console.error(`[ContentPack] Error with ${model}:`, err.message);
      lastError = err;
    }
  }

  return res.status(502).json({
    error: `All models failed. Last error: ${lastError ? lastError.message : 'Unknown'}`
  });
}
