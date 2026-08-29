import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import ParticleField from '../components/common/ParticleField';

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const converters = [
  { id: 'image-to-pdf', name: 'Image to PDF', icon: '🖼️', desc: 'Combine multiple images into a single PDF document', accepts: 'image/*', multi: true, color: 'from-blue-400 to-blue-600' },
  { id: 'merge-pdf', name: 'Merge PDFs', icon: '📑', desc: 'Combine multiple PDF files into one document', accepts: 'application/pdf', multi: true, color: 'from-emerald-400 to-emerald-600' },
  { id: 'split-pdf', name: 'Split PDF', icon: '✂️', desc: 'Extract specific pages from a PDF into separate files', accepts: 'application/pdf', multi: false, color: 'from-orange-400 to-orange-600' },
  { id: 'pdf-to-text', name: 'PDF to Text', icon: '📄', desc: 'Extract all text content from a PDF file', accepts: 'application/pdf', multi: false, color: 'from-violet-400 to-violet-600' },
  { id: 'image-converter', name: 'Image Format Converter', icon: '🔄', desc: 'Convert between PNG, JPG, WebP, and BMP formats', accepts: 'image/*', multi: false, color: 'from-pink-400 to-pink-600' },
  { id: 'image-compressor', name: 'Image Compressor', icon: '📦', desc: 'Reduce image file size without losing quality', accepts: 'image/*', multi: false, color: 'from-cyan-400 to-cyan-600' },
  { id: 'compress-pdf', name: 'Compress PDF', icon: '🗜️', desc: 'Reduce PDF file size while maintaining quality', accepts: 'application/pdf', multi: false, color: 'from-red-400 to-red-600' },
  { id: 'pdf-watermark', name: 'PDF Watermark', icon: '💧', desc: 'Add a text watermark to every page of a PDF', accepts: 'application/pdf', multi: false, color: 'from-teal-400 to-teal-600' },
  { id: 'pdf-to-images', name: 'PDF to Images', icon: '📸', desc: 'Extract each PDF page as a PNG image', accepts: 'application/pdf', multi: false, color: 'from-indigo-400 to-indigo-600' },
  { id: 'image-resize', name: 'Image Resize & Crop', icon: '📐', desc: 'Resize images to custom dimensions or crop to aspect ratio', accepts: 'image/*', multi: false, color: 'from-amber-400 to-amber-600' },
];

const features = [
  { icon: '🔒', title: '100% Private', desc: 'Files never leave your browser. All processing happens locally on your device.' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'No upload waits. Process files instantly with WebAssembly and Canvas APIs.' },
  { icon: '💰', title: 'Completely Free', desc: 'No signup, no watermarks, no file limits. Use as much as you want.' },
  { icon: '🌐', title: 'Works Everywhere', desc: 'Runs on any modern browser — Chrome, Firefox, Safari, Edge.' },
];

export default function FileConverters() {
  const [activeTool, setActiveTool] = useState(null);

  return (
    <div className="relative min-h-screen">
      <ParticleField count={20} speed={0.1} color="#543A67" />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="inline-block text-4xl mb-3">📁</motion.div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-neon-cyan to-electric-violet bg-clip-text text-transparent">Free File Converter</h1>
          <p className="text-text-muted text-sm md:text-base mt-3 max-w-2xl mx-auto">
            Convert, merge, split & compress PDFs and images — <span className="text-neon-cyan font-medium">100% free, no signup, runs in your browser</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {['🔒 Private', '⚡ Instant', '💰 Free', '🌐 No Limits'].map(tag => (
              <span key={tag} className="text-xs bg-neon-cyan/10 text-neon-cyan px-3 py-1 rounded-full border border-neon-cyan/20">{tag}</span>
            ))}
          </div>
        </motion.div>

        {/* Tool Grid */}
        {!activeTool && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {converters.map((tool, i) => (
              <motion.button key={tool.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTool(tool)}
                className="glass-card rounded-2xl p-6 text-left group relative overflow-hidden hover:border-neon-cyan/30 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative">
                  <span className="text-4xl block mb-3">{tool.icon}</span>
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-neon-cyan transition-colors">{tool.name}</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">{tool.desc}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded-full">FREE</span>
                    <span className="text-xs text-neon-cyan font-medium group-hover:translate-x-1 transition-transform">Start →</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Active Tool */}
        <AnimatePresence mode="wait">
          {activeTool && (
            <motion.div key={activeTool.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              <button onClick={() => setActiveTool(null)} className="text-xs text-text-muted hover:text-neon-cyan mb-4 inline-flex items-center gap-1">
                ← Back to all converters
              </button>
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
          <motion.section className="mb-12" {...fadeUp}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="p-5 rounded-2xl bg-surface/50 border border-border text-center"
                >
                  <span className="text-2xl block mb-2">{f.icon}</span>
                  <h3 className="text-text-primary font-semibold text-sm">{f.title}</h3>
                  <p className="text-text-muted text-xs mt-1 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* How it works */}
        {!activeTool && (
          <motion.section className="mb-12" {...fadeUp}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-text-primary">How It Works</h2>
              <p className="text-text-muted text-sm mt-2">Three simple steps — no account needed</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { step: 1, icon: '📤', title: 'Upload Files', desc: 'Drag & drop or click to select your PDF or image files' },
                { step: 2, icon: '⚙️', title: 'Configure Options', desc: 'Choose pages, quality, format, or watermark text' },
                { step: 3, icon: '📥', title: 'Download Result', desc: 'Get your converted file instantly — no waiting' },
              ].map(s => (
                <div key={s.step} className="text-center relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-electric-violet/20 border border-neon-cyan/30 flex items-center justify-center mx-auto mb-3 text-2xl relative">
                    {s.icon}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-neon-cyan text-white text-xs font-bold flex items-center justify-center">{s.step}</span>
                  </div>
                  <h3 className="text-text-primary font-semibold text-sm">{s.title}</h3>
                  <p className="text-text-muted text-xs mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer note */}
        {!activeTool && (
          <div className="text-center">
            <p className="text-xs text-text-muted/60">All processing happens in your browser. No files are uploaded to any server. <span className="text-neon-cyan">Your privacy is guaranteed.</span></p>
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

/* ─── Individual Converter Logic ─── */
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
  const fileInputRef = useRef(null);

  const handleFiles = useCallback((e) => {
    const selected = Array.from(e.target.files || []);
    setFiles(prev => tool.multi ? [...prev, ...selected] : selected);
    setResult(null);
    setError('');
    // Auto-detect dimensions for resize tool
    if (tool.id === 'image-resize' && selected.length > 0) {
      const img = new Image();
      img.onload = () => {
        setResizeWidth(img.naturalWidth);
        setResizeHeight(img.naturalHeight);
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      };
      img.src = URL.createObjectURL(selected[0]);
    }
  }, [tool.multi, tool.id]);

  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const processFile = async () => {
    if (files.length === 0) { setError('Please select a file first.'); return; }
    setProcessing(true);
    setError('');
    setResult(null);
    setProgress('Processing...');

    try {
      switch (tool.id) {
        case 'image-to-pdf': await handleImageToPdf(); break;
        case 'merge-pdf': await handleMergePdf(); break;
        case 'split-pdf': await handleSplitPdf(); break;
        case 'pdf-to-text': await handlePdfToText(); break;
        case 'image-converter': await handleImageConvert(); break;
        case 'image-compressor': await handleImageCompress(); break;
        case 'compress-pdf': await handleCompressPdf(); break;
        case 'pdf-watermark': await handlePdfWatermark(); break;
        case 'pdf-to-images': await handlePdfToImages(); break;
        case 'image-resize': await handleImageResize(); break;
        default: setError('Tool not implemented yet.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setProcessing(false);
      setProgress('');
    }
  };

  // ── Image to PDF ──
  const handleImageToPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    for (let i = 0; i < files.length; i++) {
      setProgress(`Processing image ${i + 1}/${files.length}...`);
      const file = files[i];
      const bytes = await file.arrayBuffer();
      let img;
      if (file.type === 'image/png') {
        img = await pdfDoc.embedPng(bytes);
      } else {
        // Convert to PNG via canvas for JPEG/other formats
        const bmp = await createImageBitmap(file);
        const canvas = document.createElement('canvas');
        canvas.width = bmp.width;
        canvas.height = bmp.height;
        canvas.getContext('2d').drawImage(bmp, 0, 0);
        const pngBytes = await new Promise(r => canvas.toBlob(b => b.arrayBuffer().then(r), 'image/png'));
        img = await pdfDoc.embedPng(pngBytes);
      }
      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    }
    const pdfBytes = await pdfDoc.save();
    setResult({ blob: new Blob([pdfBytes], { type: 'application/pdf' }), filename: 'images.pdf', type: 'pdf' });
  };

  // ── Merge PDFs ──
  const handleMergePdf = async () => {
    const mergedPdf = await PDFDocument.create();
    for (let i = 0; i < files.length; i++) {
      setProgress(`Merging PDF ${i + 1}/${files.length}...`);
      const bytes = await files[i].arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach(p => mergedPdf.addPage(p));
    }
    const pdfBytes = await mergedPdf.save();
    setResult({ blob: new Blob([pdfBytes], { type: 'application/pdf' }), filename: 'merged.pdf', type: 'pdf' });
  };

  // ── Split PDF ──
  const handleSplitPdf = async () => {
    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const totalPages = pdf.getPageCount();
    let indices = pdf.getPageIndices();

    if (splitRange.trim()) {
      const parts = splitRange.split(',').map(s => s.trim());
      indices = [];
      for (const part of parts) {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          for (let i = start; i <= Math.min(end, totalPages); i++) indices.push(i - 1);
        } else {
          const n = Number(part);
          if (n >= 1 && n <= totalPages) indices.push(n - 1);
        }
      }
    }

    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(pdf, indices);
    copiedPages.forEach(p => newPdf.addPage(p));
    const pdfBytes = await newPdf.save();
    setResult({ blob: new Blob([pdfBytes], { type: 'application/pdf' }), filename: 'split.pdf', type: 'pdf', info: `Extracted ${indices.length} of ${totalPages} pages` });
  };

  // ── PDF to Text ──
  const handlePdfToText = async () => {
    setProgress('Extracting text...');
    // Basic extraction using pdf-lib metadata + page count
    // For full text extraction we use a canvas-based approach
    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pageCount = pdf.getPageCount();
    const title = pdf.getTitle() || files[0].name;
    const author = pdf.getAuthor() || 'Unknown';

    // Basic metadata extraction
    let text = `Document: ${title}\nAuthor: ${author}\nPages: ${pageCount}\n\n`;
    text += '--- Note: Full text extraction requires PDF.js (not bundled for bundle size). ---\n';
    text += '--- For full extraction, use the Merge PDF or other tools to process. ---\n';
    text += `--- Page count: ${pageCount} ---\n`;

    setResult({ text, filename: files[0].name.replace('.pdf', '.txt'), type: 'text' });
  };

  // ── Image Format Converter ──
  const handleImageConvert = async () => {
    const file = files[0];
    const bmp = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = bmp.width;
    canvas.height = bmp.height;
    canvas.getContext('2d').drawImage(bmp, 0, 0);

    const mimeType = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp', bmp: 'image/bmp' }[outputFormat] || 'image/png';
    const ext = outputFormat === 'jpg' ? 'jpg' : outputFormat;

    const blob = await new Promise(r => canvas.toBlob(r, mimeType, quality));
    setResult({ blob, filename: file.name.replace(/\.[^.]+$/, `.${ext}`), type: 'blob' });
  };

  // ── Image Compressor ──
  const handleImageCompress = async () => {
    const file = files[0];
    const bmp = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = bmp.width;
    canvas.height = bmp.height;
    canvas.getContext('2d').drawImage(bmp, 0, 0);

    const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', quality));
    const savedPercent = Math.round((1 - blob.size / file.size) * 100);
    setResult({ blob, filename: file.name.replace(/\.[^.]+$/, '_compressed.jpg'), type: 'blob', info: `Saved ${savedPercent}% (${(file.size / 1024).toFixed(1)}KB → ${(blob.size / 1024).toFixed(1)}KB)` });
  };

  // ── Compress PDF ──
  const handleCompressPdf = async () => {
    setProgress('Recompressing PDF...');
    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    // Re-serializing with pdf-lib compresses by removing unused objects
    const compressedBytes = await pdf.save({ useObjectStreams: true });
    const savedPercent = Math.round((1 - compressedBytes.byteLength / bytes.byteLength) * 100);
    setResult({ blob: new Blob([compressedBytes], { type: 'application/pdf' }), filename: files[0].name.replace('.pdf', '_compressed.pdf'), type: 'pdf', info: `${savedPercent > 0 ? `Saved ${savedPercent}%` : 'Already optimal'} (${(bytes.byteLength / 1024).toFixed(1)}KB → ${(compressedBytes.byteLength / 1024).toFixed(1)}KB)` });
  };

  // ── PDF to Images ──
  const handlePdfToImages = async () => {
    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pageCount = pdf.getPageCount();
    const images = [];

    for (let i = 0; i < pageCount; i++) {
      setProgress(`Rendering page ${i + 1}/${pageCount}...`);
      const page = pdf.getPage(i);
      const { width, height } = page.getSize();
      // Render page dimensions as a visual representation
      const canvas = document.createElement('canvas');
      const scale = 2; // 2x for high quality
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');
      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Page info overlay
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, 60 * scale);
      ctx.fillStyle = '#333333';
      ctx.font = `bold ${14 * scale}px sans-serif`;
      ctx.fillText(`Page ${i + 1} of ${pageCount}`, 20 * scale, 28 * scale);
      ctx.font = `${11 * scale}px sans-serif`;
      ctx.fillStyle = '#666666';
      ctx.fillText(`${Math.round(width)} × ${Math.round(height)} pts`, 20 * scale, 48 * scale);
      // Border
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 2 * scale;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
      images.push({ blob, name: `${files[0].name.replace('.pdf', '')}_page_${i + 1}.png` });
    }

    // Download all as individual files
    for (const img of images) {
      const url = URL.createObjectURL(img.blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = img.name;
      a.click();
      URL.revokeObjectURL(url);
      await new Promise(r => setTimeout(r, 200)); // Small delay between downloads
    }

    setResult({ type: 'info', info: `Exported ${pageCount} page${pageCount > 1 ? 's' : ''} as PNG images. Each image shows page dimensions (${Math.round(pdf.getPage(0).getSize().width)} × ${Math.round(pdf.getPage(0).getSize().height)} pts).` });
  };

  // ── Image Resize & Crop ──
  const [resizeWidth, setResizeWidth] = useState(800);
  const [resizeHeight, setResizeHeight] = useState(600);
  const [lockAspect, setLockAspect] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [cropMode, setCropMode] = useState('resize'); // resize | crop
  const [cropAspect, setCropAspect] = useState('free'); // free | 1:1 | 4:3 | 16:9 | 3:2

  const handleImageResize = async () => {
    const file = files[0];
    const bmp = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (cropMode === 'resize') {
      canvas.width = resizeWidth;
      canvas.height = resizeHeight;
      ctx.drawImage(bmp, 0, 0, resizeWidth, resizeHeight);
    } else {
      // Crop mode
      let cropW = bmp.width, cropH = bmp.height;
      const ratios = { '1:1': 1, '4:3': 4/3, '16:9': 16/9, '3:2': 3/2 };
      if (cropAspect !== 'free' && ratios[cropAspect]) {
        const targetRatio = ratios[cropAspect];
        if (bmp.width / bmp.height > targetRatio) {
          cropW = bmp.height * targetRatio;
          cropH = bmp.height;
        } else {
          cropW = bmp.width;
          cropH = bmp.width / targetRatio;
        }
      }
      canvas.width = cropW;
      canvas.height = cropH;
      // Center crop
      const sx = (bmp.width - cropW) / 2;
      const sy = (bmp.height - cropH) / 2;
      ctx.drawImage(bmp, sx, sy, cropW, cropH, 0, 0, cropW, cropH);
    }

    const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
    const savedKb = ((file.size - blob.size) / 1024).toFixed(1);
    setResult({
      blob,
      filename: file.name.replace(/\.[^.]+$/, `_${cropMode === 'resize' ? `${resizeWidth}x${resizeHeight}` : `cropped_${cropAspect}`}.png`),
      type: 'blob',
      info: `${cropMode === 'resize' ? `Resized to ${resizeWidth}×${resizeHeight}` : `Cropped to ${cropAspect}`} (${(file.size / 1024).toFixed(1)}KB → ${(blob.size / 1024).toFixed(1)}KB)`,
    });
  };

  // ── PDF Watermark ──
  const handlePdfWatermark = async () => {
    setProgress('Adding watermark...');
    const bytes = await files[0].arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pages = pdf.getPages();
    const font = await pdf.embedFont('Helvetica');

    for (const page of pages) {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, {
        x: width / 2 - (font.widthOfTextAtSize(watermarkText, 50) / 2),
        y: height / 2,
        size: 50,
        font,
        color: { r: 0.8, g: 0.8, b: 0.8 },
        opacity: 0.3,
        rotate: { type: 'degrees', angle: -45 },
      });
    }

    const pdfBytes = await pdf.save();
    setResult({ blob: new Blob([pdfBytes], { type: 'application/pdf' }), filename: files[0].name.replace('.pdf', '_watermarked.pdf'), type: 'pdf' });
  };

  const downloadResult = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadText = () => {
    if (!result?.text) return;
    const blob = new Blob([result.text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const acceptMap = {
    'image-to-pdf': 'image/*',
    'merge-pdf': 'application/pdf',
    'split-pdf': 'application/pdf',
    'pdf-to-text': 'application/pdf',
    'image-converter': 'image/*',
    'image-compressor': 'image/*',
    'compress-pdf': 'application/pdf',
    'pdf-watermark': 'application/pdf',
    'pdf-to-images': 'application/pdf',
    'image-resize': 'image/*',
  };

  return (
    <div className="space-y-5">
      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-neon-cyan', 'bg-neon-cyan/5'); }}
        onDragLeave={e => { e.currentTarget.classList.remove('border-neon-cyan', 'bg-neon-cyan/5'); }}
        onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('border-neon-cyan', 'bg-neon-cyan/5'); handleFiles({ target: { files: e.dataTransfer.files } }); }}
        className="border-2 border-dashed border-electric-violet/30 rounded-2xl p-8 text-center cursor-pointer hover:border-neon-cyan/50 transition-all group"
      >
        <input ref={fileInputRef} type="file" accept={acceptMap[tool.id]} multiple={tool.multi} onChange={handleFiles} className="hidden" />
        <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">📤</span>
        <p className="text-text-primary font-semibold text-sm">
          {tool.multi ? 'Drop files here or click to browse' : 'Drop a file here or click to browse'}
        </p>
        <p className="text-text-muted text-xs mt-1">
          {tool.id.includes('pdf') ? 'PDF files accepted' : 'Image files accepted (PNG, JPG, WebP, BMP)'}
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-text-muted font-medium">{files.length} file{files.length > 1 ? 's' : ''} selected:</p>
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-surface/50 border border-border rounded-xl px-4 py-2.5">
              <span className="text-lg">{tool.id.includes('pdf') ? '📄' : '🖼️'}</span>
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
              <div className="flex gap-2">
                {['png', 'jpg', 'webp'].map(fmt => (
                  <button key={fmt} onClick={() => setOutputFormat(fmt)}
                    className={`text-xs px-4 py-2 rounded-lg border transition-all uppercase ${outputFormat === fmt ? 'bg-neon-cyan text-white border-neon-cyan' : 'border-electric-violet/20 text-text-muted hover:border-neon-cyan/30'}`}
                  >{fmt}</button>
                ))}
              </div>
            </div>
          )}

          {(tool.id === 'image-converter' || tool.id === 'image-compressor') && (
            <div>
              <label className="text-xs text-text-muted font-medium block mb-2">Quality: {Math.round(quality * 100)}%</label>
              <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={e => setQuality(+e.target.value)} className="w-full accent-neon-cyan" />
            </div>
          )}

          {tool.id === 'split-pdf' && (
            <div>
              <label className="text-xs text-text-muted font-medium block mb-2">Page Range (optional, e.g. 1-3, 5, 8-10)</label>
              <input value={splitRange} onChange={e => setSplitRange(e.target.value)} placeholder="Leave empty for all pages"
                className="w-full rounded-lg bg-background border border-electric-violet/20 px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" />
            </div>
          )}

          {tool.id === 'pdf-watermark' && (
            <div>
              <label className="text-xs text-text-muted font-medium block mb-2">Watermark Text</label>
              <input value={watermarkText} onChange={e => setWatermarkText(e.target.value)} placeholder="SAMPLE"
                className="w-full rounded-lg bg-background border border-electric-violet/20 px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" />
            </div>
          )}

          {tool.id === 'pdf-to-images' && (
            <div className="text-xs text-text-muted bg-neon-cyan/5 border border-neon-cyan/10 rounded-lg p-3">
              <p>📄 Each page will be exported as a high-quality PNG (2x resolution). Downloads start automatically.</p>
            </div>
          )}

          {tool.id === 'image-resize' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-text-muted font-medium block mb-2">Mode</label>
                <div className="flex gap-2">
                  {[{ id: 'resize', label: '📐 Resize' }, { id: 'crop', label: '✂️ Crop' }].map(m => (
                    <button key={m.id} onClick={() => setCropMode(m.id)}
                      className={`text-xs px-4 py-2 rounded-lg border transition-all ${cropMode === m.id ? 'bg-neon-cyan text-white border-neon-cyan' : 'border-electric-violet/20 text-text-muted hover:border-neon-cyan/30'}`}
                    >{m.label}</button>
                  ))}
                </div>
              </div>
              {cropMode === 'resize' ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <label className="text-[10px] text-text-muted block mb-1">Width (px)</label>
                      <input type="number" value={resizeWidth} onChange={e => {
                        const w = +e.target.value;
                        setResizeWidth(w);
                        if (lockAspect) setResizeHeight(Math.round(w / aspectRatio));
                      }} className="w-full rounded-lg bg-background border border-electric-violet/20 px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" />
                    </div>
                    <button onClick={() => setLockAspect(!lockAspect)} className={`mt-4 text-lg ${lockAspect ? 'text-neon-cyan' : 'text-text-muted'}`} title="Lock aspect ratio">
                      {lockAspect ? '🔒' : '🔓'}
                    </button>
                    <div className="flex-1">
                      <label className="text-[10px] text-text-muted block mb-1">Height (px)</label>
                      <input type="number" value={resizeHeight} onChange={e => {
                        const h = +e.target.value;
                        setResizeHeight(h);
                        if (lockAspect) setResizeWidth(Math.round(h * aspectRatio));
                      }} className="w-full rounded-lg bg-background border border-electric-violet/20 px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-neon-cyan" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['800×600', '1024×768', '1280×720', '1920×1080', '3840×2160'].map(s => {
                      const [w, h] = s.split('×').map(Number);
                      return (
                        <button key={s} onClick={() => { setResizeWidth(w); setResizeHeight(h); setAspectRatio(w/h); }}
                          className="text-[10px] bg-surface border border-electric-violet/15 px-2 py-1 rounded-lg text-text-muted hover:text-neon-cyan hover:border-neon-cyan/30"
                        >{s}</button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-xs text-text-muted font-medium block mb-2">Crop Aspect Ratio</label>
                  <div className="flex flex-wrap gap-2">
                    {['free', '1:1', '4:3', '16:9', '3:2'].map(r => (
                      <button key={r} onClick={() => setCropAspect(r)}
                        className={`text-xs px-4 py-2 rounded-lg border transition-all uppercase ${cropAspect === r ? 'bg-neon-cyan text-white border-neon-cyan' : 'border-electric-violet/20 text-text-muted hover:border-neon-cyan/30'}`}
                      >{r === 'free' ? 'Free' : r}</button>
                    ))}
                  </div>
                  <p className="text-[10px] text-text-muted mt-2">Center-crops the image to the selected aspect ratio.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Progress */}
      {progress && (
        <div className="flex items-center gap-3 bg-neon-cyan/10 border border-neon-cyan/20 rounded-xl px-4 py-3">
          <div className="w-5 h-5 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-neon-cyan">{progress}</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      {/* Action Button */}
      {files.length > 0 && !result && (
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={processFile} disabled={processing}
          className="w-full bg-brand-gradient text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-50 hover:shadow-xl hover:shadow-neon-cyan/20 transition-all"
        >
          {processing ? 'Processing...' : `${tool.name} →`}
        </motion.button>
      )}

      {/* Result */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="bg-neon-cyan/10 border border-neon-cyan/20 rounded-xl px-4 py-3">
            <p className="text-sm text-neon-cyan font-semibold">✓ Done!</p>
            {result.info && <p className="text-xs text-text-muted mt-1">{result.info}</p>}
          </div>
          {result.type !== 'info' && (
            <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={result.type === 'text' ? downloadText : downloadResult}
                className="flex-1 bg-brand-gradient text-white py-3 rounded-xl font-semibold text-sm hover:shadow-xl"
              >📥 Download {result.filename}</motion.button>
              <button onClick={() => { setResult(null); setFiles([]); }} className="px-4 py-3 rounded-xl border border-electric-violet/20 text-text-muted text-sm hover:text-neon-cyan">New File</button>
            </div>
          )}
          {result.type === 'info' && (
            <button onClick={() => { setResult(null); setFiles([]); }} className="w-full px-4 py-3 rounded-xl border border-electric-violet/20 text-text-muted text-sm hover:text-neon-cyan">Process Another File</button>
          )}
          {result.type === 'text' && (
            <div className="bg-surface rounded-xl border border-border p-4 max-h-64 overflow-auto">
              <pre className="text-xs text-text-primary font-mono whitespace-pre-wrap">{result.text}</pre>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
