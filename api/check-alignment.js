// api/check-alignment.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { emotionalEntry, whoFeels, hookTest, fullScriptText } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not configured on Vercel.' });
  }

  const prompt = `
You are an expert script writing coach. Analyze the alignment between the writer's pre-script planning goals and their actual script dialogue.

Pre-Script Goals:
1. Emotional Entry Point (The feeling behind the topic): "${emotionalEntry || 'Not specified'}"
2. Target Audience (Who feels this): "${whoFeels || 'Not specified'}"
3. Hook (The title rewritten as a hook): "${hookTest || 'Not specified'}"

Dialogue Script Content:
"${fullScriptText || 'No dialogue script written yet.'}"

Analyze if the script dialogue stays true to the target audience, emotional motivation, and the hook. Suggest how to better align the text. Output your assessment in JSON structure.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'OBJECT',
              properties: {
                status: {
                  type: 'STRING',
                  enum: ['strong_match', 'partial_match', 'mismatch']
                },
                critique: { type: 'STRING' },
                suggestions: {
                  type: 'ARRAY',
                  items: { type: 'STRING' }
                }
              },
              required: ['status', 'critique', 'suggestions']
            }
          }
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: `Gemini API Error: ${errText}` });
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      return res.status(500).json({ error: 'No response from Gemini model.' });
    }

    const alignmentResult = JSON.parse(responseText.trim());
    return res.status(200).json(alignmentResult);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
