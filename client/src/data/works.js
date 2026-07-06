import logo1 from '../assets/logos/razorpay.svg';
import logo2 from '../assets/logos/meesho.svg';
import logo3 from '../assets/logos/boat.svg';
import logo4 from '../assets/logos/blinkit.svg';
import logo5 from '../assets/logos/physics-wallah.svg';
import logo6 from '../assets/logos/urban-company.svg';
import logo7 from '../assets/logos/mamaearth.svg';
import logo8 from '../assets/logos/pine-labs.svg';
import logo9 from '../assets/logos/sentry.svg';
import logo10 from '../assets/logos/huggingface.svg';
import logo11 from '../assets/logos/linear.svg';
import logo12 from '../assets/logos/railway.svg';

const works = [
  {
    id: 1, name: 'Razorpay', industry: 'Fintech', logo: logo1,
    projects: [
      { service: 'Website Development', description: 'Built a regional payment integration guide microsite for Razorpay partners', outcome: '500+ partner integrations in first quarter' },
      { service: 'UI/UX Design', description: 'Redesigned the merchant onboarding dashboard for small businesses', outcome: '35% faster onboarding time' },
      { service: 'Remote IT Support', description: 'Provided backend support for Razorpay plugin ecosystem documentation', outcome: '40% reduction in support tickets' },
    ]
  },
  {
    id: 2, name: 'Meesho', industry: 'E-Commerce', logo: logo2,
    projects: [
      { service: 'Website Development', description: 'Developed a supplier onboarding portal for Meesho local sellers', outcome: '1000+ sellers onboarded in pilot' },
      { service: 'Digital Marketing', description: 'Ran regional social media campaigns for Meesho tier-2 city expansion', outcome: '2x seller registrations from target cities' },
      { service: 'Graphics Design', description: 'Created product listing templates and catalog assets for resellers', outcome: '50K+ templates downloaded by sellers' },
    ]
  },
  {
    id: 3, name: 'boAt', industry: 'Consumer Electronics', logo: logo3,
    projects: [
      { service: 'Website Development', description: 'Built a product showcase microsite for boAt festival season campaigns', outcome: '2M+ visits during campaign period' },
      { service: 'Graphics Design', description: 'Created e-commerce catalog images and Amazon A+ content', outcome: '15% higher conversion on product pages' },
      { service: 'Network Issues', description: 'Optimized CDN and asset delivery for boAt regional websites', outcome: '50% faster page load in emerging markets' },
    ]
  },
  {
    id: 4, name: 'Blinkit', industry: 'Quick Commerce', logo: logo4,
    projects: [
      { service: 'Website Development', description: 'Built an inventory tracking dashboard for Blinkit warehouse operations', outcome: '20% reduction in stock-out incidents' },
      { service: 'Remote IT Support', description: 'Provided remote monitoring and support for Blinkit dark store network', outcome: '99.5% system availability across 50+ stores' },
      { service: 'Network Issues', description: 'Designed last-mile network architecture for Blinkit delivery partner app', outcome: '30% faster order assignment' },
    ]
  },
  {
    id: 5, name: 'Physics Wallah', industry: 'EdTech', logo: logo5,
    projects: [
      { service: 'Website Development', description: 'Built a student dashboard and course progress tracker', outcome: '1L+ active students in first semester' },
      { service: 'UI/UX Design', description: 'Redesigned the PW learning app interface for vernacular languages', outcome: '40% increase in non-English user retention' },
      { service: 'OS Installation', description: 'Deployed and configured classroom systems for PW offline centers', outcome: '10 centers operational within 3 months' },
    ]
  },
  {
    id: 6, name: 'Urban Company', industry: 'Home Services', logo: logo6,
    projects: [
      { service: 'Website Development', description: 'Built a service partner onboarding and training portal', outcome: '200+ service partners certified monthly' },
      { service: 'UI/UX Design', description: 'Designed the customer booking flow for Urban Company tier-3 cities', outcome: '25% increase in bookings from small towns' },
      { service: 'Remote IT Support', description: 'Remote IT setup and support for Urban Company experience centers', outcome: '99% uptime across 5 centers' },
    ]
  },
  {
    id: 7, name: 'Mamaearth', industry: 'Personal Care', logo: logo7,
    projects: [
      { service: 'Website Development', description: 'Built a blog and content hub for Mamaearth parenting community', outcome: '100K+ monthly active readers' },
      { service: 'Graphics Design', description: 'Designed social media creatives and product infographics', outcome: '30% higher engagement on Instagram' },
      { service: 'Digital Marketing', description: 'Managed Google Shopping campaigns for Mamaearth product catalog', outcome: '3x ROAS on campaign spend' },
    ]
  },
  {
    id: 8, name: 'Pine Labs', industry: 'Fintech', logo: logo8,
    projects: [
      { service: 'Website Development', description: 'Developed a merchant analytics portal for Pine Labs POS insights', outcome: '500+ merchants using dashboards weekly' },
      { service: 'UI/UX Design', description: 'Designed the Pine Labs merchant app payment flow for small retailers', outcome: '45% faster transaction time' },
      { service: 'Remote IT Support', description: 'Remote deployment and support for Pine Labs POS firmware updates', outcome: '1000+ successful updates across India' },
    ]
  },
  {
    id: 9, name: 'Sentry', industry: 'Developer Tools', logo: logo9,
    projects: [
      { service: 'Website Development', description: 'Built an integration docs portal for Sentry Indian developer community', outcome: '10K+ monthly unique developer visits' },
      { service: 'Digital Marketing', description: 'Content marketing for Sentry India adoption in startup ecosystem', outcome: '200+ startups onboarded' },
      { service: 'Graphics Design', description: 'Created tutorial graphics and explainer videos for Sentry SDK setup', outcome: '50K+ views across tutorials' },
    ]
  },
  {
    id: 10, name: 'Hugging Face', industry: 'AI Platform', logo: logo10,
    projects: [
      { service: 'Website Development', description: 'Built a model showcase portal for Hugging Face Indian language models', outcome: '50+ Indic models featured' },
      { service: 'Digital Marketing', description: 'Community building and event promotion for Hugging Face India meetups', outcome: '500+ attendees across 3 cities' },
      { service: 'Graphics Design', description: 'Created technical explainer graphics for transformer model concepts', outcome: '100K+ impressions on LinkedIn' },
    ]
  },
  {
    id: 11, name: 'Linear', industry: 'Project Management', logo: logo11,
    projects: [
      { service: 'Website Development', description: 'Built a feature request and changelog portal for Linear community', outcome: 'Active engagement from 500+ users' },
      { service: 'UI/UX Design', description: 'Designed sprint planning dashboard prototype for small teams', outcome: 'Positive feedback from pilot users' },
      { service: 'Remote IT Support', description: 'Community moderation and support for Linear India user group', outcome: '2000+ members in community' },
    ]
  },
  {
    id: 12, name: 'Railway', industry: 'Cloud Platform', logo: logo12,
    projects: [
      { service: 'Website Development', description: 'Built template and deployment guide portal for Railway ecosystem', outcome: '300+ templates published by community' },
      { service: 'Digital Marketing', description: 'Developer advocacy content for Railway adoption in Indian startups', outcome: '15% increase in India-registered users' },
      { service: 'Graphics Design', description: 'Created deployment workflow diagrams and technical illustrations', outcome: 'Used in official Railway documentation' },
    ]
  },
];

export default works;
