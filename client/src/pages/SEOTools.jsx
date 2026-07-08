import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleField from '../components/common/ParticleField';

const API_BASE = import.meta.env.PROD ? 'https://calcuttanode-api.onrender.com' : '';

const tabs = [
  { id: 'content', label: 'Content Generator', icon: '✍️' },
  { id: 'meta', label: 'Meta Tags', icon: '🏷️' },
  { id: 'keywords', label: 'Keywords', icon: '🔑' },
  { id: 'analyze', label: 'Analyze', icon: '📊' },
  { id: 'schema', label: 'Schema', icon: '🔗' },
];

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ResultBox({ title, children, onCopy }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-surface/50 rounded-xl border border-electric-violet/20 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-neon-cyan font-semibold text-sm">{title}</h3>
        {onCopy && (
          <button onClick={onCopy} className="text-xs text-text-muted hover:text-neon-cyan px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
            Copy
          </button>
        )}
      </div>
      <div className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">{children}</div>
    </motion.div>
  );
}

export default function SEOTools() {
  const [activeTab, setActiveTab] = useState('content');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const [contentForm, setContentForm] = useState({ topic: '', keywords: '', tone: 'professional', wordCount: 800, type: 'blog' });
  const [metaForm, setMetaForm] = useState({ pageTitle: '', description: '', keywords: '', type: 'page' });
  const [keywordForm, setKeywordForm] = useState({ topic: '', industry: 'IT services' });
  const [analyzeForm, setAnalyzeForm] = useState({ content: '', targetKeyword: '' });
  const [schemaForm, setSchemaForm] = useState({ type: 'Organization', name: 'Calcutta Node', data: '{}' });

  const copyResult = () => {
    const text = typeof result === 'string' ? result : JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (endpoint, body) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/seo/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <ParticleField count={30} speed={0.15} color="#7EBBC5" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-4xl block mb-3">🚀</span>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent mb-3">
            AI SEO Tools
          </h1>
          <p className="text-text-muted text-lg">Generate content, meta tags, keywords, analyze SEO, and create schema markup powered by AI</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map(tab => (
            <motion.button key={tab.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveTab(tab.id); setResult(null); setError(''); }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40 shadow-sm shadow-neon-cyan/10'
                  : 'bg-surface/30 text-text-muted border border-transparent hover:bg-white/5 hover:text-text-primary'
              }`}
            >
              <span className="mr-1.5">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>

            {activeTab === 'content' && (
              <div className="bg-surface/30 rounded-2xl border border-electric-violet/20 p-6 md:p-8">
                <h2 className="text-xl font-bold text-text-primary mb-6">AI Content Generator</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Topic *</label>
                    <input value={contentForm.topic} onChange={e => setContentForm(f => ({ ...f, topic: e.target.value }))}
                      className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors" placeholder="e.g., Benefits of Remote IT Support for Small Businesses" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-text-muted mb-1.5">Keywords (comma-separated)</label>
                      <input value={contentForm.keywords} onChange={e => setContentForm(f => ({ ...f, keywords: e.target.value }))}
                        className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors" placeholder="remote IT support, small business IT" />
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-1.5">Tone</label>
                      <select value={contentForm.tone} onChange={e => setContentForm(f => ({ ...f, tone: e.target.value }))}
                        className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors">
                        <option value="professional">Professional</option>
                        <option value="conversational">Conversational</option>
                        <option value="technical">Technical</option>
                        <option value="persuasive">Persuasive</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-text-muted mb-1.5">Type</label>
                      <select value={contentForm.type} onChange={e => setContentForm(f => ({ ...f, type: e.target.value }))}
                        className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors">
                        <option value="blog">Blog Post</option>
                        <option value="article">Article</option>
                        <option value="landing">Landing Page</option>
                        <option value="social">Social Media Post</option>
                        <option value="product">Product Description</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-1.5">Target Word Count</label>
                      <input type="number" value={contentForm.wordCount} onChange={e => setContentForm(f => ({ ...f, wordCount: Number(e.target.value) }))}
                        className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors" />
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubmit('generate-content', contentForm)}
                    disabled={loading || !contentForm.topic}
                    className="w-full bg-gradient-to-r from-neon-cyan to-electric-violet text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50 transition-all"
                  >
                    {loading ? 'Generating...' : 'Generate Content'}
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'meta' && (
              <div className="bg-surface/30 rounded-2xl border border-electric-violet/20 p-6 md:p-8">
                <h2 className="text-xl font-bold text-text-primary mb-6">Meta Tag Generator</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Page Title *</label>
                    <input value={metaForm.pageTitle} onChange={e => setMetaForm(f => ({ ...f, pageTitle: e.target.value }))}
                      className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors" placeholder="e.g., Web Development Services - Calcutta Node" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Page Description</label>
                    <textarea value={metaForm.description} onChange={e => setMetaForm(f => ({ ...f, description: e.target.value }))} rows={2}
                      className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors" placeholder="Brief description of the page..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-text-muted mb-1.5">Keywords</label>
                      <input value={metaForm.keywords} onChange={e => setMetaForm(f => ({ ...f, keywords: e.target.value }))}
                        className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors" placeholder="web development, IT services" />
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-1.5">Content Type</label>
                      <select value={metaForm.type} onChange={e => setMetaForm(f => ({ ...f, type: e.target.value }))}
                        className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors">
                        <option value="page">Web Page</option>
                        <option value="blog">Blog Post</option>
                        <option value="product">Product</option>
                        <option value="service">Service</option>
                      </select>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubmit('generate-meta', metaForm)}
                    disabled={loading || !metaForm.pageTitle}
                    className="w-full bg-gradient-to-r from-neon-cyan to-electric-violet text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50 transition-all"
                  >
                    {loading ? 'Generating...' : 'Generate Meta Tags'}
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'keywords' && (
              <div className="bg-surface/30 rounded-2xl border border-electric-violet/20 p-6 md:p-8">
                <h2 className="text-xl font-bold text-text-primary mb-6">Keyword Research</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Topic *</label>
                    <input value={keywordForm.topic} onChange={e => setKeywordForm(f => ({ ...f, topic: e.target.value }))}
                      className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors" placeholder="e.g., SEO services for small business" />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Industry</label>
                    <input value={keywordForm.industry} onChange={e => setKeywordForm(f => ({ ...f, industry: e.target.value }))}
                      className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors" placeholder="IT services" />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubmit('keyword-suggest', keywordForm)}
                    disabled={loading || !keywordForm.topic}
                    className="w-full bg-gradient-to-r from-neon-cyan to-electric-violet text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50 transition-all"
                  >
                    {loading ? 'Researching...' : 'Get Keyword Suggestions'}
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'analyze' && (
              <div className="bg-surface/30 rounded-2xl border border-electric-violet/20 p-6 md:p-8">
                <h2 className="text-xl font-bold text-text-primary mb-6">Content SEO Analyzer</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Content *</label>
                    <textarea value={analyzeForm.content} onChange={e => setAnalyzeForm(f => ({ ...f, content: e.target.value }))} rows={8}
                      className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors font-mono" placeholder="Paste your content here to analyze its SEO performance..." />
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Target Keyword</label>
                    <input value={analyzeForm.targetKeyword} onChange={e => setAnalyzeForm(f => ({ ...f, targetKeyword: e.target.value }))}
                      className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors" placeholder="e.g., IT services Kolkata" />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubmit('analyze', analyzeForm)}
                    disabled={loading || !analyzeForm.content}
                    className="w-full bg-gradient-to-r from-neon-cyan to-electric-violet text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50 transition-all"
                  >
                    {loading ? 'Analyzing...' : 'Analyze Content'}
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'schema' && (
              <div className="bg-surface/30 rounded-2xl border border-electric-violet/20 p-6 md:p-8">
                <h2 className="text-xl font-bold text-text-primary mb-6">Schema Markup Generator</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-text-muted mb-1.5">Schema Type</label>
                      <select value={schemaForm.type} onChange={e => setSchemaForm(f => ({ ...f, type: e.target.value }))}
                        className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors">
                        <option value="Organization">Organization</option>
                        <option value="LocalBusiness">Local Business</option>
                        <option value="BlogPosting">Blog Posting</option>
                        <option value="Service">Service</option>
                        <option value="FAQPage">FAQ Page</option>
                        <option value="Product">Product</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-text-muted mb-1.5">Name / Title</label>
                      <input value={schemaForm.name} onChange={e => setSchemaForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors" placeholder="Calcutta Node" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-text-muted mb-1.5">Additional Data (JSON)</label>
                    <textarea value={schemaForm.data} onChange={e => setSchemaForm(f => ({ ...f, data: e.target.value }))} rows={3}
                      className="w-full bg-background border border-electric-violet/30 rounded-xl px-4 py-3 text-text-primary text-sm focus:outline-none focus:border-neon-cyan transition-colors font-mono" placeholder='{"description": "Your custom description"}' />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      let parsed = {};
                      try { parsed = JSON.parse(schemaForm.data); } catch {}
                      handleSubmit('generate-schema', { ...schemaForm, data: parsed });
                    }}
                    disabled={loading || !schemaForm.name}
                    className="w-full bg-gradient-to-r from-neon-cyan to-electric-violet text-white font-semibold py-3 rounded-xl text-sm disabled:opacity-50 transition-all"
                  >
                    {loading ? 'Generating...' : 'Generate Schema'}
                  </motion.button>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">{error}</div>
            )}

            {loading && <LoadingSpinner />}

            {result && !loading && (
              <ResultBox title={
                activeTab === 'content' ? 'Generated Content' :
                activeTab === 'meta' ? 'Meta Tags' :
                activeTab === 'keywords' ? 'Keyword Suggestions' :
                activeTab === 'analyze' ? 'SEO Analysis' : 'Schema Markup'
              } onCopy={copyResult}>
                {activeTab === 'content' && (
                  <div>
                    {result.title && <div className="text-lg font-bold text-neon-cyan mb-2">{result.title}</div>}
                    {result.metaDescription && <div className="text-xs text-text-muted mb-4 border-l-2 border-electric-violet pl-3">Meta: {result.metaDescription}</div>}
                    <div className="prose prose-invert max-w-none">{result.content}</div>
                  </div>
                )}
                {activeTab === 'meta' && (
                  <div className="space-y-2 text-sm">
                    {Object.entries(result).map(([key, val]) => (
                      <div key={key} className="flex gap-2">
                        <span className="text-neon-cyan font-mono shrink-0">{key}:</span>
                        <span className="text-text-muted break-all">{Array.isArray(val) ? val.join(', ') : String(val)}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'keywords' && result.keywords && (
                  <div className="space-y-2">
                    {result.keywords.map((kw, i) => (
                      <div key={i} className="flex items-center gap-3 bg-surface/30 rounded-lg px-4 py-2.5 border border-electric-violet/10">
                        <span className="text-neon-cyan font-mono text-xs">{i + 1}</span>
                        <span className="flex-1 text-text-primary font-medium">{kw.keyword}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          kw.volume === 'high' ? 'bg-green-500/20 text-green-400' :
                          kw.volume === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>{kw.volume}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          kw.difficulty === 'easy' || kw.difficulty === 'low' ? 'bg-green-500/20 text-green-400' :
                          kw.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                        }`}>{kw.difficulty}</span>
                        <span className="text-xs text-text-muted hidden md:block max-w-[200px] truncate">{kw.reason}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'analyze' && (
                  <div className="space-y-3">
                    {result.score !== undefined && (
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl font-bold" style={{ color: result.score >= 80 ? '#4ade80' : result.score >= 50 ? '#facc15' : '#f87171' }}>{result.score}/100</div>
                        <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${result.score}%`, backgroundColor: result.score >= 80 ? '#4ade80' : result.score >= 50 ? '#facc15' : '#f87171' }} />
                        </div>
                      </div>
                    )}
                    {result.readability && <div className="text-text-muted text-xs">Readability: <span className="text-text-primary">{result.readability}</span></div>}
                    {result.wordCount && <div className="text-text-muted text-xs">Word Count: <span className="text-text-primary">{result.wordCount}</span></div>}
                    {result.suggestions && (
                      <div>
                        <div className="text-neon-cyan text-xs font-semibold mb-2 mt-4">Suggestions:</div>
                        {result.suggestions.map((s, i) => <div key={i} className="text-text-muted text-xs flex gap-2 mb-1"><span className="text-neon-cyan">•</span>{s}</div>)}
                      </div>
                    )}
                  </div>
                )}
                {activeTab === 'schema' && result.schema && (
                  <pre className="text-xs text-text-muted overflow-x-auto">{JSON.stringify(result.schema, null, 2)}</pre>
                )}
              </ResultBox>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
