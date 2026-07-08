const ZEN_KEY = process.env.OPENCODE_ZEN_KEY || '';
const ZEN_BASE = 'https://opencode.ai/zen/v1';

const FALLBACK_MODEL = 'deepseek-v4-flash-free';

async function callModel(messages) {
  if (!ZEN_KEY) throw new Error('AI service not configured');
  const res = await fetch(`${ZEN_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ZEN_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: FALLBACK_MODEL, messages, stream: false }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || data.error || `HTTP ${res.status}`);
  }
  return data.choices?.[0]?.message?.content || '';
}

export const generateContent = async (req, res) => {
  try {
    const { topic, keywords, tone = 'professional', wordCount = 800, type = 'blog' } = req.body;
    if (!topic) return res.status(400).json({ message: 'Topic is required' });

    const messages = [
      { role: 'system', content: `You are an expert SEO content writer for Calcutta Node, an IT services and digital growth agency in Kolkata, India. Write ${type} content about "${topic}" in a ${tone} tone. Target ${wordCount} words. Include the following keywords naturally: ${keywords || topic}. Use headings, bullet points, and short paragraphs. Output in Markdown.` },
      { role: 'user', content: `Write an SEO-optimized ${type} about "${topic}" using keywords: ${keywords || topic}. Tone: ${tone}. Approx ${wordCount} words.` },
    ];

    const content = await callModel(messages);
    const lines = content.split('\n');
    const title = lines.find(l => l.startsWith('# '))?.replace('# ', '').trim() || topic;

    let metaDescription = '';
    const metaPrompt = [
      { role: 'system', content: 'Generate a compelling SEO meta description (max 160 chars) for the following content. Return ONLY the meta description text.' },
      { role: 'user', content: `Topic: ${topic}. Keywords: ${keywords || topic}. Content preview: ${content.slice(0, 300)}` },
    ];
    try { metaDescription = (await callModel(metaPrompt)).slice(0, 160); } catch {}

    res.json({ title, content, metaDescription, wordCount: content.split(' ').length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateMeta = async (req, res) => {
  try {
    const { pageTitle, description, keywords, type = 'page' } = req.body;
    if (!pageTitle) return res.status(400).json({ message: 'Page title is required' });

    const messages = [
      { role: 'system', content: `You are an SEO specialist for Calcutta Node. Generate optimized meta tags for a ${type} with title "${pageTitle}". Return valid JSON with: metaTitle, metaDescription (max 160 chars), metaKeywords (comma-separated), ogTitle, ogDescription, twitterTitle, twitterDescription.` },
      { role: 'user', content: `Generate SEO meta tags for: ${pageTitle}. Description: ${description || ''}. Keywords: ${keywords || ''}. Type: ${type}. Return JSON only.` },
    ];

    const result = await callModel(messages);
    let parsed;
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(result);
    } catch {
      parsed = {
        metaTitle: pageTitle,
        metaDescription: (description || '').slice(0, 160),
        metaKeywords: keywords || '',
        ogTitle: pageTitle,
        ogDescription: (description || '').slice(0, 160),
        twitterTitle: pageTitle,
        twitterDescription: (description || '').slice(0, 160),
      };
    }

    res.json(parsed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const keywordSuggest = async (req, res) => {
  try {
    const { topic, industry = 'IT services' } = req.body;
    if (!topic) return res.status(400).json({ message: 'Topic is required' });

    const messages = [
      { role: 'system', content: `You are an SEO keyword researcher for "${industry}" industry. Generate relevant keywords for the given topic. Return ONLY a JSON array of objects, each with: keyword (string), volume (low/medium/high), difficulty (low/medium/hard), and reason (string). Include 15-20 keywords.` },
      { role: 'user', content: `Research SEO keywords for topic: "${topic}" in ${industry} industry. Return JSON array.` },
    ];

    const result = await callModel(messages);
    let keywords;
    try {
      const jsonMatch = result.match(/\[[\s\S]*\]/);
      keywords = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(result);
    } catch {
      keywords = [{ keyword: topic, volume: 'medium', difficulty: 'medium', reason: 'Directly relevant to your business' }];
    }

    res.json({ topic, keywords, total: keywords.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const analyzeContent = async (req, res) => {
  try {
    const { content, targetKeyword } = req.body;
    if (!content) return res.status(400).json({ message: 'Content is required' });

    const messages = [
      { role: 'system', content: 'You are an SEO content analyzer. Analyze the given content and return a JSON object with: score (0-100), readability (string), wordCount (number), keywordDensity (object with keyword/count/density%), suggestions (array of strings), headingStructure (good/bad/needs-improvement), metaPreview (string). Return ONLY valid JSON.' },
      { role: 'user', content: `Analyze this content for SEO. Target keyword: "${targetKeyword || ''}".\n\nContent:\n${content.slice(0, 3000)}` },
    ];

    const result = await callModel(messages);
    let analysis;
    try {
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(result);
    } catch {
      analysis = {
        score: 70, readability: 'Good', wordCount: content.split(' ').length,
        keywordDensity: { keyword: targetKeyword || 'N/A', count: 0, density: '0%' },
        suggestions: ['Add more headings', 'Include target keyword in first paragraph', 'Add internal links'],
        headingStructure: 'needs-improvement',
        metaPreview: content.slice(0, 155) + '...',
      };
    }

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateSchema = async (req, res) => {
  try {
    const { type = 'Organization', name = 'Calcutta Node', data = {} } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const schemas = {
      Organization: {
        '@context': 'https://schema.org', '@type': 'Organization',
        name: 'Calcutta Node',
        url: 'https://calcuttanode.com',
        logo: 'https://calcuttanode.com/logo.png',
        description: 'IT Services & Digital Growth Agency based in Kolkata, India.',
        address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressRegion: 'West Bengal', addressCountry: 'IN' },
        contactPoint: { '@type': 'ContactPoint', telephone: '+91-8584885450', contactType: 'customer service', availableLanguage: ['English', 'Bengali', 'Hindi'] },
        sameAs: ['https://instagram.com/calcuttanode', 'https://facebook.com/calcuttanode'],
        foundingDate: '2023',
        ...data,
      },
      LocalBusiness: {
        '@context': 'https://schema.org', '@type': 'LocalBusiness',
        name: 'Calcutta Node',
        image: 'https://calcuttanode.com/logo.png',
        '@id': 'https://calcuttanode.com',
        url: 'https://calcuttanode.com',
        telephone: '+91-8584885450',
        priceRange: '₹₹',
        address: { '@type': 'PostalAddress', streetAddress: 'Champdani', addressLocality: 'Hooghly', addressRegion: 'West Bengal', postalCode: '712222', addressCountry: 'IN' },
        geo: { '@type': 'GeoCoordinates', latitude: 22.8046, longitude: 88.3154 },
        openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '21:00' },
        sameAs: ['https://instagram.com/calcuttanode', 'https://facebook.com/calcuttanode'],
        ...data,
      },
      BlogPosting: {
        '@context': 'https://schema.org', '@type': 'BlogPosting',
        headline: data.headline || name,
        description: data.description || '',
        author: { '@type': 'Organization', name: 'Calcutta Node' },
        datePublished: data.datePublished || new Date().toISOString().split('T')[0],
        ...data,
      },
      Service: {
        '@context': 'https://schema.org', '@type': 'Service',
        name: data.serviceName || name,
        description: data.description || '',
        provider: { '@type': 'Organization', name: 'Calcutta Node' },
        areaServed: { '@type': 'Country', name: 'IN' },
        ...data,
      },
      FAQPage: {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: (data.questions || [
          { question: 'What services does Calcutta Node offer?', answer: 'Calcutta Node offers IT support, web development, digital marketing, SEO, UI/UX design, and more.' },
          { question: 'Where is Calcutta Node based?', answer: 'Calcutta Node is based in Kolkata, West Bengal, India, serving clients worldwide.' },
        ]).map(q => ({ '@type': 'Question', name: q.question, acceptedAnswer: { '@type': 'Answer', text: q.answer } })),
      },
      Product: {
        '@context': 'https://schema.org', '@type': 'Product',
        name: data.productName || name,
        description: data.description || '',
        offers: { '@type': 'Offer', price: data.price || '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
        ...data,
      },
    };

    const schema = schemas[type] || schemas.Organization;
    res.json({ schema, type });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateSitemap = async (req, res) => {
  const baseUrl = 'https://calcuttanode.com';
  const now = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: baseUrl, priority: '1.0', changefreq: 'weekly' },
    { loc: `${baseUrl}/about`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${baseUrl}/blogs`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/tools`, priority: '0.7', changefreq: 'weekly' },
    { loc: `${baseUrl}/courses`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/pricing`, priority: '0.8', changefreq: 'monthly' },
    { loc: `${baseUrl}/contact`, priority: '0.6', changefreq: 'monthly' },
    { loc: `${baseUrl}/work`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/products`, priority: '0.7', changefreq: 'weekly' },
    { loc: `${baseUrl}/plans`, priority: '0.7', changefreq: 'monthly' },
    { loc: `${baseUrl}/ai`, priority: '0.9', changefreq: 'weekly' },
    { loc: `${baseUrl}/app`, priority: '0.5', changefreq: 'monthly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.send(xml);
};
