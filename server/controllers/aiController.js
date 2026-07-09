const ZEN_KEY = process.env.OPENCODE_ZEN_KEY || '';
const ZEN_BASE = 'https://opencode.ai/zen/v1';

if (!ZEN_KEY) {
  console.warn('AI Chat: OPENCODE_ZEN_KEY not set. Add it in Render dashboard.');
}

const modelList = [
  { id: 'deepseek-v4-flash-free', name: 'DeepSeek V4 Flash Free', icon: '🔍', color: '#7EBBC5', tier: 1, provider: 'opencode' },
  { id: 'mimo-v2.5-free', name: 'MiMo V2.5 Free', icon: '🧠', color: '#543A67', tier: 1, provider: 'opencode' },
  { id: 'north-mini-code-free', name: 'North Mini Code Free', icon: '⚡', color: '#FFD700', tier: 1, provider: 'opencode' },
  { id: 'nemotron-3-ultra-free', name: 'Nemotron 3 Ultra Free', icon: '🚀', color: '#FF6B6B', tier: 1, provider: 'opencode' },
  { id: 'hy3-free', name: 'Hy3 Free', icon: '🌊', color: '#4FC3F7', tier: 1, provider: 'opencode' },
  { id: 'big-pickle', name: 'Big Pickle Free', icon: '🥒', color: '#81C784', tier: 1, provider: 'opencode' },
  { id: 'antigravity-gemini-3.1-pro', name: 'Gemini 3.1 Pro', icon: '🌟', color: '#4285F4', tier: 1, provider: 'antigravity' },
  { id: 'antigravity-gemini-3-flash', name: 'Gemini 3 Flash', icon: '⚡', color: '#34A853', tier: 1, provider: 'antigravity' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', icon: '💎', color: '#EA4335', tier: 1, provider: 'antigravity' },
  { id: 'antigravity-claude-sonnet-4-6', name: 'Claude Sonnet 4.6', icon: '🎯', color: '#FBBC04', tier: 1, provider: 'antigravity' },
  { id: 'antigravity-claude-opus-4-6-thinking', name: 'Claude Opus 4.6 Thinking', icon: '🧠', color: '#8E24AA', tier: 1, provider: 'antigravity' },
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

const MODEL_TIMEOUT = 30000;

async function fetchWithTimeout(url, options, timeout = MODEL_TIMEOUT) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

async function callModel(modelId, messages) {
  if (!ZEN_KEY) throw new Error('AI service not configured (missing API key)');
  const res = await fetchWithTimeout(`${ZEN_BASE}/chat/completions`, {
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
      { role: 'system', content: 'You are Calcutta Node AI, a helpful assistant for Calcutta Node IT Services based in Kolkata, India. You help with tech questions, IT support, web development, digital marketing, and general queries. Be concise and helpful. Answer in English.' },
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
          model: { id: model.id, name: model.name, provider: model.provider, color: model.color, icon: model.icon },
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
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
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
      { role: 'system', content: 'You are Calcutta Node AI, a helpful assistant for Calcutta Node IT Services based in Kolkata, India. You help with tech questions, IT support, web development, digital marketing, and general queries. Be concise and helpful. Answer in English.' },
      ...history.slice(-10),
      { role: 'user', content: message },
    ];

    const modelsToTry = preferredModel
      ? [...modelList.filter(m => m.id === preferredModel), ...modelList.filter(m => m.id !== preferredModel)]
      : modelList;

    const errors = [];
    let streamStarted = false;

    for (const model of modelsToTry) {
      try {
        const response = await fetchWithTimeout(`${ZEN_BASE}/chat/completions`, {
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
        streamStarted = true;

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        res.write(`data: ${JSON.stringify({ model: { id: model.id, name: model.name, provider: model.provider, color: model.color, icon: model.icon } })}\n\n`);

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
        if (streamStarted) {
          res.write(`data: ${JSON.stringify({ error: `Stream interrupted: ${err.message}`, errors: errors.concat(`${model.name}: ${err.message}`).slice(0, 3) })}\n\n`);
          res.end();
          return;
        }
        errors.push(`${model.name}: ${err.message}`);
        continue;
      }
    }

    if (!streamStarted) {
      res.status(503).json({
        message: 'All AI models are currently unavailable. Please try again later.',
        errors: errors.slice(0, 3),
      });
    }
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    }
  }
};
