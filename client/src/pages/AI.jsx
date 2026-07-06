import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const models = [
  { id: 'deepseek-v4-flash-free', name: 'DeepSeek V4 Flash', icon: '🔍', color: '#2EE6E6' },
  { id: 'mimo-v2.5-free', name: 'MiMo V2.5', icon: '🧠', color: '#8B3DF7' },
  { id: 'north-mini-code-free', name: 'North Mini Code', icon: '⚡', color: '#FFD700' },
  { id: 'nemotron-3-ultra-free', name: 'Nemotron 3 Ultra', icon: '🚀', color: '#FF6B6B' },
];

const API_BASE = import.meta.env.PROD ? 'https://calcuttanode-api.onrender.com' : '';

const suggestedQuestions = [
  'What services does Calcutta Node offer?',
  'How do I fix a slow computer?',
  'Help me choose a hosting plan',
  'How can I secure my home network?',
  'Tell me about web development packages',
  'What is the difference between WiFi and Ethernet?',
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 ml-1">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10"
    >
      {copied ? (
        <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
      ) : (
        <svg className="w-3.5 h-3.5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      )}
    </button>
  );
}

function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
    }));

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(46, 230, 230, ${p.o})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(46, 230, 230, ${(1 - dist / 120) * 0.1})`;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ position: 'fixed', zIndex: 0 }}
    />
  );
}

function CodeBlock({ className, children }) {
  const code = String(children).replace(/\n$/, '');
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group my-3">
      <div className="flex items-center justify-between px-4 py-1.5 bg-black/40 rounded-t-lg border-b border-white/5">
        <span className="text-[10px] text-text-muted font-mono">{className?.replace('language-', '') || 'code'}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="text-[10px] text-text-muted hover:text-text-primary transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="bg-black/30 rounded-b-lg p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-neon-cyan/90">{code}</code>
      </pre>
    </div>
  );
}

function Timestamp({ date }) {
  return (
    <span className="text-[9px] text-text-muted/40 mt-1 block">
      {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

export default function AI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [currentModel, setCurrentModel] = useState(null);
  const [showModels, setShowModels] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const [streamingContent, setStreamingContent] = useState('');

  const scrollToBottom = useCallback(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const onScroll = () => setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 200);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!loading) scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg, time: new Date() }]);
    setLoading(true);
    setCurrentModel(null);
    setStreamingContent('');

    const history = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch(`${API_BASE}/api/ai/chat/stream`, {
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
              setStreamingContent(assistantMsg);
            }
            if (data.error) throw new Error(data.error);
          } catch (e) {
            if (e.message !== 'Unexpected end of JSON input') throw e;
          }
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: assistantMsg, model: modelInfo, time: new Date() }]);
      setStreamingContent('');
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ **Error**: ${err.message}\n\nAuto-fallback will try the next model. Please try again.`,
        model: null,
        time: new Date(),
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
    setStreamingContent('');
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col">
      <ParticleField />

      <div className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-3"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-neon-cyan via-electric-violet to-neon-cyan bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
Calcutta Node.AI
            </span>
          </h1>
          <p className="text-text-muted text-xs mt-1">4 free models · auto-fallback · unlimited chat</p>
        </motion.div>

          <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModels(!showModels)}
              className="flex items-center gap-1.5 bg-background/70 backdrop-blur-sm border border-neon-cyan/30 rounded-xl px-3 py-2 text-xs text-neon-cyan hover:border-neon-cyan/60 transition-colors shadow-lg shadow-neon-cyan/10"
            >
              <motion.span
                key={selectedModel || 'auto'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {selectedModel ? models.find(m => m.id === selectedModel)?.icon || '🧠' : '🔄'}
              </motion.span>
              <span>{selectedModel ? models.find(m => m.id === selectedModel)?.name || selectedModel : 'Auto Fallback'}</span>
              <motion.svg
                animate={{ rotate: showModels ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </motion.button>
            <AnimatePresence>
              {showModels && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-xl border border-electric-violet/20 rounded-xl shadow-2xl z-50 w-64 overflow-hidden"
                >
                  <button onClick={() => { setSelectedModel(''); setShowModels(false); }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center gap-2 ${!selectedModel ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-text-muted hover:bg-white/5'}`}
                  >
                    <span>🔄</span>
                    <span className="font-medium">Auto Fallback</span>
                  </button>
                  <div className="border-t border-electric-violet/10" />
                  {models.map(m => (
                    <button key={m.id} onClick={() => { setSelectedModel(m.id); setShowModels(false); }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors flex items-center gap-2 ${selectedModel === m.id ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-text-muted hover:bg-white/5'}`}
                    >
                      <span>{m.icon}</span>
                      <span>{m.name}</span>
                    </button>
                  ))}
                  <div className="px-4 py-2 text-[9px] text-text-muted/50 border-t border-electric-violet/10 text-center">
                    Powered by OpenCode Zen
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearChat}
            className="bg-background/70 backdrop-blur-sm border border-neon-cyan/20 rounded-xl px-3 py-2 text-xs text-text-muted hover:text-neon-cyan hover:border-neon-cyan/40 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            Clear
          </motion.button>

          {currentModel && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] text-text-muted bg-background/50 backdrop-blur-sm rounded-lg px-2 py-1 border border-electric-violet/10"
            >
              {models.find(m => m.id === currentModel.id)?.icon || '🧠'} {currentModel.name || currentModel.id}
            </motion.span>
          )}
        </div>

        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto space-y-3 mb-3 px-1 scroll-smooth"
          style={{ maxHeight: 'calc(100vh - 280px)' }}
        >
          {messages.length === 0 && !streamingContent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="text-6xl mb-4"
              >
                🧠
              </motion.div>
              <p className="text-text-muted text-sm mb-5">Choose a model or let AI decide — ask anything!</p>
              <div className="flex justify-center gap-3 mb-6 text-xs text-text-muted flex-wrap">
                {models.map(m => (
                  <motion.span
                    key={m.id}
                    whileHover={{ scale: 1.1 }}
                    className="bg-background/50 border border-neon-cyan/20 rounded-lg px-3 py-1.5 cursor-pointer hover:border-neon-cyan/60 hover:text-neon-cyan transition-colors"
                    onClick={() => { setSelectedModel(m.id); setShowModels(true); }}
                  >
                    {m.icon} {m.name}
                  </motion.span>
                ))}
              </div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[11px] text-neon-cyan/70 font-medium mb-3"
              >
                ⚡ Try asking something:
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
                {suggestedQuestions.map((q, i) => (
                  <motion.button
                    key={q}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setInput(q); inputRef.current?.focus(); }}
                    className="text-left text-xs bg-background/40 backdrop-blur-sm border border-neon-cyan/10 rounded-lg p-3 text-text-muted hover:border-neon-cyan/50 hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all shadow-sm hover:shadow-md hover:shadow-neon-cyan/10"
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} group`}
                >
                  <div className={`max-w-[88%] sm:max-w-[78%] ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-neon-cyan/20 to-neon-cyan/5 border border-neon-cyan/10 rounded-2xl rounded-br-md'
                      : 'bg-surface/60 backdrop-blur-sm border border-electric-violet/10 rounded-2xl rounded-bl-md'
                  } px-4 py-3 shadow-lg shadow-black/10`}>
                    {msg.role === 'assistant' ? (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-6 h-6 rounded-lg bg-gradient-to-br from-neon-cyan to-electric-violet flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-neon-cyan/20"
                            >
                              AI
                            </motion.div>
                            <span className="text-[10px] text-text-muted">Calcutta Node AI</span>
                            {msg.model && (
                              <span className="text-[8px] text-text-muted/50 bg-background/50 rounded px-1.5 py-0.5">
                                {models.find(m => m.id === msg.model?.id)?.icon || '🧠'} {msg.model?.name || msg.model?.id}
                              </span>
                            )}
                          </div>
                          <CopyButton text={msg.content} />
                        </div>
                        <div className="text-sm leading-relaxed prose prose-invert max-w-none prose-p:my-1 prose-code:bg-black/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-neon-cyan prose-code:text-xs prose-pre:bg-transparent prose-pre:p-0 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-headings:my-2 prose-headings:text-text-primary prose-a:text-neon-cyan prose-strong:text-text-primary prose-blockquote:border-neon-cyan/30 prose-blockquote:text-text-muted">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                if (match) {
                                  return <CodeBlock className={className} children={children} />;
                                }
                                return (
                                  <code className="bg-black/30 px-1.5 py-0.5 rounded text-neon-cyan text-xs" {...props}>
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                        <Timestamp date={msg.time} />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-text-muted">You</span>
                          <CopyButton text={msg.content} />
                        </div>
                        <div className="text-sm leading-relaxed text-text-primary">{msg.content}</div>
                        <Timestamp date={msg.time} />
                      </>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && streamingContent && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start group"
                >
                  <div className="max-w-[88%] sm:max-w-[78%] bg-surface/60 backdrop-blur-sm border border-electric-violet/10 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg shadow-black/10">
                    <div className="flex items-center gap-1.5 mb-2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-6 h-6 rounded-lg bg-gradient-to-br from-neon-cyan to-electric-violet flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-neon-cyan/20"
                      >
                        AI
                      </motion.div>
                      <span className="text-[10px] text-text-muted">Calcutta Node AI</span>
                      <TypingDots />
                    </div>
                    <div className="text-sm leading-relaxed prose prose-invert max-w-none prose-code:bg-black/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-neon-cyan prose-code:text-xs">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            if (match) {
                              return <CodeBlock className={className} children={children} />;
                            }
                            return (
                              <code className="bg-black/30 px-1.5 py-0.5 rounded text-neon-cyan text-xs" {...props}>
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {streamingContent}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              )}

              {loading && !streamingContent && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface/60 backdrop-blur-sm border border-electric-violet/10 rounded-2xl rounded-bl-md px-4 py-3 shadow-lg shadow-black/10">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-neon-cyan to-electric-violet flex items-center justify-center text-[10px] font-bold text-white">AI</div>
                      <TypingDots />
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>

        <AnimatePresence>
          {showScrollBtn && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToBottom}
              className="self-center mb-2 bg-neon-cyan/20 backdrop-blur-sm border border-neon-cyan/30 rounded-full p-1.5 text-neon-cyan hover:bg-neon-cyan/30 transition-colors shadow-lg shadow-neon-cyan/10"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <motion.div
            animate={{ boxShadow: ['0 0 15px rgba(46,230,230,0.15)', '0 0 30px rgba(46,230,230,0.3)', '0 0 15px rgba(46,230,230,0.15)'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-surface/60 backdrop-blur-xl border-2 border-neon-cyan/40 rounded-2xl p-1.5 shadow-2xl shadow-neon-cyan/20 flex items-end gap-1.5"
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything... (Enter to send, Shift+Enter for new line)"
              rows={1}
              className="flex-1 bg-transparent border-none px-4 py-2.5 text-text-primary placeholder-text-muted/50 focus:outline-none resize-none text-sm max-h-32 leading-relaxed"
              style={{ minHeight: '44px' }}
              disabled={loading}
            />
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-gradient-to-br from-neon-cyan to-electric-violet text-white p-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-neon-cyan/40 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
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
            </motion.button>
          </motion.div>
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 left-4 text-[10px] text-neon-cyan font-semibold tracking-wider uppercase"
          >
            ✦ AI Chat — Ask anything!
          </motion.div>
        </motion.div>

        <p className="text-center text-[9px] text-text-muted/30 mt-2">
          4 free models via OpenCode Zen · 20 req/min · auto-fallback on quota exhaustion
        </p>
      </div>
    </div>
  );
}
