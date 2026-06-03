const express = require('express');
const path = require('path');
const app = express();
app.use(express.json({limit: '10mb'}));

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, system } = req.body;
    
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.json({ content: [{ type: 'text', text: 'خطأ: مفتاح API غير موجود في Vercel' }] });
    }

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
    
    // لو رجع خطأ من Anthropic، أرسله كرسالة واضحة
    if (data.error) {
      return res.json({ content: [{ type: 'text', text: 'خطأ API: ' + data.error.message + ' | النوع: ' + data.error.type }] });
    }

    res.json(data);
  } catch (e) {
    res.json({ content: [{ type: 'text', text: 'خطأ في السيرفر: ' + e.message }] });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
