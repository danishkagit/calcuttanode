import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const defaults = {
  title: 'Calcutta Node — Digital Growth Agency | Champdani, Hooghly',
  description: 'Calcutta Node is a digital growth agency in Champdani, Hooghly. We offer remote IT support, web development, UI/UX design, digital marketing, and more.',
  image: 'https://calcuttanode.vercel.app/logo.png',
  url: 'https://calcuttanode.vercel.app',
};

const pageMeta = {
  '/': { title: 'Calcutta Node — Digital Growth Agency', description: 'Digital growth agency offering IT support, web development, digital marketing, and design services in Kolkata, India.' },
  '/about': { title: 'About — Calcutta Node', description: 'Learn about Calcutta Node — our story, team, and mission to deliver digital growth solutions from Kolkata.' },
  '/blogs': { title: 'Blog — Calcutta Node', description: 'Tech tips, digital marketing insights, and industry news from Calcutta Node — your growth partner.' },
  '/tools': { title: 'Free Tools & Resources — Calcutta Node', description: 'Curated free tools and resources for SEO, design, coding, writing, research, and productivity.' },
  '/courses': { title: 'Courses — Calcutta Node', description: 'Free and paid courses on web development, digital marketing, IT skills, and more.' },
  '/pricing': { title: 'Pricing — Calcutta Node', description: 'Transparent pricing for IT support, web development, digital marketing, and design services.' },
  '/contact': { title: 'Contact — Calcutta Node', description: 'Get in touch with Calcutta Node for IT services, web development, and digital marketing.' },
  '/login': { title: 'Login — Calcutta Node', description: 'Login to your Calcutta Node account to manage services, orders, and subscriptions.' },
  '/register': { title: 'Register — Calcutta Node', description: 'Create a Calcutta Node account to access services, courses, and membership plans.' },
  '/products': { title: 'Digital Products — Calcutta Node', description: 'Browse digital products, templates, and scripts from Calcutta Node.' },
  '/plans': { title: 'Membership Plans — Calcutta Node', description: 'Choose a membership plan for ongoing IT support and exclusive benefits.' },
  '/ai': { title: 'AI Chat — Calcutta Node', description: 'Chat with Calcutta Node AI for instant IT support, tech help, and general queries.' },
  '/app': { title: 'Mobile App — Calcutta Node', description: 'Download the Calcutta Node mobile app for Android for IT support on the go.' },
  '/seo': { title: 'SEO Tools — Calcutta Node', description: 'Free SEO tools for content generation, meta tags, keyword research, and schema markup.' },
  '/prompt-packs': { title: 'AI Prompt Packs — Calcutta Node', description: '10 curated AI prompt packs for SEO, coding, copywriting, social media, career, business, and more. Get better AI results instantly.' },
};

const schemas = {
  Organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calcutta Node',
    url: 'https://calcuttanode.vercel.app',
    logo: 'https://calcuttanode.vercel.app/logo.png',
    description: 'Digital Growth Agency based in Kolkata, India.',
    address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressRegion: 'West Bengal', addressCountry: 'IN' },
    contactPoint: { '@type': 'ContactPoint', telephone: '+91-8584885450', contactType: 'customer service', availableLanguage: ['English', 'Bengali', 'Hindi'] },
    sameAs: ['https://instagram.com/calcuttanode'],
  },
  LocalBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Calcutta Node',
    image: 'https://calcuttanode.vercel.app/logo.png',
    '@id': 'https://calcuttanode.vercel.app',
    url: 'https://calcuttanode.vercel.app',
    telephone: '+91-8584885450',
    priceRange: '₹₹',
    address: { '@type': 'PostalAddress', streetAddress: 'Champdani', addressLocality: 'Hooghly', addressRegion: 'West Bengal', postalCode: '712222', addressCountry: 'IN' },
    geo: { '@type': 'GeoCoordinates', latitude: 22.8046, longitude: 88.3154 },
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '21:00' },
    sameAs: ['https://instagram.com/calcuttanode'],
  },
  BlogPosting: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Calcutta Node Blog',
    description: 'Tech tips, IT guides, digital marketing insights, and industry news from Calcutta Node.',
    publisher: { '@type': 'Organization', name: 'Calcutta Node', logo: { '@type': 'ImageObject', url: 'https://calcuttanode.vercel.app/logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://calcuttanode.vercel.app' },
  },
};

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

    const baseSchema = pathname.startsWith('/blogs/') ? schemas.BlogPosting : schemas.LocalBusiness;
    let script = document.getElementById('json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(baseSchema);
  }, [pathname]);

  return null;
}
