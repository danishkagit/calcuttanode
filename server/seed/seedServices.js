import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service.js';

dotenv.config();

const seedServices = [
  { name: 'Remote IT Support - Basic', category: 'Remote Support', description: 'Basic remote troubleshooting and software installation', price: 499, features: ['Remote desktop connection', 'Basic troubleshooting', 'Software installation', 'Email support'], isActive: true },
  { name: 'Remote IT Support - Standard', category: 'Remote Support', description: 'Standard remote support with OS help and priority queue', price: 999, features: ['Everything in Basic', 'OS reinstallation help', 'Driver setup', 'Priority support', 'Follow-up session'], isActive: true },
  { name: 'Remote IT Support - Premium', category: 'Remote Support', description: 'Premium support with network config, security audit, and 24/7 access', price: 1999, features: ['Everything in Standard', 'Network configuration', 'Security audit', 'Weekly check-in', '24/7 support'], isActive: true },
  { name: 'Data Recovery', category: 'Data Recovery', description: 'Professional data recovery service for HDD, SSD, and NVMe drives', price: 1499, features: ['HDD/SSD/NVMe diagnostics', 'File recovery attempt', 'Free consultation', 'No recovery, no charge policy'], isActive: true },
  { name: 'Website Development', category: 'Website Development', description: 'Responsive website development with SEO basics', price: 4999, features: ['5-page responsive site', 'Contact form', 'SEO basics', '1 month support'], isActive: true },
  { name: 'UI/UX Design', category: 'Design', description: 'Professional UI/UX design with wireframes and high-fidelity mockups', price: 2999, features: ['Wireframes', 'High-fidelity mockups', 'Figma source file', '2 revision rounds'], isActive: true },
  { name: 'Graphics Design', category: 'Design', description: 'Logo, branding, and social media graphics design', price: 999, features: ['Logo/branding', 'Social media posts', 'Business card', 'Source files'], isActive: true },
  { name: 'Digital Marketing', category: 'Marketing', description: 'Social media management and content strategy', price: 2999, features: ['Social media management (1 month)', 'Content calendar', 'Basic analytics', 'Monthly report'], isActive: true },
  { name: 'Performance Marketing', category: 'Marketing', description: 'Google and Facebook ads setup and optimization', price: 4999, features: ['Google/Facebook ads setup', 'Ad copy & creatives', 'Conversion tracking', 'Optimization (2 weeks)'], isActive: true },
  { name: 'Gaming Error Troubleshooting', category: 'Troubleshooting', description: 'Fix gaming errors, crashes, and performance issues', price: 399, features: ['FPS/drop issues', 'Crash diagnostics', 'Driver optimization', 'Settings tuning'], isActive: true },
  { name: 'OS Installation', category: 'Troubleshooting', description: 'Clean OS installation with driver setup and data backup', price: 599, features: ['Windows/Linux/macOS install', 'Driver setup', 'Data backup before wipe', 'Basic configuration'], isActive: true },
  { name: 'Network Issues', category: 'Troubleshooting', description: 'Network diagnostics and optimization for home or office', price: 799, features: ['WiFi/LAN diagnostics', 'Router configuration', 'DNS/firewall setup', 'Speed optimization'], isActive: true },
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