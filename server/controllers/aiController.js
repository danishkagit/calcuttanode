const ZEN_KEY = process.env.OPENCODE_ZEN_KEY || '';
const ZEN_BASE = 'https://opencode.ai/zen/v1';

if (!ZEN_KEY) {
  console.warn('AI Chat: OPENCODE_ZEN_KEY not set. Add it in Render dashboard.');
}

const modelList = [
  { id: 'deepseek-v4-flash-free', name: 'DeepSeek V4 Flash Free', icon: '🔍', tier: 1 },
  { id: 'mimo-v2.5-free', name: 'MiMo V2.5 Free', icon: '🧠', tier: 1 },
  { id: 'north-mini-code-free', name: 'North Mini Code Free', icon: '⚡', tier: 1 },
  { id: 'nemotron-3-ultra-free', name: 'Nemotron 3 Ultra Free', icon: '🚀', tier: 1 },
];

const rateLimitStore = new Map();
const RATE_LIMIT = 20;
const RATE_WINDOW = 60000;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

async function callModel(modelId, messages) {
  if (!ZEN_KEY) throw new Error('AI service not configured (missing API key)');
  const res = await fetch(`${ZEN_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ZEN_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: modelId, messages, stream: false }),
  });
  const data = await res.json();
  if (!res.ok) {
    const errMsg = data.error?.message || data.error || `HTTP ${res.status}`;
    throw new Error(errMsg);
  }
  return data.choices?.[0]?.message?.content || '';
}

export const chat = async (req, res) => {
  try {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
      return res.status(429).json({ message: 'Rate limit exceeded. Try again later.' });
    }

    const { message, history = [], model: preferredModel } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'Message is required' });
    }

    const messages = [
      { role: 'system', content: 'You are Calcutta Node AI, a helpful assistant for Calcutta Node IT Services based in Champdani, Hooghly, West Bengal. You help with tech questions, IT support, web development, digital marketing, and general queries. Be concise and helpful. Answer in English or Hindi/Bengali as appropriate.' },
      ...history.slice(-10),
      { role: 'user', content: message },
    ];

    const modelsToTry = preferredModel
      ? [...modelList.filter(m => m.id === preferredModel), ...modelList.filter(m => m.id !== preferredModel)]
      : modelList;

    const errors = [];
    for (const model of modelsToTry) {
      try {
        const content = await callModel(model.id, messages);
        return res.json({
          reply: content,
          model: { id: model.id, name: model.name, provider: 'opencode-zen' },
        });
      } catch (err) {
        errors.push(`${model.name}: ${err.message}`);
        continue;
      }
    }

    res.status(503).json({
      message: 'All AI models are currently unavailable. Please try again later.',
      errors: errors.slice(0, 3),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getModels = async (req, res) => {
  res.json(modelList);
};

export const chatStream = async (req, res) => {
  try {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
      return res.status(429).json({ message: 'Rate limit exceeded. Try again later.' });
    }

    const { message, history = [], model: preferredModel } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'Message is required' });
    }

    const messages = [
      { role: 'system', content: 'You are Calcutta Node AI, a helpful assistant for Calcutta Node IT Services based in Champdani, Hooghly, West Bengal. You help with tech questions, IT support, web development, digital marketing, and general queries. Be concise and helpful. Answer in English or Hindi/Bengali as appropriate.' },
      ...history.slice(-10),
      { role: 'user', content: message },
    ];

    const modelsToTry = preferredModel
      ? [...modelList.filter(m => m.id === preferredModel), ...modelList.filter(m => m.id !== preferredModel)]
      : modelList;

    const errors = [];
    for (const model of modelsToTry) {
      try {
        const response = await fetch(`${ZEN_BASE}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${ZEN_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ model: model.id, messages, stream: true }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error?.message || errData.error || `HTTP ${response.status}`);
        }

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        res.write(`data: ${JSON.stringify({ model: { id: model.id, name: model.name } })}\n\n`);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || '';
                if (content) {
                  res.write(`data: ${JSON.stringify({ content })}\n\n`);
                }
              } catch {}
            }
          }
        }

        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
        return;
      } catch (err) {
        errors.push(`${model.name}: ${err.message}`);
        continue;
      }
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.write(`data: ${JSON.stringify({ error: 'All models unavailable', errors: errors.slice(0, 3) })}\n\n`);
    res.end();
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};
