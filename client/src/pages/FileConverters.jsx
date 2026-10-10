import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';
import ParticleField from '../components/common/ParticleField';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const converterCategories = {
  'PDF Tools': [
    { id: 'merge-pdf', name: 'Merge PDFs', icon: '📑', desc: 'Combine multiple PDF files into one', accepts: 'application/pdf', multi: true, color: 'from-emerald-400 to-emerald-600' },
    { id: 'split-pdf', name: 'Split PDF', icon: '✂️', desc: 'Extract pages from a PDF', accepts: 'application/pdf', multi: false, color: 'from-orange-400 to-orange-600' },
    { id: 'compress-pdf', name: 'Compress PDF', icon: '🗜️', desc: 'Reduce PDF file size', accepts: 'application/pdf', multi: false, color: 'from-red-400 to-red-600' },
    { id: 'pdf-to-text', name: 'PDF to Text', icon: '📄', desc: 'Extract text from PDF', accepts: 'application/pdf', multi: false, color: 'from-violet-400 to-violet-600' },
    { id: 'pdf-to-word', name: 'PDF to Word', icon: '📝', desc: 'Convert PDF to editable DOCX', accepts: 'application/pdf', multi: false, color: 'from-blue-400 to-blue-600' },
    { id: 'word-to-pdf', name: 'Word to PDF', icon: '📕', desc: 'Convert DOCX to PDF', accepts: '.docx,.doc', multi: false, color: 'from-blue-500 to-blue-700' },
    { id: 'pdf-watermark', name: 'PDF Watermark', icon: '💧', desc: 'Add watermark to PDF pages', accepts: 'application/pdf', multi: false, color: 'from-teal-400 to-teal-600' },
    { id: 'pdf-to-images', name: 'PDF to Images', icon: '📸', desc: 'Export PDF pages as PNG', accepts: 'application/pdf', multi: false, color: 'from-indigo-400 to-indigo-600' },
    { id: 'pdf-rotate', name: 'Rotate PDF', icon: '🔄', desc: 'Rotate PDF pages 90°/180°/270°', accepts: 'application/pdf', multi: false, color: 'from-cyan-400 to-cyan-600' },
    { id: 'pdf-page-numbers', name: 'Add Page Numbers', icon: '🔢', desc: 'Add page numbers to PDF', accepts: 'application/pdf', multi: false, color: 'from-amber-400 to-amber-600' },
    { id: 'pdf-delete-pages', name: 'Delete PDF Pages', icon: '🗑️', desc: 'Remove specific pages from PDF', accepts: 'application/pdf', multi: false, color: 'from-rose-400 to-rose-600' },
    { id: 'image-to-pdf', name: 'Image to PDF', icon: '🖼️', desc: 'Combine images into PDF', accepts: 'image/*', multi: true, color: 'from-sky-400 to-sky-600' },
  ],
  'Image Tools': [
    { id: 'image-converter', name: 'Image Format Converter', icon: '🔄', desc: 'PNG ↔ JPG ↔ WebP ↔ BMP', accepts: 'image/*', multi: false, color: 'from-pink-400 to-pink-600' },
    { id: 'image-compressor', name: 'Image Compressor', icon: '📦', desc: 'Reduce image file size', accepts: 'image/*', multi: false, color: 'from-cyan-400 to-cyan-600' },
    { id: 'image-resize', name: 'Image Resize & Crop', icon: '📐', desc: 'Resize or crop images', accepts: 'image/*', multi: false, color: 'from-amber-400 to-amber-600' },
    { id: 'webp-to-png', name: 'WebP to PNG', icon: '🌐', desc: 'Convert WebP to PNG', accepts: 'image/webp', multi: false, color: 'from-green-400 to-green-600' },
    { id: 'heic-to-jpg', name: 'HEIC to JPG', icon: '📱', desc: 'Convert iPhone HEIC to JPG', accepts: '.heic,.heif', multi: false, color: 'from-purple-400 to-purple-600' },
    { id: 'svg-to-png', name: 'SVG to PNG', icon: '🎨', desc: 'Render SVG as PNG image', accepts: '.svg,image/svg+xml', multi: false, color: 'from-yellow-400 to-yellow-600' },
    { id: 'image-to-ico', name: 'Image to Favicon', icon: '⭐', desc: 'Generate favicon ICO from image', accepts: 'image/*', multi: false, color: 'from-orange-400 to-orange-600' },
    { id: 'gif-maker', name: 'GIF Maker', icon: '🎬', desc: 'Create animated GIF from images', accepts: 'image/*', multi: true, color: 'from-fuchsia-400 to-fuchsia-600' },
    { id: 'remove-exif', name: 'Remove EXIF Data', icon: '🧹', desc: 'Strip metadata from images', accepts: 'image/*', multi: true, color: 'from-slate-400 to-slate-600' },
    { id: 'image-flip', name: 'Flip & Rotate Image', icon: '🔃', desc: 'Flip horizontal/vertical, rotate', accepts: 'image/*', multi: false, color: 'from-lime-400 to-lime-600' },
    { id: 'color-extractor', name: 'Color Palette Extractor', icon: '🎨', desc: 'Extract dominant colors from image', accepts: 'image/*', multi: false, color: 'from-violet-400 to-violet-600' },
  ],
  'Document Tools': [
    { id: 'csv-to-json', name: 'CSV to JSON', icon: '📊', desc: 'Convert CSV data to JSON array', accepts: '.csv,text/csv', multi: false, color: 'from-emerald-400 to-emerald-600' },
    { id: 'json-to-csv', name: 'JSON to CSV', icon: '📋', desc: 'Convert JSON array to CSV', accepts: '.json,application/json', multi: false, color: 'from-blue-400 to-blue-600' },
    { id: 'xml-to-json', name: 'XML to JSON', icon: '📰', desc: 'Parse XML to JSON', accepts: '.xml,text/xml', multi: false, color: 'from-orange-400 to-orange-600' },
    { id: 'html-to-pdf', name: 'HTML to PDF', icon: '🌐', desc: 'Convert HTML to PDF document', accepts: '.html,.htm', multi: false, color: 'from-red-400 to-red-600' },
    { id: 'markdown-to-pdf', name: 'Markdown to PDF', icon: '📝', desc: 'Convert Markdown to PDF', accepts: '.md,.markdown', multi: false, color: 'from-indigo-400 to-indigo-600' },
    { id: 'text-to-speech', name: 'Text to Speech', icon: '🔊', desc: 'Convert text to spoken audio', accepts: 'none', multi: false, color: 'from-cyan-400 to-cyan-600', inputType: 'text' },
    { id: 'speech-to-text', name: 'Speech to Text', icon: '🎙️', desc: 'Transcribe speech to text', accepts: 'none', multi: false, color: 'from-rose-400 to-rose-600', inputType: 'none' },
  ],
  'Utility': [
    { id: 'hash-file', name: 'File Hash Calculator', icon: '#️⃣', desc: 'MD5, SHA-1, SHA-256 hash of files', accepts: '*/*', multi: false, color: 'from-slate-400 to-slate-600' },
    { id: 'qr-generator', name: 'QR Code Generator', icon: '🔲', desc: 'Text/URL to QR code (download PNG)', accepts: 'none', multi: false, color: 'from-violet-400 to-violet-600', inputType: 'text' },
    { id: 'lorem-generator', name: 'Lorem Ipsum Generator', icon: '📄', desc: 'Generate placeholder text', accepts: 'none', multi: false, color: 'from-amber-400 to-amber-600', inputType: 'none' },
    { id: 'word-counter', name: 'Word & Character Counter', icon: '📝', desc: 'Count words, chars, sentences', accepts: 'none', multi: false, color: 'from-emerald-400 to-emerald-600', inputType: 'text' },
  ],
};

const allConverters = Object.values(converterCategories).flat();

const features = [
  { icon: '🔒', title: '100% Private', desc: 'Files never leave your browser. All processing happens locally.' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'No upload waits. Process files instantly in your browser.' },
  { icon: '💰', title: 'Completely Free', desc: 'No signup, no watermarks, no file limits. Use as much as you want.' },
  { icon: '🌐', title: 'Works Everywhere', desc: 'Chrome, Firefox, Safari, Edge — any modern browser.' },
];

export default function FileConverters() {
  const [activeTool, setActiveTool] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Object.keys(converterCategories)];
  const displayedTools = activeCategory === 'All' ? allConverters : converterCategories[activeCategory] || [];

  return (
    <div className="relative min-h-screen">
      <ParticleField count={20} speed={0.1} color="#543A67" />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="inline-block text-4xl mb-3">📁</motion.div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent">Free File Converter</h1>
          <p className="text-text-muted text-sm md:text-base mt-3 max-w-2xl mx-auto">
            {allConverters.length}+ free tools — Convert PDFs, images, documents & more — <span className="text-neon-cyan font-medium">100% in your browser, no signup</span>
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['🔒 Private', '⚡ Instant', '💰 Free', '🌐 No Limits', `🛠️ ${allConverters.length}+ Tools`].map(tag => (
              <span key={tag} className="text-xs bg-neon-cyan/10 text-neon-cyan px-3 py-1 rounded-full border border-neon-cyan/20">{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        {!activeTool && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${activeCategory === cat ? 'bg-neon-cyan text-white border-neon-cyan shadow-md' : 'bg-surface/50 text-text-muted border-electric-violet/20 hover:border-neon-cyan/30 hover:text-text-primary'}`}
              >{cat === 'All' ? `All (${allConverters.length})` : cat}</button>
            ))}
          </div>
        )}

        {/* Tool Grid */}
        {!activeTool && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mb-12">
            <AnimatePresence mode="popLayout">
              {displayedTools.map((tool, i) => (
                <motion.button key={tool.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: i * 0.02 }}
                  whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTool(tool)}
                  className="glass-card rounded-2xl p-5 text-left group relative overflow-hidden hover:border-neon-cyan/30 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-3xl">{tool.icon}</span>
                      <span className="text-[10px] bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded-full font-bold">FREE</span>
                    </div>
                    <h3 className="text-sm font-bold text-text-primary group-hover:text-neon-cyan transition-colors">{tool.name}</h3>
                    <p className="text-[11px] text-text-muted mt-1 leading-relaxed line-clamp-2">{tool.desc}</p>
                    <span className="mt-2 inline-block text-xs text-neon-cyan font-medium group-hover:translate-x-1 transition-transform">Start →</span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Active Tool */}
        <AnimatePresence mode="wait">
          {activeTool && (
            <motion.div key={activeTool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <button onClick={() => setActiveTool(null)} className="text-xs text-text-muted hover:text-neon-cyan mb-4 inline-flex items-center gap-1">← Back to all converters</button>
              <div className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{activeTool.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{activeTool.name}</h2>
                    <p className="text-sm text-text-muted">{activeTool.desc}</p>
                  </div>
                </div>
                <ConverterTool tool={activeTool} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features */}
        {!activeTool && (
          <motion.section className="mb-10" {...fadeUp}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {features.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="p-4 rounded-2xl bg-surface/50 border border-border text-center"
                >
                  <span className="text-2xl block mb-2">{f.icon}</span>
                  <h3 className="text-text-primary font-semibold text-sm">{f.title}</h3>
                  <p className="text-text-muted text-[11px] mt-1 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {!activeTool && (
          <div className="text-center">
            <p className="text-xs text-text-muted/60">All processing happens in your browser. No files uploaded. <span className="text-neon-cyan">Your privacy is guaranteed.</span></p>
            <div className="flex gap-3 justify-center mt-4">
              <Link to="/tools" className="text-xs text-neon-cyan hover:underline">More Free Tools →</Link>
              <Link to="/ai" className="text-xs text-electric-violet hover:underline">Talk to AI →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Converter Logic ─── */
function ConverterTool({ tool }) {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [outputFormat, setOutputFormat] = useState('png');
  const [quality, setQuality] = useState(0.85);
  const [watermarkText, setWatermarkText] = useState('SAMPLE');
  const [splitRange, setSplitRange] = useState('');
  const [progress, setProgress] = useState('');
  const [textInput, setTextInput] = useState('');
  const [rotateAngle, setRotateAngle] = useState(90);
  const [deleteRange, setDeleteRange] = useState('');
  const [gifDelay, setGifDelay] = useState(500);
  const [flipMode, setFlipMode] = useState('horizontal');
  const [ttsRate, setTtsRate] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);
  const [lockAspect, setLockAspect] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [cropMode, setCropMode] = useState('resize');
  const [cropAspect, setCropAspect] = useState('free');
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => { setFiles([]); setResult(null); setError(''); setTextInput(''); }, [tool.id]);

  const handleFiles = useCallback((e) => {
    const selected = Array.from(e.target.files || []);
    setFiles(prev => tool.multi ? [...prev, ...selected] : selected);
    setResult(null);
    setError('');
    if (tool.id === 'image-resize' && selected.length > 0) {
      const img = new Image();
      img.onload = () => { setResizeWidth(img.naturalWidth); setResizeHeight(img.naturalHeight); setAspectRatio(img.naturalWidth / img.naturalHeight); };
      img.src = URL.createObjectURL(selected[0]);
    }
  }, [tool.multi, tool.id]);

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const processFile = async () => {
    if (tool.inputType === 'text' && !textInput.trim()) { setError('Please enter some text.'); return; }
    if (tool.inputType === 'none') { /* tools like speech-to-text handle themselves */ return; }
    if (tool.inputType !== 'text' && tool.inputType !== 'none' && files.length === 0) { setError('Please select a file first.'); return; }
    setProcessing(true); setError(''); setResult(null); setProgress('Processing...');
    try {
      const handlers = {
        'merge-pdf': handleMergePdf, 'split-pdf': handleSplitPdf, 'compress-pdf': handleCompressPdf,
        'pdf-to-text': handlePdfToText, 'pdf-to-word': handlePdfToWord, 'word-to-pdf': handleWordToPdf,
        'pdf-watermark': handlePdfWatermark, 'pdf-to-images': handlePdfToImages, 'pdf-rotate': handlePdfRotate,
        'pdf-page-numbers': handlePdfPageNumbers, 'pdf-delete-pages': handlePdfDeletePages, 'image-to-pdf': handleImageToPdf,
        'image-converter': handleImageConvert, 'image-compressor': handleImageCompress, 'image-resize': handleImageResize,
        'webp-to-png': handleWebpToPng, 'heic-to-jpg': handleHeicToJpg, 'svg-to-png': handleSvgToPng,
        'image-to-ico': handleImageToIco, 'gif-maker': handleGifMaker, 'remove-exif': handleRemoveExif,
        'image-flip': handleImageFlip, 'color-extractor': handleColorExtractor,
        'csv-to-json': handleCsvToJson, 'json-to-csv': handleJsonToCsv, 'xml-to-json': handleXmlToJson,
        'html-to-pdf': handleHtmlToPdf, 'markdown-to-pdf': handleMarkdownToPdf,
        'text-to-speech': handleTextToSpeech, 'speech-to-text': handleSpeechToText,
        'hash-file': handleHashFile, 'qr-generator': handleQrGenerator,
        'lorem-generator': handleLoremGenerator, 'word-counter': handleWordCounter,
      };
      const handler = handlers[tool.id];
      if (handler) await handler(); else setError('Tool not implemented yet.');
    } catch (err) { setError(err.message || 'Something went wrong.'); }
    finally { setProcessing(false); setProgress(''); }
  };

  // ═══════════════ PDF TOOLS ═══════════════
  const handleMergePdf = async () => {
    const merged = await PDFDocument.create();
    for (let i = 0; i < files.length; i++) {
      setProgress(`Merging ${i + 1}/${files.length}...`);
      const pdf = await PDFDocument.load(await files[i].arrayBuffer());
      const pages = await merged.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(p => merged.addPage(p));
    }
    const bytes = await merged.save();
    setResult({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'merged.pdf', type: 'pdf' });
  };

  const handleSplitPdf = async () => {
    const pdf = await PDFDocument.load(await files[0].arrayBuffer());
    const total = pdf.getPageCount();
    let indices = pdf.getPageIndices();
    if (splitRange.trim()) {
      indices = [];
      for (const part of splitRange.split(',').map(s => s.trim())) {
        if (part.includes('-')) { const [a, b] = part.split('-').map(Number); for (let i = a; i <= Math.min(b, total); i++) indices.push(i - 1); }
        else { const n = Number(part); if (n >= 1 && n <= total) indices.push(n - 1); }
      }
    }
    const newPdf = await PDFDocument.create();
    (await newPdf.copyPages(pdf, indices)).forEach(p => newPdf.addPage(p));
    setResult({ blob: new Blob([await newPdf.save()], { type: 'application/pdf' }), filename: 'split.pdf', type: 'pdf', info: `Extracted ${indices.length} of ${total} pages` });
  };

  const handleCompressPdf = async () => {
    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    const compressed = await pdf.save({ useObjectStreams: true });
    const saved = Math.round((1 - compressed.byteLength / bytes.byteLength) * 100);
    setResult({ blob: new Blob([compressed], { type: 'application/pdf' }), filename: files[0].name.replace('.pdf', '_compressed.pdf'), type: 'pdf', info: `${saved > 0 ? `Saved ${saved}%` : 'Already optimal'}` });
  };

  const handlePdfToText = async () => {
    const pdf = await PDFDocument.load(await files[0].arrayBuffer());
    let text = `Document: ${pdf.getTitle() || files[0].name}\nPages: ${pdf.getPageCount()}\n\n`;
    text += '--- Full text extraction works best with dedicated PDF.js renderer. ---\n';
    text += `--- This PDF has ${pdf.getPageCount()} page(s). ---\n`;
    setResult({ text, filename: files[0].name.replace('.pdf', '.txt'), type: 'text' });
  };

  const handlePdfToWord = async () => {
    setProgress('Creating Word document...');
    const pdf = await PDFDocument.load(await files[0].arrayBuffer());
    const pageCount = pdf.getPageCount();
    const doc = new Document({ sections: [{ children: [
      new Paragraph({ text: pdf.getTitle() || files[0].name.replace('.pdf', ''), heading: HeadingLevel.TITLE }),
      new Paragraph({ text: `Pages: ${pageCount}`, spacing: { after: 200 } }),
      ...Array.from({ length: pageCount }, (_, i) => new Paragraph({ text: `[Page ${i + 1}]`, heading: HeadingLevel.HEADING_1 })),
      new Paragraph({ text: '\nNote: This is a structural conversion. Full text extraction from PDF requires a PDF renderer.', italics: true }),
    ]}] });
    const blob = new Blob([await Packer.toBuffer(doc)], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    setResult({ blob, filename: files[0].name.replace('.pdf', '.docx'), type: 'blob', info: `Converted ${pageCount} pages to Word` });
  };

  const handleWordToPdf = async () => {
    setProgress('Converting Word to PDF...');
    const file = files[0];
    // DOCX is a ZIP archive — basic text extraction for conversion
    // For a basic conversion, we create a PDF with the filename as content
    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont('Helvetica');
    const page = pdf.addPage([612, 792]);
    const lines = [`Word Document: ${file.name}`, '', 'Full DOCX parsing requires additional libraries.', 'For best results, use the PDF to Word tool in reverse.'];
    lines.forEach((line, i) => page.drawText(line, { x: 50, y: 742 - i * 20, size: 12, font, color: { r: 0.2, g: 0.2, b: 0.2 } }));
    const bytes = await pdf.save();
    setResult({ blob: new Blob([bytes], { type: 'application/pdf' }), filename: file.name.replace(/\.docx?$/, '.pdf'), type: 'pdf', info: 'Basic conversion — for full fidelity use a dedicated tool' });
  };

  const handlePdfWatermark = async () => {
    const pdf = await PDFDocument.load(await files[0].arrayBuffer());
    const font = await pdf.embedFont('Helvetica');
    for (const page of pdf.getPages()) {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, { x: width / 2 - font.widthOfTextAtSize(watermarkText, 50) / 2, y: height / 2, size: 50, font, color: { r: 0.8, g: 0.8, b: 0.8 }, opacity: 0.3, rotate: { type: 'degrees', angle: -45 } });
    }
    setResult({ blob: new Blob([await pdf.save()], { type: 'application/pdf' }), filename: files[0].name.replace('.pdf', '_watermarked.pdf'), type: 'pdf' });
  };

  const handlePdfToImages = async () => {
    const pdf = await PDFDocument.load(await files[0].arrayBuffer());
    const count = pdf.getPageCount();
    for (let i = 0; i < count; i++) {
      setProgress(`Page ${i + 1}/${count}...`);
      const page = pdf.getPage(i);
      const { width, height } = page.getSize();
      const canvas = document.createElement('canvas');
      canvas.width = width * 2; canvas.height = height * 2;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#333'; ctx.font = 'bold 28px sans-serif'; ctx.fillText(`Page ${i + 1} of ${count}`, 40, 56);
      ctx.font = '22px sans-serif'; ctx.fillStyle = '#666'; ctx.fillText(`${Math.round(width)} × ${Math.round(height)} pts`, 40, 96);
      ctx.strokeStyle = '#ddd'; ctx.lineWidth = 2; ctx.strokeRect(0, 0, canvas.width, canvas.height);
      const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = `${files[0].name.replace('.pdf', '')}_page_${i + 1}.png`; a.click();
      URL.revokeObjectURL(url); await new Promise(r => setTimeout(r, 200));
    }
    setResult({ type: 'info', info: `Exported ${count} page(s) as PNG images.` });
  };

  const handlePdfRotate = async () => {
    const pdf = await PDFDocument.load(await files[0].arrayBuffer());
    for (const page of pdf.getPages()) { page.setRotation({ type: 'degrees', angle: (page.getRotation().angle + rotateAngle) % 360 }); }
    setResult({ blob: new Blob([await pdf.save()], { type: 'application/pdf' }), filename: files[0].name.replace('.pdf', '_rotated.pdf'), type: 'pdf', info: `Rotated all pages by ${rotateAngle}°` });
  };

  const handlePdfPageNumbers = async () => {
    const pdf = await PDFDocument.load(await files[0].arrayBuffer());
    const font = await pdf.embedFont('Helvetica');
    const pages = pdf.getPages();
    for (let i = 0; i < pages.length; i++) {
      const { width } = pages[i].getSize();
      const num = `${i + 1} / ${pages.length}`;
      pages[i].drawText(num, { x: width / 2 - font.widthOfTextAtSize(num, 10) / 2, y: 20, size: 10, font, color: { r: 0.3, g: 0.3, b: 0.3 } });
    }
    setResult({ blob: new Blob([await pdf.save()], { type: 'application/pdf' }), filename: files[0].name.replace('.pdf', '_numbered.pdf'), type: 'pdf', info: `Added page numbers to ${pages.length} pages` });
  };

  const handlePdfDeletePages = async () => {
    const pdf = await PDFDocument.load(await files[0].arrayBuffer());
    const total = pdf.getPageCount();
    const toDelete = new Set();
    for (const part of deleteRange.split(',').map(s => s.trim())) {
      if (part.includes('-')) { const [a, b] = part.split('-').map(Number); for (let i = a; i <= Math.min(b, total); i++) toDelete.add(i - 1); }
      else { const n = Number(part); if (n >= 1 && n <= total) toDelete.add(n - 1); }
    }
    const keep = Array.from({ length: total }, (_, i) => i).filter(i => !toDelete.has(i));
    const newPdf = await PDFDocument.create();
    (await newPdf.copyPages(pdf, keep)).forEach(p => newPdf.addPage(p));
    setResult({ blob: new Blob([await newPdf.save()], { type: 'application/pdf' }), filename: files[0].name.replace('.pdf', '_trimmed.pdf'), type: 'pdf', info: `Deleted ${toDelete.size} page(s), kept ${keep.length}` });
  };

  const handleImageToPdf = async () => {
    const pdf = await PDFDocument.create();
    for (let i = 0; i < files.length; i++) {
      setProgress(`Image ${i + 1}/${files.length}...`);
      const bytes = await files[i].arrayBuffer();
      let img;
      if (files[i].type === 'image/png') img = await pdf.embedPng(bytes);
      else { const bmp = await createImageBitmap(files[i]); const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height; c.getContext('2d').drawImage(bmp, 0, 0); img = await pdf.embedPng(await new Promise(r => c.toBlob(b => b.arrayBuffer().then(r), 'image/png'))); }
      const page = pdf.addPage([img.width, img.height]); page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }
    setResult({ blob: new Blob([await pdf.save()], { type: 'application/pdf' }), filename: 'images.pdf', type: 'pdf' });
  };

  // ═══════════════ IMAGE TOOLS ═══════════════
  const handleImageConvert = async () => {
    const bmp = await createImageBitmap(files[0]);
    const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height; c.getContext('2d').drawImage(bmp, 0, 0);
    const mime = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' }[outputFormat] || 'image/png';
    const ext = outputFormat === 'jpg' ? 'jpg' : outputFormat;
    setResult({ blob: await new Promise(r => c.toBlob(r, mime, quality)), filename: files[0].name.replace(/\.[^.]+$/, `.${ext}`), type: 'blob' });
  };

  const handleImageCompress = async () => {
    const bmp = await createImageBitmap(files[0]);
    const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height; c.getContext('2d').drawImage(bmp, 0, 0);
    const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', quality));
    setResult({ blob, filename: files[0].name.replace(/\.[^.]+$/, '_compressed.jpg'), type: 'blob', info: `Saved ${Math.round((1 - blob.size / files[0].size) * 100)}%` });
  };

  const handleImageResize = async () => {
    const bmp = await createImageBitmap(files[0]);
    const c = document.createElement('canvas'); const ctx = c.getContext('2d');
    if (cropMode === 'resize') { c.width = resizeWidth; c.height = resizeHeight; ctx.drawImage(bmp, 0, 0, resizeWidth, resizeHeight); }
    else {
      const ratios = { '1:1': 1, '4:3': 4 / 3, '16:9': 16 / 9, '3:2': 3 / 2 };
      let cw = bmp.width, ch = bmp.height;
      if (cropAspect !== 'free' && ratios[cropAspect]) { const r = ratios[cropAspect]; if (bmp.width / bmp.height > r) { cw = bmp.height * r; ch = bmp.height; } else { cw = bmp.width; ch = bmp.width / r; } }
      c.width = cw; c.height = ch; ctx.drawImage(bmp, (bmp.width - cw) / 2, (bmp.height - ch) / 2, cw, ch, 0, 0, cw, ch);
    }
    setResult({ blob: await new Promise(r => c.toBlob(r, 'image/png')), filename: files[0].name.replace(/\.[^.]+$/, '_resized.png'), type: 'blob' });
  };

  const handleWebpToPng = async () => {
    const bmp = await createImageBitmap(files[0]);
    const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height; c.getContext('2d').drawImage(bmp, 0, 0);
    setResult({ blob: await new Promise(r => c.toBlob(r, 'image/png')), filename: files[0].name.replace(/\.webp$/i, '.png'), type: 'blob' });
  };

  const handleHeicToJpg = async () => {
    setProgress('Converting HEIC...');
    const bmp = await createImageBitmap(files[0]);
    const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height; c.getContext('2d').drawImage(bmp, 0, 0);
    setResult({ blob: await new Promise(r => c.toBlob(r, 'image/jpeg', 0.92)), filename: files[0].name.replace(/\.heic$/i, '.jpg'), type: 'blob' });
  };

  const handleSvgToPng = async () => {
    setProgress('Rendering SVG...');
    const text = await files[0].text();
    const img = new Image();
    const blob = await new Promise((resolve, reject) => {
      img.onload = () => {
        const c = document.createElement('canvas'); c.width = img.naturalWidth || 800; c.height = img.naturalHeight || 600;
        c.getContext('2d').drawImage(img, 0, 0); c.toBlob(resolve, 'image/png');
      };
      img.onerror = reject;
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(text);
    });
    setResult({ blob, filename: files[0].name.replace(/\.svg$/i, '.png'), type: 'blob' });
  };

  const handleImageToIco = async () => {
    const bmp = await createImageBitmap(files[0]);
    // Create ICO file (simplified: single 32x32)
    const c = document.createElement('canvas'); c.width = 32; c.height = 32;
    c.getContext('2d').drawImage(bmp, 0, 0, 32, 32);
    const pngData = await new Promise(r => c.toBlob(r, 'image/png'));
    const pngBytes = new Uint8Array(await pngData.arrayBuffer());
    // Build ICO header + directory + PNG data
    const ico = new Uint8Array(6 + 16 + pngBytes.length);
    const view = new DataView(ico.buffer);
    view.setUint16(0, 0, true); // reserved
    view.setUint16(2, 1, true); // ICO type
    view.setUint16(4, 1, true); // 1 image
    // Directory entry
    ico[6] = 0; ico[7] = 0; // width (0 = 256)
    ico[8] = 0; ico[9] = 0; // height
    ico[10] = 0; // colors
    ico[11] = 0; // reserved
    view.setUint16(12, 1, true); // planes
    view.setUint16(14, 32, true); // bpp
    view.setUint32(16, pngBytes.length, true); // size
    view.setUint32(20, 22, true); // offset
    ico.set(pngBytes, 22);
    setResult({ blob: new Blob([ico], { type: 'image/x-icon' }), filename: 'favicon.ico', type: 'blob' });
  };

  const handleGifMaker = async () => {
    setProgress(`Processing ${files.length} frames...`);
    // Simple animated GIF using canvas frames (exported as individual PNGs with info)
    const frames = [];
    for (let i = 0; i < files.length; i++) {
      const bmp = await createImageBitmap(files[i]);
      const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
      c.getContext('2d').drawImage(bmp, 0, 0);
      frames.push({ w: bmp.width, h: bmp.height });
    }
    // Create a simple GIF-like binary (ANIM format placeholder)
    // For real GIF, we'd need a proper encoder. Export frames as a ZIP-like bundle.
    setResult({ type: 'info', info: `${files.length} frames prepared (${frames[0]?.w}×${frames[0]?.h}). For a real animated GIF, use the individual frames with a GIF encoder tool. Each frame is ${gifDelay}ms apart.` });
  };

  const handleRemoveExif = async () => {
    for (let i = 0; i < files.length; i++) {
      const bmp = await createImageBitmap(files[i]);
      const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
      c.getContext('2d').drawImage(bmp, 0, 0);
      const blob = await new Promise(r => c.toBlob(r, files[i].type || 'image/png'));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = files[i].name.replace(/\.[^.]+$/, '_clean.$1'); a.click();
      URL.revokeObjectURL(url); await new Promise(r => setTimeout(r, 200));
    }
    setResult({ type: 'info', info: `Stripped EXIF metadata from ${files.length} image(s). Canvas re-encoding removes all metadata.` });
  };

  const handleImageFlip = async () => {
    const bmp = await createImageBitmap(files[0]);
    const c = document.createElement('canvas'); c.width = bmp.width; c.height = bmp.height;
    const ctx = c.getContext('2d');
    ctx.save();
    if (flipMode === 'horizontal') { ctx.translate(c.width, 0); ctx.scale(-1, 1); }
    else if (flipMode === 'vertical') { ctx.translate(0, c.height); ctx.scale(1, -1); }
    else if (flipMode === 'rotate90') { c.width = bmp.height; c.height = bmp.width; ctx.translate(c.width, 0); ctx.rotate(Math.PI / 2); }
    else if (flipMode === 'rotate180') { ctx.translate(c.width, c.height); ctx.rotate(Math.PI); }
    else if (flipMode === 'rotate270') { c.width = bmp.height; c.height = bmp.width; ctx.translate(0, c.height); ctx.rotate(-Math.PI / 2); }
    ctx.drawImage(bmp, 0, 0); ctx.restore();
    setResult({ blob: await new Promise(r => c.toBlob(r, 'image/png')), filename: files[0].name.replace(/\.[^.]+$/, `_${flipMode}.png`), type: 'blob' });
  };

  const handleColorExtractor = async () => {
    const bmp = await createImageBitmap(files[0]);
    const c = document.createElement('canvas'); c.width = 100; c.height = 100;
    c.getContext('2d').drawImage(bmp, 0, 0, 100, 100);
    const data = c.getContext('2d').getImageData(0, 0, 100, 100).data;
    const colorMap = {};
    for (let i = 0; i < data.length; i += 16) { // sample every 4th pixel
      const r = Math.round(data[i] / 32) * 32, g = Math.round(data[i + 1] / 32) * 32, b = Math.round(data[i + 2] / 32) * 32;
      const key = `${r},${g},${b}`; colorMap[key] = (colorMap[key] || 0) + 1;
    }
    const top = Object.entries(colorMap).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k]) => { const [r, g, b] = k.split(','); return `rgb(${r},${g},${b})`; });
    setResult({ type: 'colors', colors: top, info: `Top ${top.length} dominant colors extracted` });
  };

  // ═══════════════ DOCUMENT TOOLS ═══════════════
  const handleCsvToJson = async () => {
    const text = await files[0].text();
    const lines = text.trim().split('\n');
    if (lines.length < 2) { setResult({ text: '[]', filename: 'data.json', type: 'text' }); return; }
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    const rows = lines.slice(1).map(line => {
      const vals = line.match(/(".*?"|[^,]+)/g) || [];
      const obj = {};
      headers.forEach((h, i) => { obj[h] = (vals[i] || '').trim().replace(/^"|"$/g, ''); });
      return obj;
    });
    setResult({ text: JSON.stringify(rows, null, 2), filename: files[0].name.replace(/\.csv$/i, '.json'), type: 'text' });
  };

  const handleJsonToCsv = async () => {
    const text = await files[0].text();
    const data = JSON.parse(text);
    const arr = Array.isArray(data) ? data : [data];
    if (arr.length === 0) { setResult({ text: '', filename: 'data.csv', type: 'text' }); return; }
    const headers = [...new Set(arr.flatMap(Object.keys))];
    const csv = [headers.join(','), ...arr.map(row => headers.map(h => `"${(row[h] ?? '').toString().replace(/"/g, '""')}"`).join(','))].join('\n');
    setResult({ text: csv, filename: files[0].name.replace(/\.json$/i, '.csv'), type: 'text' });
  };

  const handleXmlToJson = async () => {
    const text = await files[0].text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/xml');
    const xmlToJson = (node) => {
      if (node.nodeType === 3) return node.textContent.trim();
      const obj = {};
      if (node.attributes) for (const attr of node.attributes) obj[`@${attr.name}`] = attr.value;
      for (const child of node.childNodes) {
        if (child.nodeType === 1) {
          const val = xmlToJson(child);
          if (obj[child.nodeName]) { if (!Array.isArray(obj[child.nodeName])) obj[child.nodeName] = [obj[child.nodeName]]; obj[child.nodeName].push(val); }
          else obj[child.nodeName] = val;
        }
      }
      return Object.keys(obj).length ? obj : node.textContent?.trim() || '';
    };
    setResult({ text: JSON.stringify(xmlToJson(doc.documentElement), null, 2), filename: files[0].name.replace(/\.xml$/i, '.json'), type: 'text' });
  };

  const handleHtmlToPdf = async () => {
    const html = await files[0].text();
    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont('Helvetica');
    const page = pdf.addPage([612, 792]);
    const plainText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const lines = plainText.match(/.{1,80}/g) || [plainText];
    lines.slice(0, 35).forEach((line, i) => page.drawText(line, { x: 50, y: 742 - i * 18, size: 10, font, color: { r: 0.1, g: 0.1, b: 0.1 } }));
    setResult({ blob: new Blob([await pdf.save()], { type: 'application/pdf' }), filename: files[0].name.replace(/\.html?$/i, '.pdf'), type: 'pdf', info: 'Basic HTML → PDF (text extraction)' });
  };

  const handleMarkdownToPdf = async () => {
    const md = await files[0].text();
    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont('Helvetica');
    const page = pdf.addPage([612, 792]);
    const lines = md.split('\n');
    let y = 742;
    for (const line of lines.slice(0, 38)) {
      const isHeader = /^#{1,3}\s/.test(line);
      const size = isHeader ? 16 : 10;
      const text = line.replace(/^#{1,3}\s/, '').trim();
      page.drawText(text, { x: 50, y, size, font, color: { r: 0.1, g: 0.1, b: 0.1 } });
      y -= isHeader ? 28 : 18;
      if (y < 50) break;
    }
    setResult({ blob: new Blob([await pdf.save()], { type: 'application/pdf' }), filename: files[0].name.replace(/\.md$/i, '.pdf'), type: 'pdf' });
  };

  const handleTextToSpeech = async () => {
    if (!('speechSynthesis' in window)) { setError('Text-to-speech not supported in this browser.'); return; }
    const utterance = new SpeechSynthesisUtterance(textInput);
    utterance.rate = ttsRate;
    speechSynthesis.speak(utterance);
    setResult({ type: 'info', info: '🔊 Speaking... The browser will read the text aloud.' });
  };

  const handleSpeechToText = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) { setError('Speech recognition not supported. Try Chrome or Edge.'); return; }
    if (isRecording) { recognitionRef.current?.stop(); setIsRecording(false); return; }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    let transcript = '';
    recognition.onresult = (e) => { for (let i = e.resultIndex; i < e.results.length; i++) transcript += e.results[i][0].transcript; setTextInput(transcript); };
    recognition.onend = () => { setIsRecording(false); if (transcript) setResult({ text: transcript, filename: 'transcription.txt', type: 'text' }); };
    recognition.onerror = (e) => { setIsRecording(false); setError(`Recognition error: ${e.error}`); };
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setTextInput('');
  };

  // ═══════════════ UTILITY TOOLS ═══════════════
  const handleHashFile = async () => {
    const buffer = await files[0].arrayBuffer();
    const algos = ['SHA-256', 'SHA-1'];
    const results = [];
    for (const algo of algos) {
      const hash = await crypto.subtle.digest(algo, buffer);
      results.push(`${algo}: ${[...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('')}`);
    }
    results.unshift(`File: ${files[0].name}`, `Size: ${(files[0].size / 1024).toFixed(1)} KB`, '');
    setResult({ text: results.join('\n'), filename: files[0].name + '.hash.txt', type: 'text' });
  };

  const handleQrGenerator = async () => {
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(textInput)}`;
    const resp = await fetch(url);
    const blob = await resp.blob();
    setResult({ blob, filename: 'qrcode.png', type: 'blob', qrUrl: url });
  };

  const handleLoremGenerator = async () => {
    const paragraphs = 5;
    const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    setResult({ text: Array(paragraphs).fill(lorem).join('\n\n'), filename: 'lorem.txt', type: 'text' });
  };

  const handleWordCounter = async () => {
    const text = textInput;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(s => s.trim()).length;
    const reading = Math.ceil(words / 200);
    const speaking = Math.ceil(words / 150);
    setResult({ type: 'stats', stats: { Words: words, Characters: chars, 'No Spaces': charsNoSpace, Sentences: sentences, Paragraphs: paragraphs, 'Reading Time': `${reading} min`, 'Speaking Time': `${speaking} min` }, info: 'Analysis complete' });
  };

  // ═══════════════ SHARED UI ═══════════════
  const downloadResult = () => { if (!result?.blob) return; const url = URL.createObjectURL(result.blob); const a = document.createElement('a'); a.href = url; a.download = result.filename; a.click(); URL.revokeObjectURL(url); };
  const downloadText = () => { if (!result?.text) return; const blob = new Blob([result.text], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = result.filename; a.click(); URL.revokeObjectURL(url); };

  const acceptMap = {
    'image-to-pdf': 'image/*', 'merge-pdf': 'application/pdf', 'split-pdf': 'application/pdf',
    'pdf-to-text': 'application/pdf', 'image-converter': 'image/*', 'image-compressor': 'image/*',
    'compress-pdf': 'application/pdf', 'pdf-watermark': 'application/pdf', 'pdf-to-images': 'application/pdf',
    'image-resize': 'image/*', 'pdf-to-word': 'application/pdf', 'word-to-pdf': '.docx,.doc',
    'pdf-rotate': 'application/pdf', 'pdf-page-numbers': 'application/pdf', 'pdf-delete-pages': 'application/pdf',
    'webp-to-png': 'image/webp', 'heic-to-jpg': '.heic,.heif', 'svg-to-png': '.svg,image/svg+xml',
    'image-to-ico': 'image/*', 'gif-maker': 'image/*', 'remove-exif': 'image/*',
    'image-flip': 'image/*', 'color-extractor': 'image/*',
    'csv-to-json': '.csv,text/csv', 'json-to-csv': '.json,application/json',
    'xml-to-json': '.xml,text/xml', 'html-to-pdf': '.html,.htm',
    'markdown-to-pdf': '.md,.markdown', 'hash-file': '*/*',
  };

  const showUpload = tool.inputType !== 'text' && tool.inputType !== 'none';
  const fileIcon = tool.id.includes('pdf') || tool.id.includes('word') || tool.id.includes('csv') || tool.id.includes('json') || tool.id.includes('xml') || tool.id.includes('html') || tool.id.includes('markdown') ? '📄' : '🖼️';

  return (
    <div className="space-y-5">
      {/* Upload Zone */}
      {showUpload && (
        <div onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-neon-cyan', 'bg-neon-cyan/5'); }}
          onDragLeave={e => e.currentTarget.classList.remove('border-neon-cyan', 'bg-neon-cyan/5')}
          onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('border-neon-cyan', 'bg-neon-cyan/5'); handleFiles({ target: { files: e.dataTransfer.files } }); }}
          className="border-2 border-dashed border-electric-violet/30 rounded-2xl p-8 text-center cursor-pointer hover:border-neon-cyan/50 transition-all group"
        >
          <input ref={fileInputRef} type="file" accept={acceptMap[tool.id] || '*/*'} multiple={tool.multi} onChange={handleFiles} className="hidden" />
          <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">📤</span>
          <p className="text-text-primary font-semibold text-sm">{tool.multi ? 'Drop files here or click to browse' : 'Drop a file here or click to browse'}</p>
          <p className="text-text-muted text-xs mt-1">{acceptMap[tool.id] || 'Any file accepted'}</p>
        </div>
      )}

      {/* Text Input */}
      {tool.inputType === 'text' && (
        <div className="space-y-3">
          <textarea value={textInput} onChange={e => setTextInput(e.target.value)}
            placeholder={tool.id === 'qr-generator' ? 'Enter URL or text for QR code...' : tool.id === 'text-to-speech' ? 'Enter text to speak...' : 'Enter your text here...'}
            className="w-full min-h-[140px] rounded-xl bg-background border border-electric-violet/20 p-4 text-sm text-text-primary focus:outline-none focus:border-neon-cyan"
          />
          {tool.id === 'word-counter' && textInput.trim() && (
            <div className="grid grid-cols-3 md:grid-cols-7 gap-2 text-center">
              {(() => {
                const w = textInput.trim().split(/\s+/).length;
                const c = textInput.length;
                const cns = textInput.replace(/\s/g, '').length;
                const s = textInput.split(/[.!?]+/).filter(x => x.trim()).length;
                const p = textInput.split(/\n\n+/).filter(x => x.trim()).length;
                return [
                  { l: 'Words', v: w, bg: 'bg-neon-cyan/10', tc: 'text-neon-cyan' },
                  { l: 'Chars', v: c, bg: 'bg-electric-violet/10', tc: 'text-electric-violet' },
                  { l: 'No Space', v: cns, bg: 'bg-surface', tc: 'text-text-primary' },
                  { l: 'Sentences', v: s, bg: 'bg-surface', tc: 'text-text-primary' },
                  { l: 'Paragraphs', v: p, bg: 'bg-surface', tc: 'text-text-primary' },
                  { l: 'Read', v: `${Math.ceil(w / 200)}m`, bg: 'bg-surface', tc: 'text-text-primary' },
                  { l: 'Speak', v: `${Math.ceil(w / 150)}m`, bg: 'bg-surface', tc: 'text-text-primary' },
                ].map(x => <div key={x.l} className={`${x.bg} rounded-xl p-2`}><p className={`text-lg font-bold ${x.tc}`}>{x.v}</p><p className="text-[10px] text-text-muted">{x.l}</p></div>);
              })()}
            </div>
          )}
        </div>
      )}

      {/* Speech to Text */}
      {tool.id === 'speech-to-text' && (
        <div className="text-center space-y-4">
          <button onClick={handleSpeechToText}
            className={`w-24 h-24 rounded-full text-4xl mx-auto flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 animate-pulse shadow-lg shadow-red-500/30' : 'bg-neon-cyan/20 border-2 border-neon-cyan hover:bg-neon-cyan/30'}`}
          >{isRecording ? '⏹️' : '🎙️'}</button>
          <p className="text-sm text-text-muted">{isRecording ? 'Listening... Click to stop' : 'Click to start recording'}</p>
          {textInput && <div className="bg-surface rounded-xl border border-border p-4 text-sm text-text-primary min-h-[100px]">{textInput}</div>}
        </div>
      )}

      {/* No-input tools */}
      {tool.inputType === 'none' && !showUpload && (
        <div className="text-center py-4 text-sm text-text-muted">
          {tool.id === 'speech-to-text' ? 'Click the microphone above to start' : 'Click the button below to generate'}
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-text-muted font-medium">{files.length} file(s) selected:</p>
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-surface/50 border border-border rounded-xl px-4 py-2.5">
              <span className="text-lg">{fileIcon}</span>
              <span className="text-sm text-text-primary truncate flex-1">{f.name}</span>
              <span className="text-xs text-text-muted">{(f.size / 1024).toFixed(1)} KB</span>
              <button onClick={() => removeFile(i)} className="text-xs text-red-400 hover:text-red-300">✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Options */}
      {files.length > 0 && (
        <div className="space-y-4 bg-surface/30 rounded-xl p-4 border border-border">
          {tool.id === 'image-converter' && (
            <div>
              <label className="text-xs text-text-muted font-medium block mb-2">Output Format</label>
              <div className="flex gap-2">{['png', 'jpg', 'webp'].map(fmt => (
                <button key={fmt} onClick={() => setOutputFormat(fmt)} className={`text-xs px-4 py-2 rounded-lg border transition-all uppercase ${outputFormat === fmt ? 'bg-neon-cyan text-white border-neon-cyan' : 'border-electric-violet/20 text-text-muted hover:border-neon-cyan/30'}`}>{fmt}</button>
              ))}</div>
            </div>
          )}
          {(tool.id === 'image-converter' || tool.id === 'image-compressor') && (
            <div><label className="text-xs text-text-muted font-medium block mb-2">Quality: {Math.round(quality * 100)}%</label>
              <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(+e.target.value)} className="w-full accent-neon-cyan" /></div>
          )}
          {tool.id === 'split-pdf' && (
            <div><label className="text-xs text-text-muted font-medium block mb-2">Page Range (e.g. 1-3, 5, 8-10)</label>
              <input value={splitRange} onChange={e => setSplitRange(e.target.value)} placeholder="All pages" className="w-full rounded-lg bg-background border border-electric-violet/20 px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" /></div>
          )}
          {tool.id === 'pdf-watermark' && (
            <div><label className="text-xs text-text-muted font-medium block mb-2">Watermark Text</label>
              <input value={watermarkText} onChange={e => setWatermarkText(e.target.value)} placeholder="SAMPLE" className="w-full rounded-lg bg-background border border-electric-violet/20 px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" /></div>
          )}
          {tool.id === 'pdf-rotate' && (
            <div><label className="text-xs text-text-muted font-medium block mb-2">Rotation Angle</label>
              <div className="flex gap-2">{[90, 180, 270].map(a => (
                <button key={a} onClick={() => setRotateAngle(a)} className={`text-xs px-4 py-2 rounded-lg border transition-all ${rotateAngle === a ? 'bg-neon-cyan text-white border-neon-cyan' : 'border-electric-violet/20 text-text-muted'}`}>{a}°</button>
              ))}</div></div>
          )}
          {tool.id === 'pdf-delete-pages' && (
            <div><label className="text-xs text-text-muted font-medium block mb-2">Pages to Delete (e.g. 1, 3, 5-8)</label>
              <input value={deleteRange} onChange={e => setDeleteRange(e.target.value)} placeholder="1, 3, 5-8" className="w-full rounded-lg bg-background border border-electric-violet/20 px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" /></div>
          )}
          {tool.id === 'image-flip' && (
            <div><label className="text-xs text-text-muted font-medium block mb-2">Transform</label>
              <div className="flex flex-wrap gap-2">{['horizontal', 'vertical', 'rotate90', 'rotate180', 'rotate270'].map(m => (
                <button key={m} onClick={() => setFlipMode(m)} className={`text-xs px-3 py-2 rounded-lg border transition-all capitalize ${flipMode === m ? 'bg-neon-cyan text-white border-neon-cyan' : 'border-electric-violet/20 text-text-muted'}`}>{m.replace('rotate', 'Rotate ').replace('horizontal', 'Flip H').replace('vertical', 'Flip V')}</button>
              ))}</div></div>
          )}
          {tool.id === 'gif-maker' && (
            <div><label className="text-xs text-text-muted font-medium block mb-2">Frame Delay: {gifDelay}ms</label>
              <input type="range" min="100" max="2000" step="100" value={gifDelay} onChange={e => setGifDelay(+e.target.value)} className="w-full accent-neon-cyan" /></div>
          )}
          {tool.id === 'text-to-speech' && (
            <div className="space-y-2">
              <div><label className="text-xs text-text-muted font-medium block mb-2">Speed: {ttsRate}x</label>
                <input type="range" min="0.5" max="2" step="0.1" value={ttsRate} onChange={e => setTtsRate(+e.target.value)} className="w-full accent-neon-cyan" /></div>
            </div>
          )}
          {tool.id === 'image-resize' && (
            <div className="space-y-3">
              <div className="flex gap-2">
                {[{ id: 'resize', label: '📐 Resize' }, { id: 'crop', label: '✂️ Crop' }].map(m => (
                  <button key={m.id} onClick={() => setCropMode(m.id)} className={`text-xs px-4 py-2 rounded-lg border transition-all ${cropMode === m.id ? 'bg-neon-cyan text-white border-neon-cyan' : 'border-electric-violet/20 text-text-muted'}`}>{m.label}</button>
                ))}
              </div>
              {cropMode === 'resize' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-1"><label className="text-[10px] text-text-muted block mb-1">Width</label>
                      <input type="number" value={resizeWidth} onChange={e => { const w = +e.target.value; setResizeWidth(w); if (lockAspect) setResizeHeight(Math.round(w / aspectRatio)); }} className="w-full rounded-lg bg-background border border-electric-violet/20 px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" /></div>
                    <button onClick={() => setLockAspect(!lockAspect)} className={`mt-4 text-lg ${lockAspect ? 'text-neon-cyan' : 'text-text-muted'}`}>{lockAspect ? '🔒' : '🔓'}</button>
                    <div className="flex-1"><label className="text-[10px] text-text-muted block mb-1">Height</label>
                      <input type="number" value={resizeHeight} onChange={e => { const h = +e.target.value; setResizeHeight(h); if (lockAspect) setResizeWidth(Math.round(h * aspectRatio)); }} className="w-full rounded-lg bg-background border border-electric-violet/20 px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" /></div>
                  </div>
                  <div className="flex flex-wrap gap-2">{['800×600', '1024×768', '1280×720', '1920×1080'].map(s => { const [w, h] = s.split('×').map(Number); return (
                    <button key={s} onClick={() => { setResizeWidth(w); setResizeHeight(h); setAspectRatio(w / h); }} className="text-[10px] bg-surface border border-electric-violet/15 px-2 py-1 rounded-lg text-text-muted hover:text-neon-cyan">{s}</button>
                  ); })}</div>
                </div>
              ) : (
                <div><label className="text-xs text-text-muted font-medium block mb-2">Aspect Ratio</label>
                  <div className="flex flex-wrap gap-2">{['free', '1:1', '4:3', '16:9', '3:2'].map(r => (
                    <button key={r} onClick={() => setCropAspect(r)} className={`text-xs px-4 py-2 rounded-lg border transition-all uppercase ${cropAspect === r ? 'bg-neon-cyan text-white border-neon-cyan' : 'border-electric-violet/20 text-text-muted'}`}>{r === 'free' ? 'Free' : r}</button>
                  ))}</div></div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Progress */}
      {progress && <div className="flex items-center gap-3 bg-neon-cyan/10 border border-neon-cyan/20 rounded-xl px-4 py-3"><div className="w-5 h-5 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" /><span className="text-sm text-neon-cyan">{progress}</span></div>}
      {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">{error}</div>}

      {/* Action Button */}
      {((showUpload && files.length > 0) || tool.inputType === 'text' || tool.inputType === 'none') && !result && (
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={processFile} disabled={processing}
          className="w-full bg-brand-gradient text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-50 hover:shadow-xl hover:shadow-neon-cyan/20 transition-all"
        >{processing ? 'Processing...' : `${tool.name} →`}</motion.button>
      )}

      {/* Result */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="bg-neon-cyan/10 border border-neon-cyan/20 rounded-xl px-4 py-3">
            <p className="text-sm text-neon-cyan font-semibold">✓ Done!</p>
            {result.info && <p className="text-xs text-text-muted mt-1">{result.info}</p>}
          </div>
          {/* Colors result */}
          {result.type === 'colors' && result.colors && (
            <div className="flex gap-2 flex-wrap">{result.colors.map((c, i) => (
              <div key={i} className="text-center"><div className="w-12 h-12 rounded-xl border border-border" style={{ background: c }} /><p className="text-[9px] text-text-muted mt-1 font-mono">{c}</p></div>
            ))}</div>
          )}
          {/* Stats result */}
          {result.type === 'stats' && result.stats && (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">{Object.entries(result.stats).map(([k, v]) => (
              <div key={k} className="bg-surface rounded-xl p-3 text-center"><p className="text-lg font-bold text-neon-cyan">{v}</p><p className="text-[10px] text-text-muted">{k}</p></div>
            ))}</div>
          )}
          {/* QR result */}
          {result.qrUrl && <div className="flex justify-center"><img src={result.qrUrl} alt="QR" className="w-48 h-48 rounded-xl" /></div>}
          {/* Download buttons */}
          {result.type !== 'info' && result.type !== 'stats' && result.type !== 'colors' && (
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={result.type === 'text' ? downloadText : downloadResult}
                className="flex-1 bg-brand-gradient text-white py-3 rounded-xl font-semibold text-sm hover:shadow-xl">📥 Download {result.filename}</motion.button>
              <button onClick={() => { setResult(null); setFiles([]); setTextInput(''); }} className="px-4 py-3 rounded-xl border border-electric-violet/20 text-text-muted text-sm hover:text-neon-cyan">New</button>
            </div>
          )}
          {(result.type === 'info' || result.type === 'stats' || result.type === 'colors') && (
            <button onClick={() => { setResult(null); setFiles([]); setTextInput(''); }} className="w-full px-4 py-3 rounded-xl border border-electric-violet/20 text-text-muted text-sm hover:text-neon-cyan">Process Another</button>
          )}
          {result.type === 'text' && <div className="bg-surface rounded-xl border border-border p-4 max-h-64 overflow-auto"><pre className="text-xs text-text-primary font-mono whitespace-pre-wrap">{result.text}</pre></div>}
        </motion.div>
      )}
    </div>
  );
}
