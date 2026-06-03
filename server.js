const express = require('express');
const path = require('path');
const app = express();
app.use(express.json({limit: '10mb'}));

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, system } = req.body;

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        system: system,
        messages: messages
      })
    });

    const data = await r.json();

    if (data.error) {
      const msg = data.error.type === 'rate_limit_error'
        ? 'الطلبات كثيرة — انتظر دقيقة ثم حاول مجدداً.'
        : 'خطأ: ' + data.error.message;
      return res.json({ content: [{ type: 'text', text: msg }] });
    }

    res.json(data);
  } catch (e) {
    res.json({ content: [{ type: 'text', text: 'حدث خطأ في الاتصال.' }] });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
