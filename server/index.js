const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/generate', async (req, res) => {
  const {
    recipientName,
    recipientContact,
    role,
    goal,
    tone,
    format,
  } = req.body;

  const prompt = `
You are an AI assistant helping a job seeker write a ${tone} ${format === 'linkedin' ? 'LinkedIn message' : 'cold email'}.

They are reaching out to ${recipientName} (${recipientContact}) because they are seeking a ${role} role.

Their specific goal is: ${goal}. 
Assume they are not offering a job — they are asking for support (e.g. a referral, advice, or mentorship).

Write a short, clear, and professional message with a warm tone and zero fluff.
End with a soft call to action.
`;


  try {
    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'phi3',
        prompt,
        stream: false,
      }),
    });

    const data = await ollamaRes.json();
    res.json({ message: data.response });
  } catch (err) {
    console.error('❌ Error talking to Ollama:', err);
    res.status(500).json({ error: 'Failed to generate message' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
