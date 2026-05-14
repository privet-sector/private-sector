const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages, system } = req.body;
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1024, system, messages })
  });
  const data = await r.json();
  console.log('Anthropic response:', JSON.stringify(data));
  res.json(data);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
