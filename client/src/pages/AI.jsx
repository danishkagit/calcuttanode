import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ParticleField from '../components/common/ParticleField';

const API_BASE = import.meta.env.PROD ? 'https://calcuttanode-api.onrender.com' : '';

const defaultModels = [
  { id: 'deepseek-v4-flash-free', name: 'DeepSeek V4 Flash', icon: '🔍', color: '#7EBBC5', description: 'Advanced reasoning & analysis with lightning-fast responses' },
  { id: 'mimo-v2.5-free', name: 'MiMo V2.5', icon: '🧠', color: '#543A67', description: 'Multimodal intelligence for complex problem-solving' },
  { id: 'north-mini-code-free', name: 'North Mini Code', icon: '⚡', color: '#FFD700', description: 'Lightning-fast code generation & debugging' },
  { id: 'nemotron-3-ultra-free', name: 'Nemotron 3 Ultra', icon: '🚀', color: '#FF6B6B', description: 'Ultra-high performance for demanding tasks' },
  { id: 'hy3-free', name: 'Hy3', icon: '🌊', color: '#4FC3F7', description: 'Creative writing & content generation expert' },
  { id: 'big-pickle', name: 'Big Pickle', icon: '🥒', color: '#81C784', description: 'Versatile assistant for everyday queries & tasks' },
];

const quickActionGroups = [
  {
    category: '💻 Tech Support',
    items: ['What services does Calcutta Node offer?', 'Help me choose a hosting plan', 'Explain web development packages', 'What is cloud infrastructure?'],
    color: '#7EBBC5',
  },
  {
    category: '📝 Content',
    items: ['Write a blog post about AI technology', 'Create SEO-optimized meta descriptions', 'Generate social media marketing captions', 'Draft a professional email'],
    color: '#FFD700',
  },
  {
    category: '🔧 Troubleshooting',
    items: ['How do I fix a slow computer?', 'Secure my home network step by step', 'WiFi vs Ethernet: which is better?', 'How to resolve DNS issues'],
    color: '#FF6B6B',
  },
  {
    category: '💰 Business',
    items: ['Help me set pricing for services', 'Create a business plan outline', 'IT support package options & pricing', 'Cost-benefit analysis template'],
    color: '#81C784',
  },
];

const heroStats = [
  { value: '10+', label: 'Models' },
  { value: '24/7', label: 'Available' },
  { value: 'Free', label: 'Forever' },
  { value: 'No Login', label: 'Required' },
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
      className="opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-lg hover:bg-white/10"
    >
      {copied ? (
        <svg className="w-3.5 h-3.5 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
      ) : (
        <svg className="w-3.5 h-3.5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      )}
    </button>
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

function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-4 bg-gradient-to-br from-neon-cyan/[0.08] via-electric-violet/[0.08] to-transparent border border-neon-cyan/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(126,187,197,0.12),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(84,58,103,0.12),transparent_60%)]" />
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-neon-cyan/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-electric-violet/5 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <div className="relative z-10 px-5 py-6 md:py-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
        >
          <span className="bg-gradient-to-r from-neon-cyan via-electric-violet to-neon-cyan bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x">
            AI-Powered Intelligence
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-text-muted text-xs sm:text-sm max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Powered by 10+ free AI models — chat, code, create, and solve problems instantly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-5 sm:gap-8 flex-wrap"
        >
          {heroStats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent">{stat.value}</div>
              <div className="text-[9px] text-text-muted/60 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ModelShowcase({ models, selectedModel, onSelect }) {
  return (
    <div className="mb-3">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
        {models.map(model => {
          const isSelected = selectedModel === model.id;
          return (
            <motion.button
              key={model.id}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(isSelected ? '' : model.id)}
              className={`relative group rounded-xl p-2.5 text-left transition-all duration-300 border ${
                isSelected
                  ? 'border-neon-cyan/50 bg-neon-cyan/10 shadow-lg shadow-neon-cyan/15'
                  : 'border-neon-cyan/[0.08] bg-background/30 hover:border-neon-cyan/20 hover:bg-background/50 hover:shadow-md hover:shadow-neon-cyan/5'
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="modelPulse"
                  className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-neon-cyan shadow-lg shadow-neon-cyan/60"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm mb-1.5 mx-auto"
                style={{ backgroundColor: `${model.color}18` }}
              >
                {model.icon}
              </div>
              <div className="text-[9px] font-medium text-text-primary leading-tight text-center truncate">{model.name}</div>
              <div className="text-[7px] text-text-muted/50 leading-tight text-center truncate mt-0.5">{model.description}</div>
              {isSelected && (
                <div className="absolute inset-0 rounded-xl ring-1 ring-neon-cyan/30 ring-offset-[1.5px] ring-offset-background pointer-events-none" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function WelcomeScreen({ onSelectQuestion }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-2"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="text-6xl mb-3 inline-block relative"
      >
        🧠
        <motion.div
          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-neon-cyan/30 blur-sm"
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0.1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-text-muted text-xs mb-4"
      >
        Ready to explore — ask anything or pick a suggestion below
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
        {quickActionGroups.map(group => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background/40 backdrop-blur-sm border border-neon-cyan/[0.08] rounded-xl p-2.5 text-left hover:border-neon-cyan/20 transition-colors"
          >
            <div className="text-[11px] font-semibold text-text-primary mb-1.5 flex items-center gap-1.5">
              <span className="text-xs">{group.category}</span>
            </div>
            <div className="space-y-0.5">
              {group.items.map(q => (
                <motion.button
                  key={q}
                  whileHover={{ x: 2 }}
                  onClick={() => onSelectQuestion(q)}
                  className="w-full text-left text-[10px] text-text-muted/70 hover:text-neon-cyan transition-colors py-1 px-1.5 rounded hover:bg-neon-cyan/5 truncate"
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SEOToolsPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const seoTips = [
    { title: 'Meta Title Tips', desc: 'Keep titles under 60 chars with primary keyword first' },
    { title: 'Meta Descriptions', desc: 'Write compelling 150-160 char descriptions with clear CTA' },
    { title: 'Header Structure', desc: 'One H1 per page, hierarchical H2/H3 subheadings' },
    { title: 'Image Alt Text', desc: 'Descriptive alt text improves accessibility & SEO' },
    { title: 'Internal Linking', desc: 'Link related pages with descriptive anchor text' },
    { title: 'Page Speed', desc: 'Optimize images, minify assets, enable caching' },
  ];
  return (
    <div className="mb-3">
      <motion.button
        whileHover={{ scale: 1.01 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-background/30 backdrop-blur-sm border border-neon-cyan/[0.08] rounded-xl px-3.5 py-2 text-left hover:border-neon-cyan/20 transition-colors"
      >
        <span className="text-[11px] font-medium text-text-primary flex items-center gap-2">
          <span className="text-xs">🔍</span>
          SEO Tools & Optimization Tips
          <span className="text-[9px] text-text-muted/50">({seoTips.length} tips)</span>
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-3 h-3 text-text-muted/60 shrink-0"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 mt-1.5">
              {seoTips.map(tip => (
                <div key={tip.title} className="bg-background/30 border border-neon-cyan/[0.06] rounded-lg p-2.5 hover:bg-background/50 hover:border-neon-cyan/15 transition-colors">
                  <div className="text-[10px] font-medium text-text-primary mb-0.5">{tip.title}</div>
                  <div className="text-[9px] text-text-muted/60 leading-relaxed">{tip.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-center pb-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="text-[9px] text-neon-cyan/60 hover:text-neon-cyan bg-neon-cyan/10 hover:bg-neon-cyan/15 rounded-lg px-3 py-1.5 transition-colors"
              >
                🔄 Generate SEO Audit
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
  const [models, setModels] = useState(defaultModels);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const [streamingContent, setStreamingContent] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/ai/models`)
      .then(res => res.json())
      .then(data => { if (Array.isArray(data) && data.length) setModels(data); })
      .catch(() => {});
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
  }, []);

  useEffect(() => {
    if (messages.length > 0 || streamingContent) scrollToBottom(false);
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
    if (streamingContent) scrollToBottom();
  }, [streamingContent, scrollToBottom]);

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
      <ParticleField count={60} speed={0.3} color="#7EBBC5" />

      <div className="relative z-10 flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-3">
        <HeroSection />

        <ModelShowcase
          models={models}
          selectedModel={selectedModel}
          onSelect={(id) => setSelectedModel(id === selectedModel ? '' : id)}
        />

        <SEOToolsPanel />

        <div className="flex items-center gap-2 mb-2 flex-wrap justify-center">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModels(!showModels)}
              className="flex items-center gap-1.5 bg-background/70 backdrop-blur-sm border border-neon-cyan/30 rounded-xl px-2.5 py-1.5 text-[10px] text-neon-cyan hover:border-neon-cyan/60 transition-colors shadow-lg shadow-neon-cyan/10"
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
                className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
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
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-xl border border-electric-violet/20 rounded-xl shadow-2xl z-50 w-56 overflow-hidden"
                >
                  <button onClick={() => { setSelectedModel(''); setShowModels(false); }}
                    className={`w-full text-left px-3.5 py-2 text-[11px] transition-colors flex items-center gap-2 ${!selectedModel ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-text-muted hover:bg-white/5'}`}
                  >
                    <span>🔄</span>
                    <span className="font-medium">Auto Fallback</span>
                  </button>
                  <div className="border-t border-electric-violet/10" />
                  {models.map(m => (
                    <button key={m.id} onClick={() => { setSelectedModel(m.id); setShowModels(false); }}
                      className={`w-full text-left px-3.5 py-2 text-[11px] transition-colors flex items-center gap-2 ${selectedModel === m.id ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-text-muted hover:bg-white/5'}`}
                    >
                      <span>{m.icon}</span>
                      <span>{m.name}</span>
                    </button>
                  ))}
                  <div className="px-3.5 py-1.5 text-[8px] text-text-muted/50 border-t border-electric-violet/10 text-center">
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
            className="bg-background/70 backdrop-blur-sm border border-neon-cyan/20 rounded-xl px-2.5 py-1.5 text-[10px] text-text-muted hover:text-neon-cyan hover:border-neon-cyan/40 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            Clear
          </motion.button>

          {currentModel && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] text-text-muted bg-background/50 backdrop-blur-sm rounded-lg px-2 py-1 border border-electric-violet/10 flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
              {models.find(m => m.id === currentModel.id)?.icon || '🧠'} {currentModel.name || currentModel.id}
            </motion.span>
          )}
        </div>

        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto space-y-2 mb-2 px-2 py-3 scroll-smooth glass-card"
          style={{ maxHeight: 'calc(100vh - 280px)' }}
        >
          {messages.length === 0 && !streamingContent ? (
            <WelcomeScreen onSelectQuestion={(q) => { setInput(q); inputRef.current?.focus(); }} />
          ) : (
            <>
              {messages.map((msg, i) => {
                const isUser = msg.role === 'user';
                const isLastSameSender = i > 0 && messages[i - 1].role === msg.role;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${isLastSameSender ? 'mt-0.5' : 'mt-1.5'} group`}
                  >
                    {!isUser && !isLastSameSender && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-cyan to-electric-violet flex items-center justify-center text-[9px] font-bold text-white shrink-0 mt-1 mr-2 shadow-lg shadow-neon-cyan/20">
                        AI
                      </div>
                    )}
                    {!isUser && isLastSameSender && <div className="w-7 mr-2 shrink-0" />}
                    <div className={`max-w-[88%] sm:max-w-[78%] ${
                      isUser
                        ? 'bg-gradient-to-br from-neon-cyan/25 to-neon-cyan/10 border border-neon-cyan/20 rounded-2xl rounded-br-md'
                        : isLastSameSender
                          ? 'bg-surface/40 backdrop-blur-sm border border-electric-violet/10 rounded-2xl rounded-bl-md rounded-tl-md'
                          : 'bg-surface/50 backdrop-blur-sm border border-electric-violet/10 rounded-2xl rounded-bl-md'
                    } px-4 py-2.5 shadow-md shadow-black/10`}>
                      {!isUser ? (
                        <>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              {isLastSameSender ? null : (
                                <span className="text-[10px] text-text-muted font-medium">Calcutta Node AI</span>
                              )}
                              {msg.model && (
                                <span className="text-[8px] text-text-muted/50 bg-background/50 rounded px-1.5 py-0.5 flex items-center gap-0.5">
                                  {models.find(m => m.id === msg.model?.id)?.icon || '🧠'} {msg.model?.name || msg.model?.id}
                                </span>
                              )}
                            </div>
                            <CopyButton text={msg.content} />
                          </div>
                          <div className="text-sm leading-relaxed text-text-primary space-y-1.5">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p({ children }) { return <p className="my-1">{children}</p>; },
                                ul({ children }) { return <ul className="my-1 space-y-0.5 list-disc list-inside">{children}</ul>; },
                                ol({ children }) { return <ol className="my-1 space-y-0.5 list-decimal list-inside">{children}</ol>; },
                                li({ children }) { return <li className="my-0.5">{children}</li>; },
                                h1({ children }) { return <h1 className="text-text-primary text-lg font-bold my-2">{children}</h1>; },
                                h2({ children }) { return <h2 className="text-text-primary text-base font-bold my-2">{children}</h2>; },
                                h3({ children }) { return <h3 className="text-text-primary text-sm font-bold my-1.5">{children}</h3>; },
                                strong({ children }) { return <strong className="text-text-primary font-semibold">{children}</strong>; },
                                a({ href, children }) { return <a href={href} className="text-neon-cyan hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>; },
                                blockquote({ children }) { return <blockquote className="border-l-2 border-neon-cyan/30 pl-3 my-1.5 text-text-muted italic">{children}</blockquote>; },
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
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[10px] text-text-muted font-medium">You</span>
                            <CopyButton text={msg.content} />
                          </div>
                          <div className="text-sm leading-relaxed text-text-primary">{msg.content}</div>
                          <Timestamp date={msg.time} />
                        </>
                      )}
                    </div>
                    {isUser && !isLastSameSender && (
                      <div className="w-7 h-7 rounded-lg bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center text-[9px] font-bold text-neon-cyan shrink-0 mt-1 ml-2">
                        U
                      </div>
                    )}
                    {isUser && isLastSameSender && <div className="w-7 ml-2 shrink-0" />}
                  </motion.div>
                );
              })}

              {loading && streamingContent && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mt-1.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-cyan to-electric-violet flex items-center justify-center text-[9px] font-bold text-white shrink-0 mt-1 mr-2 shadow-lg shadow-neon-cyan/20">
                    AI
                  </div>
                  <div className="max-w-[88%] sm:max-w-[78%] bg-surface/50 backdrop-blur-sm border border-electric-violet/10 rounded-2xl rounded-bl-md px-4 py-2.5 shadow-md shadow-black/10">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[10px] text-text-muted font-medium">Calcutta Node AI</span>
                      <TypingDots />
                    </div>
                    <div className="text-sm leading-relaxed text-text-primary space-y-1.5">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p({ children }) { return <p className="my-1">{children}</p>; },
                          ul({ children }) { return <ul className="my-1 space-y-0.5 list-disc list-inside">{children}</ul>; },
                          ol({ children }) { return <ol className="my-1 space-y-0.5 list-decimal list-inside">{children}</ol>; },
                          li({ children }) { return <li className="my-0.5">{children}</li>; },
                          h1({ children }) { return <h1 className="text-text-primary text-lg font-bold my-2">{children}</h1>; },
                          h2({ children }) { return <h2 className="text-text-primary text-base font-bold my-2">{children}</h2>; },
                          h3({ children }) { return <h3 className="text-text-primary text-sm font-bold my-1.5">{children}</h3>; },
                          strong({ children }) { return <strong className="text-text-primary font-semibold">{children}</strong>; },
                          a({ href, children }) { return <a href={href} className="text-neon-cyan hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>; },
                          blockquote({ children }) { return <blockquote className="border-l-2 border-neon-cyan/30 pl-3 my-1.5 text-text-muted italic">{children}</blockquote>; },
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
                      <div className="flex items-center gap-1">
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.span
                          className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
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
              className="self-center mb-1.5 bg-neon-cyan/20 backdrop-blur-sm border border-neon-cyan/30 rounded-full p-1.5 text-neon-cyan hover:bg-neon-cyan/30 transition-colors shadow-lg shadow-neon-cyan/10"
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
            animate={{ boxShadow: ['0 0 15px rgba(126,187,197,0.15)', '0 0 30px rgba(126,187,197,0.3)', '0 0 15px rgba(126,187,197,0.15)'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass rounded-2xl p-1.5 shadow-2xl shadow-neon-cyan/20 flex items-end gap-1.5"
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
            ✦ AI Chat — unlimited, free, intelligent
          </motion.div>
        </motion.div>

        <p className="text-center text-[9px] text-text-muted/30 mt-2">
          {models.length} free models via OpenCode · 20 req/min · auto-fallback on quota exhaustion
        </p>
      </div>
    </div>
  );
}
