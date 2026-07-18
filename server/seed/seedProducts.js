import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  { name: 'Business Starter Kit', slug: 'starter-kit', category: 'Templates', price: 999, description: 'Everything you need to launch your online presence: SEO checklist, social media calendar, 3 website templates, and 2 Python automation scripts — at 56% off individual pricing.', fileUrl: '/uploads/products/starter-kit.zip', features: ['SEO Audit Checklist (₹199 value)', 'Social Media Calendar (₹299 value)', '3 Website Templates (₹1,497 value)', '2 Python Automation Scripts (₹599 value)', 'Instant download'], originalPrice: 2594, salesCount: 88 },
  { name: 'SEO Audit Checklist', slug: 'seo-audit-checklist', category: 'Guides', price: 199, description: 'A comprehensive 50-point SEO audit checklist covering on-page, off-page, technical SEO, and local SEO.', fileUrl: '/uploads/products/seo-audit-checklist.pdf', features: ['50-point checklist', 'On-page & off-page SEO', 'Technical SEO guide', 'Local SEO section', 'Printable PDF'], salesCount: 72 },
  { name: 'Social Media Content Calendar', slug: 'social-media-calendar', category: 'Templates', price: 299, description: 'A 30-day social media content calendar template for Instagram, Facebook, LinkedIn, and Twitter.', fileUrl: '/uploads/products/social-media-calendar.xlsx', features: ['30-day calendar', 'Multi-platform support', 'Post idea prompts', 'Google Sheets format', 'Editable templates'], salesCount: 65 },
  { name: 'PC Optimization Script Bundle', slug: 'pc-optimization-scripts', category: 'Tools', price: 299, description: 'PowerShell and batch scripts to clean temp files, optimize startup, defrag drives, check disk health, and more.', fileUrl: '/uploads/products/pc-optimization-scripts.zip', features: ['10+ automation scripts', 'Clean temp files', 'Startup optimization', 'Disk health checks', 'Safe to run'], salesCount: 58 },
  { name: 'Canva Social Media Templates', slug: 'canva-social-templates', category: 'Design Assets', price: 399, description: '20 premium Canva templates for Instagram, stories, Facebook, LinkedIn, and YouTube.', fileUrl: '/uploads/products/canva-templates.zip', features: ['20 Canva templates', 'Instagram + Stories', 'Facebook + LinkedIn', 'YouTube thumbnails', 'Fully editable'], salesCount: 51 },
  { name: 'Website Template Pack', slug: 'website-template-pack', category: 'Templates', price: 499, description: '5 ready-to-use HTML/CSS website templates for portfolio, business, landing page, blog, and coming soon.', fileUrl: '/uploads/products/website-template-pack.zip', features: ['5 responsive templates', 'HTML5 + CSS3', 'Easy to customize', 'Documentation included', 'Free updates'], salesCount: 47 },
  { name: 'Python Automation Scripts', slug: 'python-automation-scripts', category: 'Tools', price: 599, description: '5 Python automation scripts for file organization, web scraping, email automation, data backup, and PDF processing.', fileUrl: '/uploads/products/python-scripts.zip', features: ['5 Python scripts', 'File organizer', 'Web scraper', 'Email automation', 'PDF tools'], salesCount: 38 },
  { name: 'Ultimate IT Support Guide', slug: 'ultimate-it-support-guide', category: 'Guides', price: 249, description: 'Step-by-step guide for Wi-Fi problems, slow PC, printer setup, email configuration, and data backup.', fileUrl: '/uploads/products/it-support-guide.pdf', features: ['50+ troubleshooting steps', 'Wi-Fi & network guide', 'PC speed optimization', 'Printer & email setup', 'Beginner friendly'], salesCount: 34 },
  { name: 'Responsive Portfolio Template', slug: 'responsive-portfolio-template', category: 'Templates', price: 799, description: 'Modern animated portfolio template with dark theme, smooth scroll, and project showcase.', fileUrl: '/uploads/products/portfolio-template.zip', features: ['Single-page portfolio', 'Dark theme', 'Smooth animations', 'Project showcase', 'Contact form ready'], salesCount: 22 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    await Product.deleteMany({});
    const created = await Product.insertMany(products);
    console.log(`Seeded ${created.length} products`);
    await mongoose.disconnect();
    console.log('Done');
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
