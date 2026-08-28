// Free Tools Registry — 10015.io style, 100% client-side free tools
// Categories: Text, Code, JSON, Image, Converters, Generators, SEO, Dev

const toolsRegistry = [
  // Text
  { slug: 'word-counter', name: 'Word Counter', category: 'Text', icon: '📝', desc: 'Count words, chars, sentences & reading time', free: true },
  { slug: 'case-converter', name: 'Case Converter', category: 'Text', icon: '🔤', desc: 'UPPER, lower, Title, camel & snake case', free: true },
  { slug: 'text-diff', name: 'Text Diff Checker', category: 'Text', icon: '🔍', desc: 'Compare two texts side-by-side', free: true },
  { slug: 'lorem-generator', name: 'Lorem Ipsum Generator', category: 'Text', icon: '📄', desc: 'Generate placeholder text', free: true },
  { slug: 'remove-duplicates', name: 'Remove Duplicate Lines', category: 'Text', icon: '🧹', desc: 'Deduplicate lines, sort & trim', free: true },
  { slug: 'slugify', name: 'Slug Generator', category: 'Text', icon: '🔗', desc: 'Title → URL-friendly slug', free: true },

  // Code / JSON
  { slug: 'json-formatter', name: 'JSON Formatter', category: 'Code', icon: '🧩', desc: 'Format, minify & validate JSON', free: true },
  { slug: 'json-to-csv', name: 'JSON to CSV', category: 'Code', icon: '📊', desc: 'Convert JSON array to CSV', free: true },
  { slug: 'base64', name: 'Base64 Encode/Decode', category: 'Code', icon: '🔐', desc: 'Encode & decode Base64', free: true },
  { slug: 'url-encoder', name: 'URL Encoder/Decoder', category: 'Code', icon: '🌐', desc: 'Encode & decode URLs', free: true },
  { slug: 'html-encoder', name: 'HTML Encoder', category: 'Code', icon: '📦', desc: 'Escape & unescape HTML', free: true },
  { slug: 'css-minifier', name: 'CSS Minifier', category: 'Code', icon: '🎨', desc: 'Minify CSS with one click', free: true },
  { slug: 'js-minifier', name: 'JS Minifier', category: 'Code', icon: '⚡', desc: 'Minify JavaScript', free: true },
  { slug: 'regex-tester', name: 'Regex Tester', category: 'Code', icon: '🧪', desc: 'Test RegExp live with matches', free: true },
  { slug: 'markdown-preview', name: 'Markdown Preview', category: 'Code', icon: '📝', desc: 'Live Markdown → HTML preview', free: true },

  // Image
  { slug: 'qr-generator', name: 'QR Code Generator', category: 'Image', icon: '🔲', desc: 'Text/URL → QR code (download PNG)', free: true },
  { slug: 'image-compressor', name: 'Image Compressor', category: 'Image', icon: '🖼️', desc: 'Compress JPEG/PNG in browser', free: true },
  { slug: 'color-picker', name: 'Color Picker & Converter', category: 'Image', icon: '🎨', desc: 'HEX ↔ RGB ↔ HSL converter', free: true },
  { slug: 'image-to-base64', name: 'Image to Base64', category: 'Image', icon: '🖼️', desc: 'Convert image → Base64 string', free: true },

  // Converters
  { slug: 'unit-converter', name: 'Unit Converter', category: 'Converters', icon: '📏', desc: 'Length, weight, temperature', free: true },
  { slug: 'timestamp-converter', name: 'Timestamp Converter', category: 'Converters', icon: '⏰', desc: 'Unix ↔ Date converter', free: true },
  { slug: 'number-base', name: 'Number Base Converter', category: 'Converters', icon: '🔢', desc: 'Dec ↔ Hex ↔ Bin ↔ Oct', free: true },
  { slug: 'percentage-calculator', name: 'Percentage Calculator', category: 'Converters', icon: '%', desc: 'Quick percent calculations', free: true },

  // Generators
  { slug: 'uuid-generator', name: 'UUID Generator', category: 'Generators', icon: '🆔', desc: 'Generate v4 UUIDs in bulk', free: true },
  { slug: 'password-generator', name: 'Password Generator', category: 'Generators', icon: '🔑', desc: 'Secure random passwords', free: true },
  { slug: 'hash-generator', name: 'Hash Generator', category: 'Generators', icon: '#️⃣', desc: 'MD5, SHA1, SHA256 (SHA via SubtleCrypto)', free: true },
  { slug: 'random-number', name: 'Random Number', category: 'Generators', icon: '🎲', desc: 'Random integer in range', free: true },

  // SEO
  { slug: 'meta-generator', name: 'Meta Tag Generator', category: 'SEO', icon: '🏷️', desc: 'Generate SEO meta tags', free: true },
  { slug: 'og-generator', name: 'Open Graph Generator', category: 'SEO', icon: '🔗', desc: 'Generate OG & Twitter cards', free: true },
  { slug: 'robots-generator', name: 'Robots.txt Generator', category: 'SEO', icon: '🤖', desc: 'Build robots.txt visually', free: true },
  { slug: 'sitemap-generator', name: 'Sitemap XML Generator', category: 'SEO', icon: '🗺️', desc: 'Generate sitemap.xml', free: true },
  { slug: 'keyword-density', name: 'Keyword Density', category: 'SEO', icon: '📈', desc: 'Analyze keyword frequency', free: true },

  // Dev / Util
  { slug: 'http-status', name: 'HTTP Status Lookup', category: 'Dev', icon: '🌐', desc: 'Lookup HTTP codes', free: true },
  { slug: 'jwt-decoder', name: 'JWT Decoder', category: 'Dev', icon: '🎫', desc: 'Decode JWT header & payload', free: true },
  { slug: 'cron-parser', name: 'Cron Expression Helper', category: 'Dev', icon: '⏱️', desc: 'Explain cron expressions', free: true },
  { slug: 'age-calculator', name: 'Age Calculator', category: 'Util', icon: '🎂', desc: 'Exact age from birthdate', free: true },
  { slug: 'bmi-calculator', name: 'BMI Calculator', category: 'Util', icon: '⚖️', desc: 'Calculate Body Mass Index', free: true },
  { slug: 'emi-calculator', name: 'EMI Calculator', category: 'Util', icon: '💰', desc: 'Loan EMI with chart', free: true },
];

export const categories = [...new Set(toolsRegistry.map(t => t.category))];
export const categoryIcons = {
  Text: '📝', Code: '💻', Image: '🖼️', Converters: '🔄', Generators: '⚡', SEO: '🔍', Dev: '🛠️', Util: '🧮',
};

export default toolsRegistry;
