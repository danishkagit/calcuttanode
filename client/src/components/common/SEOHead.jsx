import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const defaults = {
  title: 'Calcutta Node — IT Services & Digital Growth Agency | Champdani, Hooghly',
  description: 'Calcutta Node is an IT services and digital growth agency in Champdani, Hooghly. We offer remote IT support, web development, UI/UX design, digital marketing, and more.',
  image: 'https://calcuttanode.com/logo.png',
  url: 'https://calcuttanode.com',
};

const pageMeta = {
  '/': { title: 'Calcutta Node — IT Services & Digital Growth Agency', description: 'Professional IT support, web development, digital marketing, and design services in Kolkata, India.' },
  '/about': { title: 'About — Calcutta Node', description: 'Learn about Calcutta Node — our story, team, and mission to deliver top IT services from Kolkata.' },
  '/blogs': { title: 'Blog — Calcutta Node', description: 'Tech tips, IT guides, digital marketing insights, and industry news from Calcutta Node.' },
  '/tools': { title: 'Free Tools & AI Resources — Calcutta Node', description: 'Curated free tools and AI resources for SEO, design, coding, writing, research, and productivity.' },
  '/courses': { title: 'Courses — Calcutta Node', description: 'Free and paid courses on web development, digital marketing, IT skills, and more.' },
  '/pricing': { title: 'Pricing — Calcutta Node', description: 'Transparent pricing for IT support, web development, digital marketing, and design services.' },
  '/contact': { title: 'Contact — Calcutta Node', description: 'Get in touch with Calcutta Node for IT services, web development, and digital marketing.' },
  '/work': { title: 'Our Work — Calcutta Node', description: 'Portfolio and case studies showcasing our IT, web development, and design projects.' },
  '/login': { title: 'Login — Calcutta Node', description: 'Login to your Calcutta Node account to manage services, orders, and subscriptions.' },
  '/register': { title: 'Register — Calcutta Node', description: 'Create a Calcutta Node account to access services, courses, and membership plans.' },
  '/products': { title: 'Digital Products — Calcutta Node', description: 'Browse digital products, templates, and scripts from Calcutta Node.' },
  '/plans': { title: 'Membership Plans — Calcutta Node', description: 'Choose a membership plan for ongoing IT support and exclusive benefits.' },
  '/ai': { title: 'AI Chat — Calcutta Node', description: 'Chat with Calcutta Node AI for IT support, tech help, and general queries.' },
  '/app': { title: 'Mobile App — Calcutta Node', description: 'Download the Calcutta Node mobile app for Android for IT support on the go.' },
  '/seo': { title: 'AI SEO Tools — Calcutta Node', description: 'Free AI-powered SEO tools for content generation, meta tags, keyword research, and schema markup.' },
};

const schemas = {
  Organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calcutta Node',
    url: 'https://calcuttanode.com',
    logo: 'https://calcuttanode.com/logo.png',
    description: 'IT Services & Digital Growth Agency based in Kolkata, India.',
    address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressRegion: 'West Bengal', addressCountry: 'IN' },
    contactPoint: { '@type': 'ContactPoint', telephone: '+91-8584885450', contactType: 'customer service', availableLanguage: ['English', 'Bengali', 'Hindi'] },
    sameAs: ['https://instagram.com/calcuttanode', 'https://facebook.com/calcuttanode'],
    foundingDate: '2023',
  },
  LocalBusiness: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
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
    foundingDate: '2023',
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
