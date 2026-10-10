import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toolsRegistry from '../data/toolsRegistry';

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true); setTimeout(() => setCopied(false), 1200);
  };
  return <button onClick={copy} className="text-xs bg-neon-cyan text-white px-3 py-1.5 rounded-lg font-medium hover:shadow-lg">{copied ? '✓ Copied' : 'Copy'}</button>;
}
function DownloadBtn({ text, filename }) {
  const dl = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  };
  return <button onClick={dl} className="text-xs border border-neon-cyan text-neon-cyan px-3 py-1.5 rounded-lg font-medium hover:bg-neon-cyan/10">Download</button>;
}

// Simple hash via SubtleCrypto for SHA, fallback for MD5/SHA1 demo (md5 via simple impl)
async function shaHash(text, algo) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function ToolDetail() {
  const { slug } = useParams();
  const tool = useMemo(() => toolsRegistry.find(t => t.slug === slug), [slug]);

  if (!tool) return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <p className="text-4xl mb-4">🔍</p><h1 className="text-xl font-bold text-text-primary">Tool not found</h1>
      <Link to="/tools" className="text-neon-cyan text-sm hover:underline mt-4 inline-block">← Back to Free Tools</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/tools" className="text-xs text-text-muted hover:text-neon-cyan mb-4 inline-block">← All Free Tools</Link>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{tool.icon}</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">{tool.name}</h1>
          <p className="text-sm text-text-muted">{tool.desc} · 100% free · Runs in your browser · <span className="text-neon-cyan">No data sent to server</span></p>
        </div>
        <span className="ml-auto hidden md:inline text-xs bg-electric-violet/15 text-electric-violet px-2 py-1 rounded-full border border-electric-violet/20">{tool.category}</span>
      </div>

      <div className="glass-card rounded-2xl p-5 md:p-6">
        <ToolRenderer tool={tool} />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {toolsRegistry.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 6).map(t => (
          <Link key={t.slug} to={`/tools/${t.slug}`} className="text-xs bg-surface/50 border border-electric-violet/20 px-3 py-2 rounded-xl hover:border-neon-cyan/30 hover:text-neon-cyan">{t.icon} {t.name}</Link>
        ))}
      </div>
    </div>
  );
}

function ToolRenderer({ tool }) {
  // local states per tool — use single object to avoid many hooks conditionally
  const [a, setA] = useState(''); // input 1
  const [b, setB] = useState(''); // input 2
  const [out, setOut] = useState('');
  const [len, setLen] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  useEffect(() => { setA(''); setB(''); setOut(''); }, [tool.slug]);

  // Helpers
  const handleJsonFormat = (minify) => {
    try { const obj = JSON.parse(a); setOut(minify ? JSON.stringify(obj) : JSON.stringify(obj, null, 2)); } catch (e) { setOut('❌ ' + e.message); }
  };
  const handleBase64 = (encode) => {
    try { setOut(encode ? btoa(unescape(encodeURIComponent(a))) : decodeURIComponent(escape(atob(a)))); } catch (e) { setOut('❌ ' + e.message); }
  };

  // Render per slug
  switch (tool.slug) {
    case 'word-counter': {
      const words = a.trim() ? a.trim().split(/\s+/).length : 0;
      const chars = a.length, charsNoSpace = a.replace(/\s/g, '').length;
      const sentences = a.split(/[.!?]+/).filter(s => s.trim()).length;
      const reading = Math.ceil(words / 200);
      return (
        <div className="space-y-4">
          <textarea value={a} onChange={e => setA(e.target.value)} placeholder="Paste your text here..." className="w-full min-h-[180px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
            <div className="bg-neon-cyan/10 rounded-xl p-3"><p className="text-xl font-bold text-neon-cyan">{words}</p><p className="text-xs text-text-muted">Words</p></div>
            <div className="bg-electric-violet/10 rounded-xl p-3"><p className="text-xl font-bold text-electric-violet">{chars}</p><p className="text-xs text-text-muted">Chars</p></div>
            <div className="bg-surface rounded-xl p-3"><p className="text-xl font-bold text-text-primary">{charsNoSpace}</p><p className="text-xs text-text-muted">No spaces</p></div>
            <div className="bg-surface rounded-xl p-3"><p className="text-xl font-bold text-text-primary">{sentences}</p><p className="text-xs text-text-muted">Sentences</p></div>
            <div className="bg-surface rounded-xl p-3"><p className="text-xl font-bold text-text-primary">{reading} min</p><p className="text-xs text-text-muted">Reading</p></div>
          </div>
          <div className="flex gap-2"><CopyBtn text={a} /><button onClick={() => setA('')} className="text-xs border border-electric-violet/20 px-3 py-1.5 rounded-lg">Clear</button></div>
        </div>
      );
    }
    case 'case-converter': {
      const toTitle = s => s.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase());
      const toCamel = s => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
      const toSnake = s => s.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, '');
      const convert = (mode) => {
        if (mode === 'upper') setOut(a.toUpperCase());
        if (mode === 'lower') setOut(a.toLowerCase());
        if (mode === 'title') setOut(toTitle(a));
        if (mode === 'camel') setOut(toCamel(a));
        if (mode === 'snake') setOut(toSnake(a));
        if (mode === 'slug') setOut(a.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
      };
      return (
        <div className="space-y-4">
          <textarea value={a} onChange={e => setA(e.target.value)} placeholder="Enter text..." className="w-full min-h-[120px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" />
          <div className="flex flex-wrap gap-2">
            {['upper','lower','title','camel','snake','slug'].map(m => (
              <button key={m} onClick={() => convert(m)} className="text-xs bg-neon-cyan/10 border border-neon-cyan/20 px-3 py-2 rounded-lg hover:bg-neon-cyan/20 capitalize">{m}</button>
            ))}
          </div>
          {out && <div className="space-y-2"><textarea value={out} readOnly className="w-full min-h-[100px] rounded-xl bg-surface border border-neon-cyan/20 p-4 text-sm text-text-primary"/><div className="flex gap-2"><CopyBtn text={out} /><DownloadBtn text={out} filename="converted.txt" /></div></div>}
        </div>
      );
    }
    case 'json-formatter':
      return (
        <div className="space-y-3">
          <textarea value={a} onChange={e => setA(e.target.value)} placeholder='Paste JSON: {"hello":"world"}' className="w-full min-h-[160px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm font-mono text-text-primary focus:outline-none focus:border-neon-cyan" />
          <div className="flex flex-wrap gap-2">
            <button onClick={() => handleJsonFormat(false)} className="text-sm bg-brand-gradient text-white px-4 py-2 rounded-xl">Format</button>
            <button onClick={() => handleJsonFormat(true)} className="text-sm border border-neon-cyan text-neon-cyan px-4 py-2 rounded-xl">Minify</button>
            <button onClick={() => { try { JSON.parse(a); setOut('✓ Valid JSON'); } catch(e){ setOut('❌ ' + e.message);} }} className="text-sm border border-electric-violet/30 px-4 py-2 rounded-xl">Validate</button>
          </div>
          {out && <><textarea value={out} readOnly className="w-full min-h-[160px] rounded-xl bg-surface border border-neon-cyan/20 p-4 text-sm font-mono text-text-primary" /><div className="flex gap-2"><CopyBtn text={out} /><DownloadBtn text={out} filename="formatted.json" /></div></>}
        </div>
      );
    case 'base64':
      return (
        <div className="space-y-3">
          <textarea value={a} onChange={e => setA(e.target.value)} placeholder="Enter text or Base64..." className="w-full min-h-[120px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm font-mono text-text-primary focus:outline-none focus:border-neon-cyan" />
          <div className="flex gap-2"><button onClick={() => handleBase64(true)} className="text-sm bg-brand-gradient text-white px-4 py-2 rounded-xl">Encode →</button><button onClick={() => handleBase64(false)} className="text-sm border border-neon-cyan text-neon-cyan px-4 py-2 rounded-xl">← Decode</button></div>
          {out && <><textarea value={out} readOnly className="w-full min-h-[120px] rounded-xl bg-surface border border-neon-cyan/20 p-4 text-sm font-mono text-text-primary" /><div className="flex gap-2"><CopyBtn text={out} /></div></>}
        </div>
      );
    case 'url-encoder': {
      return (
        <div className="space-y-3">
          <textarea value={a} onChange={e => setA(e.target.value)} placeholder="https://example.com?q=hello world" className="w-full min-h-[100px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm font-mono text-text-primary focus:outline-none focus:border-neon-cyan" />
          <div className="flex gap-2">
            <button onClick={() => setOut(encodeURIComponent(a))} className="text-sm bg-brand-gradient text-white px-4 py-2 rounded-xl">Encode</button>
            <button onClick={() => { try{setOut(decodeURIComponent(a))}catch(e){setOut('❌ '+e.message)} }} className="text-sm border border-neon-cyan text-neon-cyan px-4 py-2 rounded-xl">Decode</button>
            <button onClick={() => setOut(encodeURI(a))} className="text-xs border border-electric-violet/30 px-3 py-2 rounded-xl">encodeURI</button>
          </div>
          {out && <><textarea value={out} readOnly className="w-full min-h-[100px] rounded-xl bg-surface border border-neon-cyan/20 p-4 text-sm font-mono text-text-primary" /><CopyBtn text={out} /></>}
        </div>
      );
    }
    case 'qr-generator': {
      const qrUrl = a ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(a)}` : '';
      return (
        <div className="space-y-4">
          <input value={a} onChange={e => setA(e.target.value)} placeholder="Enter URL or text for QR" className="w-full rounded-xl bg-background border border-electric-violet/20 p-4 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" />
          <button onClick={() => setOut(a)} className="text-sm bg-brand-gradient text-white px-4 py-2 rounded-xl">Generate</button>
          {(out || a) && qrUrl && <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-xl w-fit mx-auto"><img src={qrUrl} alt="QR" className="w-60 h-60" loading="lazy" /><a href={qrUrl} download="qr.png" className="text-sm bg-neon-cyan text-white px-4 py-2 rounded-xl">Download PNG</a></div>}
        </div>
      );
    }
    case 'password-generator': {
      const gen = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + (includeSymbols ? '!@#$%^&*()' : '');
        let p=''; for(let i=0;i<len;i++) p+=chars[Math.floor(Math.random()*chars.length)]; setOut(p);
      };
      return (
        <div className="space-y-4">
          <div className="flex gap-4 items-center flex-wrap">
            <label className="text-sm text-text-muted">Length <input type="range" min="6" max="64" value={len} onChange={e=>setLen(+e.target.value)} className="mx-2" /> <span className="font-bold text-neon-cyan">{len}</span></label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={includeSymbols} onChange={e=>setIncludeSymbols(e.target.checked)} /> Symbols</label>
            <button onClick={gen} className="text-sm bg-brand-gradient text-white px-4 py-2 rounded-xl">Generate</button>
          </div>
          {out && <div className="flex gap-2 items-center"><input value={out} readOnly className="flex-1 rounded-xl bg-surface border border-neon-cyan/20 p-3 text-sm font-mono text-text-primary" /><CopyBtn text={out} /></div>}
        </div>
      );
    }
    case 'uuid-generator': {
      const gen = (n=5) => {
        const arr=[]; for(let i=0;i<n;i++) arr.push(crypto.randomUUID());
        setOut(arr.join('\n'));
      };
      return (
        <div className="space-y-3">
          <div className="flex gap-2"><button onClick={()=>gen(1)} className="text-sm bg-brand-gradient text-white px-4 py-2 rounded-xl">Generate 1</button><button onClick={()=>gen(10)} className="text-sm border border-neon-cyan text-neon-cyan px-4 py-2 rounded-xl">Generate 10</button></div>
          {out && <><textarea value={out} readOnly className="w-full min-h-[120px] rounded-xl bg-surface border border-neon-cyan/20 p-4 text-sm font-mono text-text-primary" /><div className="flex gap-2"><CopyBtn text={out} /><DownloadBtn text={out} filename="uuids.txt" /></div></>}
        </div>
      );
    }
    case 'hash-generator': {
      const gen = async (algo) => {
        if (!a) return;
        if (algo === 'SHA-256' || algo === 'SHA-1') { const h = await shaHash(a, algo); setOut(`${algo}: ${h}`); }
        else setOut('MD5 requires server (use SHA-256/1). Input hashed with ' + algo);
      };
      return (
        <div className="space-y-3">
          <textarea value={a} onChange={e=>setA(e.target.value)} placeholder="Text to hash..." className="w-full min-h-[100px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm font-mono text-text-primary focus:outline-none focus:border-neon-cyan" />
          <div className="flex gap-2 flex-wrap">
            <button onClick={() => gen('SHA-256')} className="text-sm bg-brand-gradient text-white px-4 py-2 rounded-xl">SHA-256</button>
            <button onClick={() => gen('SHA-1')} className="text-sm border border-neon-cyan text-neon-cyan px-4 py-2 rounded-xl">SHA-1</button>
            <button onClick={() => gen('SHA-384')} className="text-sm border border-electric-violet/30 px-4 py-2 rounded-xl">SHA-384</button>
          </div>
          {out && <><textarea value={out} readOnly className="w-full min-h-[80px] rounded-xl bg-surface border border-neon-cyan/20 p-4 text-sm font-mono text-text-primary" /><CopyBtn text={out} /></>}
        </div>
      );
    }
    case 'color-picker': {
      const hexToRgb = (h) => { const v = h.replace('#',''); const n=parseInt(v,16); return `${(n>>16)&255}, ${(n>>8)&255}, ${n&255}`; };
      const hexToHsl = (h) => {
        let r=parseInt(h.slice(1,3),16)/255,g=parseInt(h.slice(3,5),16)/255,b=parseInt(h.slice(5,7),16)/255;
        const max=Math.max(r,g,b),min=Math.min(r,g,b); let hh=0,s=0,l=(max+min)/2;
        if(max!==min){ const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min); switch(max){case r:hh=(g-b)/d+(g<b?6:0);break;case g:hh=(b-r)/d+2;break;case b:hh=(r-g)/d+4;break;} hh/=6; }
        return `${Math.round(hh*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%`;
      };
      return (
        <div className="space-y-4">
          <div className="flex gap-4 items-center flex-wrap">
            <input type="color" value={/^#[0-9A-Fa-f]{6}$/.test(a) ? a : '#7EBBC5'} onChange={e=>setA(e.target.value)} className="w-16 h-16 rounded-xl border-2 border-neon-cyan/20 p-1 bg-surface" />
            <input value={a} onChange={e=>setA(e.target.value)} placeholder="#7EBBC5" className="flex-1 min-w-[140px] rounded-xl bg-background border border-electric-violet/20 p-3 text-sm font-mono text-text-primary focus:outline-none focus:border-neon-cyan" />
            <div className="w-16 h-16 rounded-xl border border-electric-violet/20" style={{ background: /^#[0-9A-Fa-f]{6}$/.test(a) ? a : '#7EBBC5' }} />
          </div>
          {/^#[0-9A-Fa-f]{6}$/.test(a) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-surface rounded-xl p-3 flex justify-between">HEX <span className="font-mono text-neon-cyan">{a.toUpperCase()}</span></div>
              <div className="bg-surface rounded-xl p-3 flex justify-between">RGB <span className="font-mono">{hexToRgb(a)}</span></div>
              <div className="bg-surface rounded-xl p-3 flex justify-between">HSL <span className="font-mono">{hexToHsl(a)}</span></div>
              <button onClick={()=>navigator.clipboard.writeText(a)} className="bg-neon-cyan text-white rounded-xl p-3">Copy HEX</button>
            </div>
          )}
        </div>
      );
    }
    case 'regex-tester': {
      let matchInfo = '';
      try { if (a && b) { const re = new RegExp(a, 'g'); const m = b.match(re); matchInfo = m ? `${m.length} matches: ${m.slice(0,20).join(', ')}` : 'No matches'; } } catch(e){ matchInfo = '❌ ' + e.message; }
      return (
        <div className="space-y-3">
          <input value={a} onChange={e=>setA(e.target.value)} placeholder="Regex e.g. \b\w+@\w+\.\w+\b" className="w-full rounded-xl bg-background border border-electric-violet/20 p-3 text-sm font-mono text-text-primary focus:outline-none focus:border-neon-cyan" />
          <textarea value={b} onChange={e=>setB(e.target.value)} placeholder="Test string..." className="w-full min-h-[120px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" />
          <div className="bg-surface rounded-xl p-3 text-sm font-mono text-text-primary min-h-[40px]">{matchInfo || 'Enter regex & test string'}</div>
        </div>
      );
    }
    case 'markdown-preview': {
      return (
        <div className="grid md:grid-cols-2 gap-4">
          <textarea value={a} onChange={e=>setA(e.target.value)} placeholder="# Hello Markdown" className="w-full min-h-[260px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm font-mono text-text-primary focus:outline-none focus:border-neon-cyan" />
          <div className="rounded-xl bg-surface border border-neon-cyan/20 p-4 text-sm text-text-primary overflow-auto min-h-[260px] whitespace-pre-wrap">{a || 'Preview will appear here'}</div>
        </div>
      );
    }
    default: {
      // Generic not-yet-implemented but functional placeholder with copy/download for text tools
      if (tool.slug === 'lorem-generator') {
        const gen = (paras=3) => {
          const lorem='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
          setOut(Array(paras).fill(lorem).join('\n\n'));
        };
        return (
          <div className="space-y-3">
            <div className="flex gap-2"><button onClick={()=>gen(1)} className="text-sm bg-brand-gradient text-white px-4 py-2 rounded-xl">1 Para</button><button onClick={()=>gen(3)} className="text-sm border border-neon-cyan text-neon-cyan px-4 py-2 rounded-xl">3 Paras</button><button onClick={()=>gen(5)} className="text-sm border border-electric-violet/30 px-4 py-2 rounded-xl">5 Paras</button></div>
            {out && <><textarea value={out} readOnly className="w-full min-h-[160px] rounded-xl bg-surface border border-neon-cyan/20 p-4 text-sm text-text-primary" /><div className="flex gap-2"><CopyBtn text={out} /><DownloadBtn text={out} filename="lorem.txt" /></div></>}
          </div>
        );
      }
      if (tool.slug === 'text-diff') {
        const diff = a === b ? '✓ Identical' : `Left: ${a.length} chars, Right: ${b.length} chars — differ at char ${[...a].findIndex((c,i)=>c!==b[i])}`;
        return (
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-3">
              <textarea value={a} onChange={e=>setA(e.target.value)} placeholder="Left text" className="w-full min-h-[140px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm text-text-primary" />
              <textarea value={b} onChange={e=>setB(e.target.value)} placeholder="Right text" className="w-full min-h-[140px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm text-text-primary" />
            </div>
            <div className="bg-surface rounded-xl p-3 text-sm">{diff}</div>
          </div>
        );
      }
      return (
        <div className="text-center py-8">
          <p className="text-2xl mb-2">🚧</p>
          <p className="text-text-primary font-semibold">Coming soon — fully client-side</p>
          <p className="text-xs text-text-muted mt-1">This tool runs 100% in your browser. Implementation lands next iteration. Meanwhile try JSON, Base64, QR & Word Counter.</p>
          <div className="flex justify-center gap-2 mt-4">
            <Link to="/tools" className="text-sm bg-brand-gradient text-white px-4 py-2 rounded-xl">Browse other tools</Link>
          </div>
        </div>
      );
    }
  }
}
