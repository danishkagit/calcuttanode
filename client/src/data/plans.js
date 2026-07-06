const plans = [
  {
    id: 'content-pass',
    name: 'Content Pass',
    slug: 'content-pass',
    price: 199,
    durationDays: 30,
    description: 'Access to exclusive blog articles, video tutorials, and downloadable resources. Perfect for DIY learners.',
    features: ['Exclusive articles', 'Video tutorials', 'Downloadable resources', 'Ad-free reading', 'New content weekly'],
    badge: null,
  },
  {
    id: 'monthly-tune-up',
    name: 'Monthly Tune-Up',
    slug: 'monthly-tune-up',
    price: 999,
    durationDays: 30,
    description: 'Monthly PC cleanup, performance optimization, and priority support. Ideal for remote workers and gamers.',
    features: ['Monthly PC cleanup', 'Performance optimization', 'Priority email support', 'Security check', 'Driver updates'],
    badge: 'Most Popular',
  },
  {
    id: 'pro-retainer',
    name: 'Pro Retainer',
    slug: 'pro-retainer',
    price: 2499,
    durationDays: 30,
    description: 'Full IT support retainer with weekly check-ins, security audits, and 24/7 priority support for your business.',
    features: ['Everything in Tune-Up', 'Weekly check-in calls', 'Full security audit', '24/7 priority support', 'Network monitoring', 'Business hours SLA'],
    badge: 'Best Value',
  },
];

export default plans;
