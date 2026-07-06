import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';

dotenv.config();

const seedServices = [
  {
    name: 'Website Development',
    category: 'Website Development',
    price: 4999,
    features: ['5-page responsive site', 'Mobile-first design', 'Contact form integration', 'SEO basics setup', '1 month support'],
    trending: 100,
  },
  {
    name: 'Full Stack Web Development',
    category: 'Website Development',
    price: 14999,
    features: ['Custom frontend & backend', 'Database design (MongoDB/MySQL)', 'REST API development', 'User authentication & sessions', 'Deployment & hosting setup', '3 months support'],
    trending: 78,
  },
  {
    name: 'E-Commerce Store Setup',
    category: 'Website Development',
    price: 7999,
    features: ['Product catalog setup', 'Payment gateway integration', 'Mobile optimized', 'Order management', 'Basic SEO'],
    trending: 85,
  },
  {
    name: 'Mobile App Development',
    category: 'App Development',
    price: 9999,
    features: ['Android & iOS apps', 'Cross-platform (React Native/Flutter)', 'API & backend integration', 'Push notifications', 'App store deployment assistance', '2 months support'],
    trending: 92,
  },
  {
    name: 'Digital Marketing',
    category: 'Marketing',
    price: 2999,
    features: ['Social media management (1 month)', 'Content calendar', 'Basic analytics & reporting', 'Monthly performance report'],
    trending: 90,
  },
  {
    name: 'SEO Optimization',
    category: 'Marketing',
    price: 1999,
    features: ['On-page SEO audit', 'Keyword research', 'Meta tags optimization', 'Google Search Console setup', 'Monthly report'],
    trending: 95,
  },
  {
    name: 'Performance Marketing',
    category: 'Marketing',
    price: 4999,
    features: ['Google/Facebook ads setup', 'Ad copy & creatives', 'Conversion tracking', 'A/B testing', 'Optimization (2 weeks)'],
    trending: 70,
  },
  {
    name: 'Remote IT Support - Basic',
    category: 'Remote Support',
    price: 499,
    features: ['Remote desktop connection', 'Basic troubleshooting', 'Software installation', 'Email support'],
    trending: 60,
  },
  {
    name: 'Remote IT Support - Standard',
    category: 'Remote Support',
    price: 999,
    features: ['Everything in Basic', 'OS reinstallation help', 'Driver setup', 'Priority support', 'Follow-up session'],
    trending: 55,
  },
  {
    name: 'Remote IT Support - Premium',
    category: 'Remote Support',
    price: 1999,
    features: ['Everything in Standard', 'Network configuration', 'Security audit', 'Weekly check-in', '24/7 support'],
    trending: 40,
  },
  {
    name: 'Network Troubleshooting',
    category: 'Troubleshooting',
    price: 799,
    features: ['WiFi/LAN diagnostics', 'Router configuration', 'DNS/firewall setup', 'Speed optimization'],
    trending: 50,
  },
  {
    name: 'OS Installation & Upgrade',
    category: 'Troubleshooting',
    price: 599,
    features: ['Windows/Linux/macOS install', 'Driver setup', 'Data backup before wipe', 'Basic configuration'],
    trending: 65,
  },
  {
    name: 'Gaming Error Troubleshooting',
    category: 'Troubleshooting',
    price: 399,
    features: ['FPS/drop issues', 'Crash diagnostics', 'Driver optimization', 'Settings tuning'],
    trending: 45,
  },
  {
    name: 'UI/UX Design',
    category: 'Design',
    price: 2999,
    features: ['Wireframes & sitemap', 'High-fidelity mockups', 'Figma source file', '2 revision rounds', 'Responsive layout'],
    trending: 75,
  },
  {
    name: 'Graphics Design',
    category: 'Design',
    price: 999,
    features: ['Logo & brand identity', 'Social media posts', 'Business card design', 'Banner & flyer', 'Source files'],
    trending: 80,
  },
  {
    name: 'Video Editing',
    category: 'Design',
    price: 1499,
    features: ['Trim & cut', 'Transitions & effects', 'Background music', 'Text overlays', 'Social media export'],
    trending: 88,
  },
  {
    name: 'Data Recovery',
    category: 'Data Recovery',
    price: 1499,
    features: ['HDD/SSD/NVMe diagnostics', 'File recovery attempt', 'Free consultation', 'No recovery, no charge policy'],
    trending: 30,
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Service.deleteMany({});
    await Service.insertMany(seedServices);
    console.log('Services seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();
