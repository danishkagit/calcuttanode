/* ============================================================
   SERVICES DATA
   Edit this file to change service names, descriptions, prices,
   and tiers. See MANUAL.md for full instructions.
   ============================================================ */

export const services = [
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: '🌐',
    shortDescription: 'Custom websites and web apps built with modern frameworks.',
    description: 'Full-stack web development using React, Node.js, and modern tools. From landing pages to complex SaaS platforms.',
    price: '₹15,000+',
    tiers: [
      { name: 'Landing Page', price: '₹5,000', description: 'Single page, responsive' },
      { name: 'Business Website', price: '₹15,000', description: 'Multi-page, CMS ready' },
      { name: 'Web App', price: '₹50,000+', description: 'Full-stack SaaS application' },
    ],
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Development',
    icon: '📱',
    shortDescription: 'Native and cross-platform mobile apps for iOS & Android.',
    description: 'React Native and Flutter app development for startups and enterprises.',
    price: '₹30,000+',
    tiers: [
      { name: 'MVP App', price: '₹30,000', description: 'Basic features, single platform' },
      { name: 'Full App', price: '₹75,000+', description: 'Cross-platform, full features' },
    ],
  },
  {
    id: 'ui-ux',
    name: 'UI/UX Design',
    icon: '🎨',
    shortDescription: 'Beautiful, user-centered design that converts.',
    description: 'Figma designs, wireframes, prototypes, and design systems for web and mobile.',
    price: '₹8,000+',
    tiers: [
      { name: 'Basic Design', price: '₹8,000', description: 'Up to 5 screens' },
      { name: 'Full Design', price: '₹25,000+', description: 'Complete design system' },
    ],
  },
  {
    id: 'ai-automation',
    name: 'AI Automation',
    icon: '🤖',
    shortDescription: 'Custom AI solutions, chatbots, and workflow automation.',
    description: 'Integrate AI into your business — chatbots, data analysis, process automation.',
    price: '₹20,000+',
    tiers: [
      { name: 'Chatbot', price: '₹20,000', description: 'Customer support bot' },
      { name: 'Custom AI', price: '₹50,000+', description: 'Tailored AI solution' },
    ],
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    icon: '📈',
    shortDescription: 'SEO, SEM, social media, and content marketing.',
    description: 'Data-driven marketing strategies to grow your online presence and revenue.',
    price: '₹10,000/mo',
    tiers: [
      { name: 'Starter', price: '₹10,000/mo', description: 'SEO + Social media' },
      { name: 'Growth', price: '₹25,000/mo', description: 'Full marketing stack' },
    ],
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Solutions',
    icon: '🛒',
    shortDescription: 'Online stores with payment integration and inventory management.',
    description: 'Shopify, WooCommerce, and custom e-commerce solutions.',
    price: '₹20,000+',
    tiers: [
      { name: 'Shopify Store', price: '₹20,000', description: 'Theme customization + setup' },
      { name: 'Custom Store', price: '₹60,000+', description: 'Fully custom e-commerce' },
    ],
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    icon: '☁️',
    shortDescription: 'AWS, GCP, Azure setup, CI/CD, and infrastructure.',
    description: 'Cloud migration, server setup, Docker, CI/CD pipelines, and monitoring.',
    price: '₹15,000+',
    tiers: [
      { name: 'Setup', price: '₹15,000', description: 'Single cloud service setup' },
      { name: 'Full DevOps', price: '₹40,000+', description: 'Complete infrastructure' },
    ],
  },
  {
    id: 'seo',
    name: 'SEO Services',
    icon: '🔍',
    shortDescription: 'On-page, off-page, and technical SEO to rank higher.',
    description: 'Comprehensive SEO audit, keyword research, content optimization.',
    price: '₹8,000/mo',
    tiers: [
      { name: 'Basic SEO', price: '₹8,000/mo', description: 'On-page optimization' },
      { name: 'Full SEO', price: '₹20,000/mo', description: 'Complete SEO strategy' },
    ],
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    icon: '🖼️',
    shortDescription: 'Logos, brand identity, and marketing materials.',
    description: 'Logo design, brand kits, social media graphics, and print materials.',
    price: '₹3,000+',
    tiers: [
      { name: 'Logo Design', price: '₹3,000', description: '3 concepts + revisions' },
      { name: 'Brand Kit', price: '₹12,000', description: 'Full brand identity' },
    ],
  },
  {
    id: 'content-writing',
    name: 'Content Writing',
    icon: '✍️',
    shortDescription: 'Blog posts, website copy, and technical documentation.',
    description: 'SEO-optimized content that engages readers and drives traffic.',
    price: '₹1,500/article',
    tiers: [
      { name: 'Blog Post', price: '₹1,500', description: '1000+ words, SEO optimized' },
      { name: 'Website Copy', price: '₹5,000', description: 'Full website content' },
    ],
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    icon: '🎬',
    shortDescription: 'Professional video editing for YouTube, reels, and ads.',
    description: 'Video editing, motion graphics, and post-production services.',
    price: '₹2,000/video',
    tiers: [
      { name: 'Short Form', price: '₹2,000', description: 'Reels, shorts (up to 60s)' },
      { name: 'Long Form', price: '₹8,000+', description: 'YouTube videos, ads' },
    ],
  },
  {
    id: 'it-consulting',
    name: 'IT Consulting',
    icon: '💡',
    shortDescription: 'Strategic technology consulting for your business.',
    description: 'Tech stack selection, architecture review, and digital transformation guidance.',
    price: '₹5,000/session',
    tiers: [
      { name: 'Consultation', price: '₹5,000', description: '1-hour strategy session' },
      { name: 'Retainer', price: '₹20,000/mo', description: 'Ongoing advisory' },
    ],
  },
]
