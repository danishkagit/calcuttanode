const OPENROUTER_KEY = process.env.OPENROUTER_KEY || '';
const OPENCODE_ZEN_KEY = process.env.OPENCODE_ZEN_KEY || '';

const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';
const OPENCODE_ZEN_BASE = 'https://opencode.ai/zen/v1';

const modelList = [
  // Tier 1: OpenRouter models (free tier)
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3', provider: 'openrouter', tier: 1 },
  { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash', provider: 'openrouter', tier: 1 },
  { id: 'google/gemini-2.5-flash-preview-04-17', name: 'Gemini 2.5 Flash', provider: 'openrouter', tier: 1 },
  { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B', provider: 'openrouter', tier: 1 },
  { id: 'microsoft/phi-4-multimodal-instruct', name: 'Phi-4', provider: 'openrouter', tier: 1 },
  { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B', provider: 'openrouter', tier: 1 },
  // Tier 2: OpenCode Zen models
  { id: 'anthropic/claude-sonnet-4-20250514', name: 'Claude Sonnet 4', provider: 'opencode-zen', tier: 2 },
  { id: 'anthropic/claude-3.5-haiku-20241022', name: 'Claude 3.5 Haiku', provider: 'opencode-zen', tier: 2 },
  // Tier 3: Premium OpenRouter
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'openrouter', tier: 3 },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openrouter', tier: 3 },
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

async function tryProvider(model, messages, signal) {
  if (model.provider === 'openrouter') {
    return callOpenRouter(model.id, messages, signal);
  } else if (model.provider === 'opencode-zen') {
    return callOpenCodeZen(model.id, messages, signal);
  }
  throw new Error('Unknown provider');
}

async function callOpenRouter(modelId, messages, signal) {
  const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://calcuttanode.vercel.app',
      'X-Title': 'Calcutta Node AI',
    },
    body: JSON.stringify({ model: modelId, messages, stream: false }),
    signal,
  });
  const data = await res.json();
  if (!res.ok) {
    const errMsg = data.error?.message || data.error || `HTTP ${res.status}`;
    throw new Error(errMsg);
  }
  return data.choices?.[0]?.message?.content || '';
}

async function callOpenCodeZen(modelId, messages, signal) {
  const res = await fetch(`${OPENCODE_ZEN_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENCODE_ZEN_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: modelId, messages, stream: false }),
    signal,
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
      { role: 'system', content: 'You are Calcutta Node AI, a helpful assistant for Calcutta Node IT Services based in Champdani, Hooghly, West Bengal. You help with tech questions, IT support, web development, digital marketing, and general queries. Be concise and helpful.' },
      ...history.slice(-10),
      { role: 'user', content: message },
    ];

    const modelsToTry = preferredModel
      ? [...modelList.filter(m => m.id === preferredModel), ...modelList.filter(m => m.id !== preferredModel)]
      : modelList;

    const errors = [];
    for (const model of modelsToTry) {
      try {
        const content = await tryProvider(model, messages, req.signal);
        return res.json({
          reply: content,
          model: { id: model.id, name: model.name, provider: model.provider },
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
      { role: 'system', content: 'You are Calcutta Node AI, a helpful assistant for Calcutta Node IT Services based in Champdani, Hooghly, West Bengal. You help with tech questions, IT support, web development, digital marketing, and general queries. Be concise and helpful.' },
      ...history.slice(-10),
      { role: 'user', content: message },
    ];

    const modelsToTry = preferredModel
      ? [...modelList.filter(m => m.id === preferredModel), ...modelList.filter(m => m.id !== preferredModel)]
      : modelList;

    const errors = [];
    for (const model of modelsToTry) {
      try {
        const provider = model.provider;
        const baseURL = provider === 'openrouter' ? OPENROUTER_BASE : OPENCODE_ZEN_BASE;
        const apiKey = provider === 'openrouter' ? OPENROUTER_KEY : OPENCODE_ZEN_KEY;

        const response = await fetch(`${baseURL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            ...(provider === 'openrouter' ? { 'HTTP-Referer': 'https://calcuttanode.vercel.app', 'X-Title': 'Calcutta Node AI' } : {}),
          },
          body: JSON.stringify({ model: model.id, messages, stream: true }),
          signal: req.signal,
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

        res.write(`data: ${JSON.stringify({ model: { id: model.id, name: model.name, provider: model.provider } })}\n\n`);

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
