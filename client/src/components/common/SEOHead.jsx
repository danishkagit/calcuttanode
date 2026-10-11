import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://calcuttanode.vercel.app';

const defaults = {
  title: 'Calcutta Node — Digital Growth Agency | Kolkata, India',
  description: 'Calcutta Node is a digital growth agency in Kolkata, India. Remote IT support, web development, UI/UX design, digital marketing, and AI automation.',
  image: `${SITE}/logo-full.png`,
  url: SITE,
};

const pageMeta = {
  '/': { title: 'Calcutta Node — IT Services & Digital Growth Agency | Kolkata', description: 'Digital growth agency offering remote IT support, web development, digital marketing, AI automation, and design services in Kolkata, India.' },
  '/about': { title: 'About — Calcutta Node', description: 'Learn about Calcutta Node — our story, mission, and capabilities delivering web, mobile, AI, and IT services from Kolkata.' },
  '/blogs': { title: 'Blog — Calcutta Node', description: 'Tech tips, digital marketing insights, and industry news from Calcutta Node — your digital growth partner.' },
  '/tools': { title: '50+ Free Online Tools — Calcutta Node', description: 'Free browser-based developer, SEO, PDF, and productivity tools. No signup, no uploads — 100% private and instant.' },
  '/courses': { title: 'Courses — Calcutta Node', description: 'Free and paid courses on web development, digital marketing, AI skills, and IT fundamentals.' },
  '/pricing': { title: 'Pricing — Calcutta Node', description: 'Transparent pricing for web development, IT support, SEO, digital marketing, and UI/UX design services.' },
  '/contact': { title: 'Contact — Calcutta Node', description: 'Get in touch with Calcutta Node for IT services, web development, AI automation, and digital marketing.' },
  '/login': { title: 'Login — Calcutta Node', description: 'Login to your Calcutta Node account to manage services, orders, and memberships.' },
  '/register': { title: 'Register — Calcutta Node', description: 'Create a free Calcutta Node account to access tools, courses, and membership benefits.' },
  '/products': { title: 'Digital Products — Calcutta Node', description: 'Browse digital products, templates, and scripts from Calcutta Node.' },
  '/plans': { title: 'Membership Plans — Calcutta Node', description: 'Choose a membership plan for ongoing IT support and exclusive benefits.' },
  '/ai': { title: 'AI Chat — Calcutta Node', description: 'Chat with Calcutta Node AI for instant IT support, tech help, and general queries.' },
  '/app': { title: 'Mobile App — Calcutta Node', description: 'Download the Calcutta Node Android app for IT support and tools on the go.' },
  '/seo': { title: 'Free SEO Tools — Calcutta Node', description: 'Free SEO tools for content generation, meta tags, keyword ideas, and schema markup.' },
  '/seo-audit': { title: 'SEO Audit — Calcutta Node', description: 'Get a comprehensive SEO audit of your website with actionable fixes and tiered packages.' },
  '/hire': { title: 'Custom Projects — Calcutta Node', description: 'Hire Calcutta Node for custom websites, chatbots, apps, and automation. Transparent packages, rapid delivery.' },
  '/referral': { title: 'Referral Program — Calcutta Node', description: 'Refer Calcutta Node to a friend and earn rewards. Simple referral program with real payouts.' },
  '/prompt-packs': { title: 'AI Prompt Packs — Calcutta Node', description: '10 curated AI prompt packs for SEO, coding, copywriting, social media, career, business, and more.' },
  '/convert': { title: 'Free File Converter — PDF & Image Tools — Calcutta Node', description: 'Convert, merge, split & compress PDFs and images. Free file converter that runs 100% in your browser — no signup, no upload, fully private.' },
};

const schemas = {
  Organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calcutta Node',
    url: SITE,
    logo: `${SITE}/logo.png`,
    description: 'IT services and digital growth agency based in Kolkata, India.',
    address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressRegion: 'West Bengal', addressCountry: 'IN' },
    contactPoint: { '@type': 'ContactPoint', telephone: '+91-8584885450', contactType: 'customer service', availableLanguage: ['English', 'Bengali', 'Hindi'] },
    sameAs: ['https://instagram.com/calcuttanode'],
  },
  LocalBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Calcutta Node',
    image: `${SITE}/logo.png`,
    '@id': SITE,
    url: SITE,
    telephone: '+91-8584885450',
    priceRange: '₹₹',
    address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressRegion: 'West Bengal', addressCountry: 'IN' },
    geo: { '@type': 'GeoCoordinates', latitude: 22.5726, longitude: 88.3639 },
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '21:00' },
    sameAs: ['https://instagram.com/calcuttanode'],
  },
  BlogPosting: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Calcutta Node Blog',
    description: 'Tech tips, IT guides, digital marketing insights, and industry news from Calcutta Node.',
    publisher: { '@type': 'Organization', name: 'Calcutta Node', logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE },
  },
  Service: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@type': 'LocalBusiness', name: 'Calcutta Node' },
    serviceType: 'IT and Digital Services',
    description: 'Professional IT support, web development, AI automation, and digital marketing services in Kolkata.',
    areaServed: { '@type': 'City', name: 'Kolkata' },
  },
  FAQPage: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does Calcutta Node offer?',
        acceptedAnswer: { '@type': 'Answer', text: 'Calcutta Node offers web development, mobile apps, remote IT support, SEO, digital marketing, AI automation, and UI/UX design.' }
      },
      {
        '@type': 'Question',
        name: 'Are the online tools free to use?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. All 50+ browser-based tools — PDF converters, SEO utilities, and developer tools — are free with no signup required. Files never leave your device.' }
      }
    ]
  },
};

function breadcrumbSchema(pathname) {
  if (pathname === '/') return null;
  const seg = pathname.split('/').filter(Boolean)[0] || '';
  const label = pageMeta[pathname]?.title?.split(' — ')[0] || seg;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
      { '@type': 'ListItem', position: 2, name: label, item: SITE + pathname },
    ],
  };
}

function setLink(attr, href) {
  let el = document.head.querySelector(`link[rel="${attr}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', attr);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEOHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = pageMeta[pathname] || pageMeta['/'];
    document.title = meta.title;

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (name.startsWith('og:')) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', meta.description);
    setMeta('og:title', meta.title);
    setMeta('og:description', meta.description);
    setMeta('og:url', defaults.url + pathname);
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    setMeta('og:image', defaults.image);
    setMeta('twitter:image', defaults.image);
    setLink('canonical', defaults.url + pathname);

    const crumbs = breadcrumbSchema(pathname);
    let schema;
    if (pathname.startsWith('/blogs/')) schema = schemas.BlogPosting;
    else if (pathname === '/pricing') schema = schemas.Service;
    else if (pathname === '/contact') schema = schemas.FAQPage;
    else if (pathname === '/' ) schema = schemas.LocalBusiness;
    else schema = schemas.LocalBusiness;

    let script = document.getElementById('json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    let crumbScript = document.getElementById('json-ld-breadcrumb');
    if (crumbs) {
      if (!crumbScript) {
        crumbScript = document.createElement('script');
        crumbScript.id = 'json-ld-breadcrumb';
        crumbScript.type = 'application/ld+json';
        document.head.appendChild(crumbScript);
      }
      crumbScript.textContent = JSON.stringify(crumbs);
    } else if (crumbScript) {
      crumbScript.remove();
    }
  }, [pathname]);

  return null;
}
