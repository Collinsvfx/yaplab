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

  // We define the fallback stack of Gemini models using only Flash & Flash-Lite models
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
      console.log(`Attempting alignment check with model: ${model}`);
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
        console.warn(`Model ${model} failed with status ${response.status}: ${errText}`);
        lastError = new Error(`Model ${model} error (HTTP ${response.status}): ${errText}`);
        continue; // Try the next model in the stack
      }

      const data = await response.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!responseText) {
        console.warn(`Model ${model} returned empty content.`);
        lastError = new Error(`Model ${model} returned empty content.`);
        continue;
      }

      const alignmentResult = JSON.parse(responseText.trim());
      // Append which model was successfully used
      alignmentResult.modelUsed = model;
      
      return res.status(200).json(alignmentResult);
    } catch (err) {
      console.error(`Error during request to ${model}:`, err.message);
      lastError = err;
    }
  }

  // If we reach here, all models in the stack failed
  return res.status(502).json({
    error: `All fallback models failed. Last error: ${lastError ? lastError.message : 'Unknown error'}`
  });
}
