import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '../context/AuthContext';

const API_BASE = import.meta.env.PROD ? 'https://calcuttanode-api.onrender.com' : '';

const suggestions = [
  'Help me write a professional email',
  'Explain my service pricing options',
  'Fix a slow computer step-by-step',
  'Create SEO meta for my website',
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-text-faint" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
      ))}
    </span>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1200); }} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-border text-text-faint hover:text-text-primary" title="Copy">
      {copied ? <span className="text-[11px] text-neon-cyan">Copied</span> : <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V9a2 2 0 012-2h8"/></svg>}
    </button>
  );
}

function CodeBlock({ className, children }) {
  const code = String(children).replace(/\n$/, '');
  const [copied, setCopied] = useState(false);
  return (
    <div className="my-3 rounded-xl overflow-hidden border border-border bg-[#FFFEFB]">
      <div className="flex items-center justify-between px-3 py-1.5 bg-surface-muted border-b border-border">
        <span className="text-[11px] font-mono text-text-muted">{className?.replace('language-', '') || 'code'}</span>
        <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1200); }} className="text-[11px] text-text-muted hover:text-text-primary">{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre className="p-3.5 overflow-x-auto text-[13px] leading-relaxed"><code className="font-mono text-text-primary">{code}</code></pre>
    </div>
  );
}

export default function AI() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [usage, setUsage] = useState(null);
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/ai/models`).then(r => r.json()).then(d => { if (Array.isArray(d)) setModels(d); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) { setUsage(null); return; }
    const token = localStorage.getItem('accessToken');
    fetch(`${API_BASE}/api/ai/usage`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).then(setUsage).catch(() => {});
  }, [user, messages.length]);

  const scrollToBottom = useCallback((smooth = true) => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: smooth ? 'smooth' : 'instant' });
  }, []);

  useEffect(() => { if (messages.length || streamingContent) scrollToBottom(false); }, [messages, streamingContent]); // eslint-disable-line
  useEffect(() => { if (loading) scrollToBottom(); }, [loading]); // eslint-disable-line

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 140) + 'px';
    }
  }, [input]);

  const sendMessage = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: trimmed, time: new Date() }]);
    setLoading(true);
    setStreamingContent('');
    setCurrentModel(null);

    const history = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
    const token = localStorage.getItem('accessToken');

    try {
      const res = await fetch(`${API_BASE}/api/ai/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ message: trimmed, history }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(err.message || `HTTP ${res.status}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = '';
      let modelInfo = null;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split('\n').filter(l => l.startsWith('data: '))) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.model) { modelInfo = data.model; setCurrentModel(data.model); }
            if (data.content) { assistantMsg += data.content; setStreamingContent(assistantMsg); }
            if (data.error) throw new Error(data.error);
          } catch (e) {
            if (e.message && !e.message.includes('JSON')) throw e;
          }
        }
      }
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMsg, model: modelInfo, time: new Date() }]);
      setStreamingContent('');
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Sorry — ${err.message}. Please try again.`, time: new Date() }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="min-h-[calc(100dvh-64px)] flex flex-col bg-background">
      {/* Minimal header — no hero/models/about */}
      <div className="sticky top-0 z-10 bg-surface/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-3xl mx-auto px-4 h-[56px] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-8 h-8 rounded-xl bg-text-primary text-surface flex items-center justify-center text-[13px] font-bold">AI</span>
            <div className="min-w-0">
              <h1 className="text-[15px] font-bold leading-none text-text-primary">AI Chat</h1>
              <p className="text-[11px] text-text-muted leading-none mt-0.5 hidden sm:block">Auto picks fastest available free model</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-text-muted bg-surface-muted border border-border px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Auto
              {currentModel ? <span className="text-text-secondary">· {currentModel.name}</span> : <span className="text-text-faint">· {models.length} models</span>}
            </span>
            {messages.length > 0 && (
              <button onClick={() => { setMessages([]); setStreamingContent(''); setCurrentModel(null); }} className="text-[12px] font-medium text-text-muted hover:text-text-primary border border-border hover:border-border-strong bg-surface px-3 py-1.5 rounded-full transition-colors">Clear</button>
            )}
          </div>
        </div>
      </div>

      {/* Chat window — clean, centered, no extra panels */}
      <div ref={chatRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full px-4 py-6">
          {messages.length === 0 && !streamingContent ? (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-10">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-text-primary text-surface flex items-center justify-center mx-auto mb-3 text-lg">✦</div>
                <h2 className="text-[22px] font-bold text-text-primary">How can I help you today?</h2>
                <p className="text-[13px] text-text-muted mt-1 max-w-md mx-auto">Ask about services, code, writing, or anything — auto-routed to the fastest free model.</p>
                {!user && <p className="text-[11px] text-text-faint mt-2"><a href="/login" className="underline decoration-border hover:text-text-primary">Sign in</a> for 50 msgs/day · Anonymous 10/day</p>}
                {usage && <p className="text-[11px] text-text-muted mt-2">{usage.used}/{usage.limit} today {usage.isPremium ? '· Premium' : ''}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mx-auto">
                {suggestions.map(q => (
                  <button key={q} onClick={() => sendMessage(q)} className="text-left text-[13px] leading-snug bg-surface border border-border hover:border-border-strong hover:bg-surface-hover rounded-2xl px-4 py-3.5 text-text-secondary hover:text-text-primary transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
                    <div className={`${isUser ? 'bg-text-primary text-white rounded-[18px] rounded-br-[6px] max-w-[82%] sm:max-w-[75%]' : 'bg-surface border border-border rounded-[18px] rounded-bl-[6px] max-w-[88%] sm:max-w-[78%]'} px-4 py-3`}>
                      {!isUser && msg.model && (
                        <div className="text-[10px] text-text-faint mb-1">{msg.model.name}</div>
                      )}
                      <div className={`text-[14px] leading-6 ${isUser ? 'text-white' : 'text-text-primary'}`}>
                        {isUser ? (
                          <span className="whitespace-pre-wrap">{msg.content}</span>
                        ) : (
                          <div className="space-y-1.5 prose-sm max-w-none prose-p:my-1 prose-ul:my-1">
                            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                              p: ({ children }) => <p className="my-1.5">{children}</p>,
                              ul: ({ children }) => <ul className="my-1.5 list-disc list-inside space-y-1">{children}</ul>,
                              ol: ({ children }) => <ol className="my-1.5 list-decimal list-inside space-y-1">{children}</ol>,
                              li: ({ children }) => <li className="my-0.5">{children}</li>,
                              a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-border hover:text-neon-cyan">{children}</a>,
                              code: ({ className, children }) => {
                                const m = /language-(\w+)/.exec(className || '');
                                return m ? <CodeBlock className={className}>{children}</CodeBlock> : <code className="bg-surface-muted px-1.5 py-0.5 rounded text-[12px] font-mono border border-border">{children}</code>;
                              },
                              blockquote: ({ children }) => <blockquote className="border-l-2 border-border pl-3 italic text-text-muted">{children}</blockquote>,
                            }}>{msg.content}</ReactMarkdown>
                          </div>
                        )}
                      </div>
                      <div className={`flex items-center ${isUser ? 'justify-end' : 'justify-between'} gap-2 mt-1.5`}>
                        <span className={`text-[10px] ${isUser ? 'text-white/60' : 'text-text-faint'}`}>{msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {!isUser && <CopyButton text={msg.content} />}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-surface border border-border rounded-[18px] rounded-bl-[6px] px-4 py-3 max-w-[78%]">
                    {streamingContent ? (
                      <div className="text-[14px] leading-6 text-text-primary whitespace-pre-wrap">{streamingContent}<span className="inline-block w-1.5 h-4 bg-text-faint ml-0.5 animate-pulse align-text-bottom" /></div>
                    ) : (
                      <div className="flex items-center gap-2 text-text-muted text-[13px]"><TypingDots /> Thinking…</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input — sticky, minimal */}
      <div className="sticky bottom-0 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto w-full px-4 py-3">
          <div className="flex items-end gap-2 bg-surface border border-border focus-within:border-border-strong focus-within:shadow-sm rounded-2xl px-2 py-2 transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything… (Enter to send, Shift+Enter for new line)"
              rows={1}
              className="flex-1 bg-transparent px-3 py-2.5 text-[14px] leading-6 placeholder:text-text-faint focus:outline-none resize-none max-h-[140px] text-text-primary"
              style={{ minHeight: 44 }}
              disabled={loading}
            />
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="shrink-0 w-9 h-9 rounded-xl bg-text-primary text-white flex items-center justify-center hover:bg-text-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>}
            </button>
          </div>
          <p className="text-center text-[10px] text-text-faint mt-2">Auto picks the fastest free model · {models.length} models · No data stored</p>
        </div>
      </div>
    </div>
  );
}
