import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const models = [
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3', icon: '🔍' },
  { id: 'google/gemini-2.5-flash-preview-04-17', name: 'Gemini 2.5 Flash', icon: '💎' },
  { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash', icon: '💎' },
  { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B', icon: '🦙' },
  { id: 'microsoft/phi-4-multimodal-instruct', name: 'Phi-4', icon: '🔬' },
  { id: 'anthropic/claude-sonnet-4-20250514', name: 'Claude Sonnet 4', icon: '🌿' },
  { id: 'anthropic/claude-3.5-haiku-20241022', name: 'Claude 3.5 Haiku', icon: '🌿' },
  { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B', icon: '🌬️' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', icon: '🌿' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', icon: '🤖' },
];

export default function AI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [currentModel, setCurrentModel] = useState(null);
  const [showModels, setShowModels] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    setCurrentModel(null);

    const history = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch(`${import.meta.env.PROD ? 'https://calcuttanode-api.onrender.com' : ''}/api/ai/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history, model: selectedModel || undefined }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(err.message || `HTTP ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = '';
      let modelInfo = null;

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.model) {
              modelInfo = data.model;
              setCurrentModel(data.model);
            }
            if (data.content) {
              assistantMsg += data.content;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: assistantMsg };
                return updated;
              });
            }
            if (data.error) {
              throw new Error(data.error);
            }
          } catch (e) {
            if (e.message !== 'Unexpected end of JSON input') throw e;
          }
        }
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ Error: ${err.message}. The system will automatically try the next available model. Please try again.`,
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setCurrentModel(null);
  };

  const suggestedQuestions = [
    'What services does Calcutta Node offer?',
    'How do I fix a slow computer?',
    'Help me choose a hosting plan',
    'What is the difference between WiFi and Ethernet?',
    'How can I secure my home network?',
    'Tell me about web development packages',
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col min-h-[calc(100vh-160px)]">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent">
          Calcutta Node AI
        </h1>
        <p className="text-text-muted text-sm mt-1">Multi-model AI assistant — auto-switches on quota exhaustion</p>
      </motion.div>

      <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
        <div className="relative">
          <button onClick={() => setShowModels(!showModels)}
            className="flex items-center gap-1.5 bg-background border border-electric-violet/20 rounded-lg px-3 py-1.5 text-xs text-text-primary hover:border-neon-cyan/40 transition-colors"
          >
            <span>{selectedModel ? models.find(m => m.id === selectedModel)?.icon || '🧠' : '🔄'}</span>
            <span>{selectedModel ? models.find(m => m.id === selectedModel)?.name || selectedModel : 'Auto (Fallback)'}</span>
            <svg className={`w-3 h-3 transition-transform ${showModels ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {showModels && (
            <div className="absolute top-full mt-1 left-0 bg-surface border border-electric-violet/20 rounded-xl shadow-xl z-50 w-64 max-h-80 overflow-y-auto">
              <button onClick={() => { setSelectedModel(''); setShowModels(false); }}
                className="w-full text-left px-4 py-2.5 text-xs text-neon-cyan hover:bg-electric-violet/5 border-b border-electric-violet/10 font-medium"
              >
                🔄 Auto (Fallback Mode)
              </button>
              {models.map(m => (
                <button key={m.id} onClick={() => { setSelectedModel(m.id); setShowModels(false); }}
                  className={`w-full text-left px-4 py-2.5 text-xs hover:bg-electric-violet/5 transition-colors ${selectedModel === m.id ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-text-primary'}`}
                >
                  {m.icon} {m.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={clearChat}
          className="bg-background border border-electric-violet/20 rounded-lg px-3 py-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          Clear Chat
        </button>

        {currentModel && (
          <span className="text-[10px] text-text-muted bg-background/50 rounded px-2 py-1">
            Using: {currentModel.name}
          </span>
        )}
      </div>

      <div ref={chatRef} className="flex-1 overflow-y-auto space-y-3 mb-4 px-1">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🧠</div>
            <p className="text-text-muted text-sm mb-6">Ask anything! Models auto-switch on rate limits.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
              {suggestedQuestions.map(q => (
                <button key={q} onClick={() => { setInput(q); inputRef.current?.focus(); }}
                  className="text-left text-xs bg-background/50 border border-electric-violet/20 rounded-lg p-3 text-text-muted hover:border-neon-cyan/40 hover:text-text-primary transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 ${
              msg.role === 'user'
                ? 'bg-neon-cyan/20 text-text-primary rounded-br-md'
                : 'bg-surface/80 border border-electric-violet/10 text-text-primary rounded-bl-md'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-brand-gradient flex items-center justify-center text-[10px] font-bold text-white">AI</div>
                  <span className="text-[10px] text-text-muted">Calcutta Node AI</span>
                </div>
              )}
              <div className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content || (loading && i === messages.length - 1 ? '▊' : '')}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-surface/50 border border-electric-violet/20 rounded-2xl p-2 flex items-end gap-2">
        <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          placeholder="Ask anything... (Enter to send, Shift+Enter for new line)"
          rows={1}
          className="flex-1 bg-transparent border-none px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none resize-none text-sm max-h-32"
          style={{ minHeight: '40px' }}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}
          className="bg-brand-gradient text-white p-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/20 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {loading ? (
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-75" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>

      <p className="text-center text-[10px] text-text-muted/50 mt-2">
        Powered by OpenRouter + OpenCode Zen. Rate limited to 20 requests/min. Models auto-switch on quota exhaustion.
      </p>
    </div>
  );
}
