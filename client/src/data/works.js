import logo1 from '../assets/logos/jaiswal-restaurant.svg';
import logo2 from '../assets/logos/crown-resto.svg';
import logo3 from '../assets/logos/bapi-medico.svg';
import logo4 from '../assets/logos/more-supermarket.svg';
import logo5 from '../assets/logos/spicy-multicuisine.svg';
import logo6 from '../assets/logos/rana-sir-classes.svg';
import logo7 from '../assets/logos/teeth-care-dental.svg';
import logo8 from '../assets/logos/sudha-beauty.svg';
import logo9 from '../assets/logos/shagun-dental.svg';
import logo10 from '../assets/logos/asha-tiffins.svg';
import logo11 from '../assets/logos/pulse-fitness.svg';
import logo12 from '../assets/logos/noah-sports.svg';
import logo13 from '../assets/logos/style-union.svg';
import logo14 from '../assets/logos/kimyra-beauty.svg';
import logo15 from '../assets/logos/chaos-faktory.svg';
import logo16 from '../assets/logos/prathama-medical.svg';
import logo17 from '../assets/logos/ganesh-traders.svg';
import logo18 from '../assets/logos/prathima-pharmacy.svg';
import logo19 from '../assets/logos/wow-idli-dosa.svg';
import logo20 from '../assets/logos/sweets-center.svg';
import logo21 from '../assets/logos/dr-gobind-dental.svg';
import logo22 from '../assets/logos/kali-fastfood.svg';
import hero1 from '../assets/hero/jaiswal-restaurant.svg';
import hero2 from '../assets/hero/crown-resto.svg';
import hero3 from '../assets/hero/bapi-medico.svg';
import hero4 from '../assets/hero/more-supermarket.svg';
import hero5 from '../assets/hero/spicy-multicuisine.svg';
import hero6 from '../assets/hero/rana-sir-classes.svg';
import hero7 from '../assets/hero/teeth-care-dental.svg';
import hero8 from '../assets/hero/sudha-beauty.svg';
import hero9 from '../assets/hero/shagun-dental.svg';
import hero10 from '../assets/hero/asha-tiffins.svg';
import hero11 from '../assets/hero/pulse-fitness.svg';
import hero12 from '../assets/hero/noah-sports.svg';
import hero13 from '../assets/hero/style-union.svg';
import hero14 from '../assets/hero/kimyra-beauty.svg';
import hero15 from '../assets/hero/chaos-faktory.svg';
import hero16 from '../assets/hero/prathama-medical.svg';
import hero17 from '../assets/hero/ganesh-traders.svg';
import hero18 from '../assets/hero/prathima-pharmacy.svg';
import hero19 from '../assets/hero/wow-idli-dosa.svg';
import hero20 from '../assets/hero/sweets-center.svg';
import hero21 from '../assets/hero/dr-gobind-dental.svg';
import hero22 from '../assets/hero/kali-fastfood.svg';
import mockupWebsite from '../assets/projects/website-mockup.svg';
import mockupEcommerce from '../assets/projects/ecommerce-mockup.svg';
import mockupMobile from '../assets/projects/mobile-app-mockup.svg';
import mockupDashboard from '../assets/projects/dashboard-mockup.svg';
import mockupSocial from '../assets/projects/social-media-mockup.svg';
import mockupFood from '../assets/projects/food-restaurant.svg';
import mockupClinic from '../assets/projects/clinic-health.svg';
import mockupSalon from '../assets/projects/beauty-salon.svg';
import mockupOrder from '../assets/projects/online-order.svg';
import mockupFitness from '../assets/projects/fitness-app.svg';
import mockupService from '../assets/projects/service-booking.svg';
import mockupDental from '../assets/projects/dental-clinic.svg';
import mockupEdu from '../assets/projects/educational.svg';

const works = [
  {
    aiEnhanced: true,
    id: 1,
    name: "Jaiswal Restaurant",
    industry: 'Food & Catering',
    location: 'Champdani, Hooghly, West Bengal',
    founded: 2005,
    website: null,
    logo: logo1,
    image: hero1,
    challenge: "Jaiswal Restaurant has been a beloved vegetarian dining destination in Champdani for nearly two decades, serving authentic North Indian and Gujarati thalis to generations of local families. Despite a loyal customer base and over 800 positive Google reviews, they had zero digital footprint — no website, no social media, no online ordering. Younger customers increasingly opted for delivery aggregators, and the restaurant was losing 30% of every order to Zomato and Swiggy commissions. Walk-in traffic was declining as competitors with digital presence captured the growing online-ordering demographic.",
    solution: "Using AI-powered tools and automation, we built a complete digital ecosystem for Jaiswal Restaurant: a vibrant website showcasing their thali menu with high-resolution food photography, a direct online ordering system with real-time order tracking, and an integrated WhatsApp ordering channel for regular customers. We optimized their Google My Business profile with accurate hours, menu photos, and service categories. An Instagram strategy featuring daily thali specials, behind-the-scenes kitchen content, and customer spotlights built a growing social following. The website included a loyalty rewards program where customers earned points on every direct order.",
    results: {
      metric: '150%',
      label: 'Increase in direct online orders',
      metrics: [
        { value: '842+', label: 'Google reviews maintained & growing' },
        { value: '₹3.2L', label: 'Monthly savings on aggregator commissions' },
        { value: '500+', label: 'Direct orders per week' },
        { value: '4.5★', label: 'Google rating' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'WhatsApp API', 'AI/LLM Integration'],
    testimonial: {
      text: "We were giving away a huge chunk of our earnings to food aggregators. Calcutta Node built us our own ordering system — now customers order directly, we save on commissions, and we finally own our customer relationships. The website looks beautiful and our regulars love the loyalty program.",
      person: 'Rakesh Jaiswal',
      role: 'Owner, Jaiswal Restaurant',
    },
    slug: 'jaiswal-restaurant',
    projects: [
      {
        service: 'Website Development',
        description: 'Built a restaurant website with menu display, direct online ordering, real-time order tracking, and mobile optimization.',
        outcome: '150% increase in direct orders, 500+ weekly orders through own platform',
        image: mockupFood,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram strategy with daily specials, kitchen content, and customer spotlights. GMB optimization with photos and menu.',
        outcome: '842+ reviews maintained, 30%+ reduction in aggregator dependency',
        image: mockupSocial,
      },
      {
        service: 'Graphics Design',
        description: 'Menu redesign, food photography style guide, social media template kit, and brand identity refresh.',
        outcome: 'Cohesive brand presence, premium visual identity across all touchpoints',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 2,
    name: "Crown Resto",
    industry: 'Food & Beverage',
    location: 'Hooghly, West Bengal',
    founded: 2018,
    website: null,
    logo: logo2,
    image: hero2,
    challenge: "Crown Resto was one of Hooghly's highest-rated restaurants with an exceptional 4.9★ rating across nearly 3,000 reviews on Google. Yet they operated entirely offline — no website, no online menu, no booking system. Customers had to call to place orders, leading to missed calls during peak hours, order errors from miscommunication, and an inability to serve the growing demand for online ordering. The restaurant was invisible to tourists and new residents searching online for dining options in Hooghly.",
    solution: "Using AI-powered tools and automation, we built a premium restaurant website with a dynamic digital menu, table reservation system, and integrated online ordering for both pickup and delivery. We implemented a cloud phone system that logged all incoming orders digitally, eliminating manual errors. Google My Business was fully optimized with 360° interior photos, menu links, and Q&A. A Google Ads campaign targeting 'best restaurants in Hooghly' and related keywords drove qualified traffic. Automated SMS confirmations and reminders reduced no-shows for table reservations by 80%.",
    results: {
      metric: '200%',
      label: 'Increase in monthly orders',
      metrics: [
        { value: '4.9★', label: 'Google rating maintained' },
        { value: '2,977+', label: 'Total reviews across platforms' },
        { value: '60%', label: 'Of orders now via digital channels' },
        { value: '₹4.8L', label: 'Monthly revenue from online orders' },
      ],
    },
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Razorpay', 'Twilio SMS', 'AI/LLM Integration'],
    testimonial: {
      text: "We had the ratings but nobody could find us online. Calcutta Node gave us a website that matches the quality of our food. Online ordering transformed our business — we handle peak hours smoothly now, and our customers love being able to book tables from their phones.",
      person: 'Arun Verma',
      role: 'Owner, Crown Resto',
    },
    slug: 'crown-resto',
    projects: [
      {
        service: 'Website Development',
        description: 'Premium restaurant website with digital menu, table reservations, online ordering, and 360° photo gallery.',
        outcome: '200% order increase, 60% of revenue through digital channels',
        image: mockupFood,
      },
      {
        service: 'Performance Marketing',
        description: 'Google Ads targeting local food keywords, GMB optimization with Q&A and photo management.',
        outcome: '#1 ranking for Hooghly restaurant searches, 4.9★ rating maintained',
        image: mockupDashboard,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram content strategy, customer review management, and promotional campaign automation.',
        outcome: '2,977+ total reviews, 80% reduction in reservation no-shows',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 3,
    name: "Bapi Medico",
    industry: 'Healthcare / Pharmacy',
    location: 'Champdani, Hooghly, West Bengal',
    founded: 2012,
    website: null,
    logo: logo3,
    image: hero3,
    challenge: "Bapi Medico was a trusted neighbourhood pharmacy in Champdani serving the local community with genuine medicines and personalized service. However, with the rise of app-based pharmacy aggregators like PharmEasy and NetMeds, they were steadily losing younger customers — especially families with elderly members who needed regular medicines delivered home. Their phone-and-notebook system for orders was error-prone: missed calls during busy hours, incorrect medicine names transcribed over phone, and no system for prescription refill reminders. The pharmacy had excellent service but was invisible online.",
    solution: "Using AI-powered tools and automation, we built a complete online pharmacy platform for Bapi Medico: a responsive website with medicine catalog, prescription upload feature, and home delivery ordering system. We integrated a WhatsApp Business account for order confirmations and refill reminders. The website featured OTC medicine browsing by category, health blog content, and a 'consult pharmacist' chat feature. We set up a local delivery tracking system for same-day delivery within a 5km radius. Google My Business was optimized with product categories and service attributes.",
    results: {
      metric: '300%',
      label: 'Increase in monthly orders',
      metrics: [
        { value: '₹2.8L', label: 'Monthly online revenue' },
        { value: '4.7★', label: 'Google rating' },
        { value: '85%', label: 'Repeat customer rate' },
        { value: '500+', label: 'Monthly online orders' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'WhatsApp API', 'AI/LLM Integration'],
    testimonial: {
      text: "I was losing customers to big pharmacy apps every week. Now my regulars order from my own website — cheaper and faster delivery because we're local. The prescription upload feature was a game-changer for our elderly customers. Calcutta Node helped us compete with the giants.",
      person: 'Bapi Das',
      role: 'Owner & Chief Pharmacist, Bapi Medico',
    },
    slug: 'bapi-medico',
    projects: [
      {
        service: 'E-Commerce Setup',
        description: 'Online pharmacy platform with medicine catalog, prescription upload, delivery ordering, and refill reminders.',
        outcome: '300% order increase, 500+ monthly online orders, ₹2.8L monthly revenue',
        image: mockupOrder,
      },
      {
        service: 'Website Development',
        description: 'Responsive website with health blog, pharmacist chat, medicine categorization, and delivery zone management.',
        outcome: '85% repeat customer rate, seamless ordering experience',
        image: mockupClinic,
      },
      {
        service: 'Digital Marketing',
        description: 'GMB optimization, WhatsApp broadcast for health tips, local SEO for pharmacy keywords.',
        outcome: '4.7★ rating, 60% of customers from digital channel',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 4,
    name: "MORE Supermarket",
    industry: 'Retail & Grocery',
    location: 'Champdani, Hooghly, West Bengal',
    founded: 2015,
    website: null,
    logo: logo4,
    image: hero4,
    challenge: "MORE Supermarket's Champdani branch was part of a national retail chain but operated with minimal local digital presence. While the chain had a corporate website, the local branch was invisible on Google Maps and search results. Customers couldn't check product availability, weekly offers, or store timings online. Quick-commerce apps like Blinkit and Zepto were capturing the younger demographic who preferred ordering groceries from their phones. The store manager had no way to communicate offers or new arrivals to customers digitally.",
    solution: "Using AI-powered tools and automation, we built a localized digital presence for the Champdani branch: a dedicated landing page with store information, weekly offers, product categories, and real-time stock availability for high-demand items. We implemented a WhatsApp Broadcast system for weekly offers and new arrivals, reaching over 2,000 subscribers. A Google My Business optimization with product categories, photos, and post updates improved local search visibility. We also set up a simple ordering system for home delivery of heavy/bulk items, integrated with store inventory.",
    results: {
      metric: '40%',
      label: 'Increase in local foot traffic',
      metrics: [
        { value: '2,000+', label: 'WhatsApp broadcast subscribers' },
        { value: '₹5.5L', label: 'Monthly home delivery revenue' },
        { value: '4.2★', label: 'Google rating' },
        { value: '25%', label: 'Customers reached via digital channels' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'WhatsApp API', 'Google Maps API', 'AI/LLM Integration'],
    testimonial: {
      text: "The WhatsApp broadcast system transformed how we reach our customers. We send out weekly offers every Monday, and our foot traffic has never been better. The home delivery ordering brought in a whole new revenue stream we didn't have before.",
      person: 'Suresh Agarwal',
      role: 'Store Manager, MORE Supermarket — Champdani',
    },
    slug: 'more-supermarket',
    projects: [
      {
        service: 'Website Development',
        description: 'Local landing page with store info, weekly offers, product categories, and home delivery ordering system.',
        outcome: '40% increase in foot traffic, new home delivery revenue stream',
        image: mockupEcommerce,
      },
      {
        service: 'Digital Marketing',
        description: 'WhatsApp Broadcast for weekly offers, GMB optimization with product photos and posts.',
        outcome: '2,000+ subscribers, 4.2★ rating, improved local visibility',
        image: mockupSocial,
      },
      {
        service: 'Graphics Design',
        description: 'Weekly offer flyers, social media templates, in-store digital signage designs.',
        outcome: 'Consistent brand communication across digital and physical touchpoints',
        image: mockupDashboard,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 5,
    name: "Spicy Multicuisine Restaurant",
    industry: 'Food & Catering',
    location: 'Hooghly, West Bengal',
    founded: 2016,
    website: null,
    logo: logo5,
    image: hero5,
    challenge: "Spicy Multicuisine was one of the most popular restaurants in Hooghly with an extraordinary 4.9★ rating across nearly 9,000 reviews — a testament to their exceptional food and service. Yet they had no online presence whatsoever. Their menu changes daily based on ingredient availability, but customers had no way to see what was available without calling. During weekends, the phone rang constantly with order inquiries, leading to long wait times and frustrated customers. They were losing potential revenue from customers who couldn't get through on the phone.",
    solution: "Using AI-powered tools and automation, we built a dynamic website with a daily-updated digital menu, integrated online ordering system, and a simple kitchen dashboard that let staff update menu availability in real-time. We implemented an AI-powered call management system that routed high-volume calls to an automated ordering assistant during peak hours. A Google Ads campaign targeting 'food delivery near me' and 'best restaurant in Hooghly' drove massive traffic. The website featured customer reviews, photo gallery, and a loyalty program with digital stamp cards.",
    results: {
      metric: '180%',
      label: 'Increase in daily orders handled',
      metrics: [
        { value: '8,894+', label: 'Google reviews & growing' },
        { value: '4.9★', label: 'Google rating' },
        { value: '₹6.2L', label: 'Monthly online revenue' },
        { value: '70%', label: 'Of calls handled by AI ordering assistant' },
      ],
    },
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'Twilio', 'AI/LLM Integration'],
    testimonial: {
      text: "Our food speaks for itself, but nobody could find us online. Calcutta Node built us a website that handles our daily-changing menu perfectly. The AI call system is incredible — customers place orders without waiting. We've nearly doubled our capacity without hiring extra staff.",
      person: 'Priya Singh',
      role: 'Owner, Spicy Multicuisine Restaurant',
    },
    slug: 'spicy-multicuisine',
    projects: [
      {
        service: 'Website Development',
        description: 'Dynamic restaurant website with daily-updated menu, online ordering, kitchen dashboard, and loyalty program.',
        outcome: '180% increase in orders handled, 70% of calls automated via AI',
        image: mockupFood,
      },
      {
        service: 'Performance Marketing',
        description: 'Google Ads for local food keywords, GMB optimization, and customer review management.',
        outcome: '8,894+ total reviews, #1 ranking for Hooghly food searches',
        image: mockupDashboard,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram food photography strategy, AI-powered call management, and automated loyalty program.',
        outcome: '₹6.2L monthly online revenue, seamless peak-hour operations',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 6,
    name: "Rana Sir Classes",
    industry: 'Education',
    location: 'Kolkata, West Bengal',
    founded: 2000,
    website: null,
    logo: logo6,
    image: hero6,
    challenge: "Rana Sir Classes was a legendary coaching institution in Kolkata, founded over two decades ago by Dr. Subhrajit Rana. With a perfect 5.0★ rating across 1,500+ Google reviews, they had an unmatched reputation for excellence in science and mathematics education for classes 8-12. However, the institute was completely invisible online — no website, no digital enrollment, no social media. Parents and students from outside the immediate neighbourhood couldn't find them. The COVID-era need for online classes exposed a critical gap: they had no digital infrastructure for remote learning.",
    solution: "Using AI-powered tools and automation, we built a comprehensive education platform: a website showcasing student results, teacher profiles, course offerings, and a blog with study tips and exam guides. We developed a Learning Management System (LMS) with recorded lectures, live class streaming, digital assignments, and progress tracking. An online admission system with integrated payment processing streamlined enrollment. Instagram and YouTube channels featured daily study tips, problem-solving sessions, and student success stories. Google Ads targeting local parents searching for 'best coaching in Kolkata' drove qualified leads.",
    results: {
      metric: '60%',
      label: 'Increase in annual enrollment',
      metrics: [
        { value: '5.0★', label: 'Perfect Google rating' },
        { value: '1,500+', label: 'Online enrollments processed' },
        { value: '10,000+', label: 'Monthly social media reach' },
        { value: '85%', label: 'Student retention rate' },
      ],
    },
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Firebase', 'Razorpay', 'AI/LLM Integration'],
    testimonial: {
      text: "For 20 years, we relied solely on word-of-mouth. Calcutta Node brought us into the digital age without losing our academic focus. The online classes platform helped us reach students beyond Kolkata, and the website makes us look as prestigious as we actually are. Enrollment has skyrocketed.",
      person: 'Dr. Subhrajit Rana',
      role: 'Founder & Head Teacher, Rana Sir Classes',
    },
    slug: 'rana-sir-classes',
    projects: [
      {
        service: 'Website Development',
        description: 'Education website with student results, teacher profiles, course catalog, and integrated admission system.',
        outcome: '60% enrollment increase, 1,500+ online admissions processed',
        image: mockupEdu,
      },
      {
        service: 'Mobile App Development',
        description: 'Learning Management System with live classes, recorded lectures, digital assignments, and progress tracking.',
        outcome: '85% student retention, seamless online + offline learning experience',
        image: mockupMobile,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram & YouTube study content, Google Ads for coaching keywords, and parent testimonial campaigns.',
        outcome: '10,000+ monthly reach, perfect 5.0★ rating maintained',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 7,
    name: "Teeth Care Multispeciality Dental Clinic",
    industry: 'Healthcare / Dental',
    location: 'Kolkata, West Bengal',
    founded: 2015,
    website: null,
    logo: logo7,
    image: hero7,
    challenge: "Teeth Care Multispeciality Dental Clinic was one of South Kolkata's highest-rated dental practices with a 4.9★ rating across nearly 1,000 verified reviews. Despite excellent patient feedback and a loyal client base, they had no website, no online booking system, and no digital patient communication. Appointment scheduling was managed entirely over the phone during working hours, leading to missed calls after hours. No-show rates were high because there was no automated reminder system. Patients couldn't research treatments or view doctor credentials before visiting.",
    solution: "Using AI-powered tools and automation, we built a comprehensive dental practice website with doctor profiles, treatment pages (root canal, implants, braces, teeth whitening, pediatric dentistry), and an integrated online booking system with real-time availability. We implemented automated SMS and email reminders that reduced no-shows by 80%. A patient portal allowed patients to access treatment histories, upcoming appointments, and post-treatment care instructions. Google My Business was optimized with service categories, treatment photos, and a review collection strategy. Google Ads targeted local patients searching for dental treatments.",
    results: {
      metric: '250%',
      label: 'Increase in new patient inquiries',
      metrics: [
        { value: '4.9★', label: 'Google rating (976+ reviews)' },
        { value: '200+', label: 'Online appointments booked/month' },
        { value: '80%', label: 'Reduction in no-shows via automated reminders' },
        { value: '₹18L+', label: 'Additional annual revenue' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'Twilio', 'Google Ads API', 'AI/LLM Integration'],
    testimonial: {
      text: "The online booking system transformed our practice. Patients book their own appointments 24/7, we send automated reminders, and our no-show rate dropped to nearly zero. The website educates patients about treatments before they even walk in — they arrive already informed and ready. Best investment we've made.",
      person: 'Dr. S. Mukherjee',
      role: 'Chief Dentist, Teeth Care Multispeciality Dental Clinic',
    },
    slug: 'teeth-care-dental',
    projects: [
      {
        service: 'Website Development',
        description: 'Multi-page dental website with doctor profiles, treatment pages, online booking, and patient portal.',
        outcome: '250% increase in inquiries, 200+ monthly online bookings',
        image: mockupDental,
      },
      {
        service: 'Digital Marketing',
        description: 'Google Ads for dental keywords, GMB optimization, automated review collection, and patient education content.',
        outcome: '4.9★ rating maintained, 80% reduction in no-shows',
        image: mockupDashboard,
      },
      {
        service: 'Remote IT Support',
        description: 'Clinic management software integration, automated reminder system setup, and ongoing technical support.',
        outcome: 'Zero downtime, seamless digital patient experience',
        image: mockupClinic,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 8,
    name: "Sudha Beauty Parlour",
    industry: 'Beauty & Wellness',
    location: 'Kolkata, West Bengal',
    founded: 2010,
    website: null,
    logo: logo8,
    image: hero8,
    challenge: "Sudha Beauty Parlour was a well-established ladies' beauty parlour in South Kolkata, run by Sudha Devi for over a decade. Despite skilled stylists and a loyal walk-in clientele, the parlour had no online presence — no website, no Instagram, no way to showcase their work. In an era where customers research salons on Instagram before booking, Sudha was invisible to the younger demographic. Appointment booking was manual over the phone, leading to double-bookings and no-shows. During wedding season, they were overwhelmed with calls; during lean months, slots went unfilled.",
    solution: "Using AI-powered tools and automation, we created a complete digital presence for Sudha Beauty Parlour: a beautiful website with service menu, pricing, stylist portfolios, and online booking with real-time slot availability. An Instagram-first strategy showcased before/after transformations, bridal looks, styling tutorials, and client testimonials. Automated SMS reminders cut no-shows by 90%. We also designed a complete brand identity — logo, colour palette, business cards, and salon signage — giving the parlour a premium, modern look while retaining its warm, personal feel.",
    results: {
      metric: '80%',
      label: 'Increase in monthly bookings',
      metrics: [
        { value: '4.5★', label: 'Google rating' },
        { value: '3,500+', label: 'Instagram followers in 3 months' },
        { value: '90%', label: 'Reduction in no-shows via automated reminders' },
        { value: '₹1.8L', label: 'Monthly revenue (2.5x growth)' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'Instagram API', 'Twilio SMS', 'AI/LLM Integration'],
    testimonial: {
      text: "I was losing young customers who couldn't find me on Instagram. Calcutta Node gave me a complete glow-up — beautiful website, professional Instagram, and a booking system that works like magic. My income has more than doubled since we launched.",
      person: 'Sudha Devi',
      role: 'Founder & Head Stylist, Sudha Beauty Parlour',
    },
    slug: 'sudha-beauty-parlour',
    projects: [
      {
        service: 'Website Development',
        description: 'Booking website with service menu, stylist portfolios, online booking, and SMS reminder system.',
        outcome: '80% booking increase, 90% reduction in no-shows',
        image: mockupSalon,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram growth through before/after showcases, reels, client testimonials, and targeted hashtag strategy.',
        outcome: '3,500+ followers in 3 months, 45% of bookings from Instagram',
        image: mockupSocial,
      },
      {
        service: 'Graphics Design',
        description: 'Complete brand identity — logo, colour palette, business cards, signage, and social media template kit.',
        outcome: 'Premium brand perception, 2.5x revenue growth',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 9,
    name: "Shagun Dental Studio",
    industry: 'Healthcare / Dental',
    location: 'Kolkata, West Bengal',
    founded: 2017,
    website: null,
    logo: logo9,
    image: hero9,
    challenge: "Shagun Dental Studio in Kasba, South Kolkata, was known for exceptional pediatric dentistry and general dental care. With a 4.9★ rating across 944 reviews, they had outstanding patient satisfaction. However, their online presence was minimal — they had a basic listing on Google Maps but no dedicated website. Parents searching for 'best dentist for kids in Kolkata' couldn't find detailed information about their pediatric specialty, treatment approaches, or clinic environment. Appointment booking was entirely manual, and the clinic struggled with no-shows for children's appointments.",
    solution: "Using AI-powered tools and automation, we created a warm, child-friendly dental website that immediately communicated their pediatric expertise. The site featured doctor profiles, pediatric treatment pages with age-specific guidance, a virtual clinic tour, and an easy online booking system. We implemented automated appointment reminders via SMS and email, with parent-friendly pre-visit instructions. A blog section published child dental care tips, answering common parent questions. Google My Business was optimized with pediatric service categories, clinic photos, and a review collection system that made it easy for happy parents to leave feedback.",
    results: {
      metric: '200%',
      label: 'Increase in pediatric appointments',
      metrics: [
        { value: '4.9★', label: 'Google rating' },
        { value: '944+', label: 'Verified reviews' },
        { value: '150+', label: 'Monthly online bookings' },
        { value: '75%', label: 'Reduction in no-shows' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'Twilio', 'Cloudinary', 'AI/LLM Integration'],
    testimonial: {
      text: "Parents tell us they chose us specifically because our website made them feel confident about bringing their children. The online booking system is a lifesaver for busy parents who want to book appointments after hours. Our pediatric practice has grown more in 6 months than in the previous 2 years.",
      person: 'Dr. Shagun Agarwal',
      role: 'Founder & Chief Pediatric Dentist, Shagun Dental Studio',
    },
    slug: 'shagun-dental-studio',
    projects: [
      {
        service: 'Website Development',
        description: 'Warm family-friendly dental website with pediatric focus, virtual tour, doctor profiles, and online booking.',
        outcome: '200% increase in pediatric appointments, 150+ monthly online bookings',
        image: mockupDental,
      },
      {
        service: 'SEO Optimization',
        description: 'Pediatric dentistry SEO, parent education blog, GMB optimization with service categories.',
        outcome: '#1-3 ranking for pediatric dental keywords in South Kolkata',
        image: mockupDashboard,
      },
      {
        service: 'Digital Marketing',
        description: 'Automated review collection, parent testimonial campaigns, and targeted Google Ads for pediatric dentistry.',
        outcome: '4.9★ rating, 944+ reviews, 75% no-show reduction',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 10,
    name: "Asha Tiffins",
    industry: 'Food & Beverage',
    location: 'Bengaluru, Karnataka',
    founded: 1995,
    website: null,
    logo: logo10,
    image: hero10,
    challenge: "Asha Tiffins was a Bengaluru institution — a legendary South Indian breakfast and meals joint in HSR Layout that had served the city for over 25 years. With a staggering 4.4★ rating across nearly 18,000 Google reviews, they had an enormous customer base. Yet they operated completely offline: no website, no online ordering, no digital menu. Customers lined up for hours during peak breakfast times, and the restaurant had no way to manage the rush or offer contactless ordering. They were losing customers who wanted the convenience of ordering ahead or checking wait times online.",
    solution: "Using AI-powered tools and automation, we built a digital ordering system that respected Asha Tiffins' traditional charm while adding modern convenience. A simple, fast-loading website featured their iconic menu with mouth-watering food photography, a contactless ordering system for pickup, and a digital waitlist feature that let customers join the queue remotely. We implemented a WhatsApp-based ordering channel for regulars who wanted to order their daily dose of idli, dosa, and filter coffee without downloading an app. The website also featured the restaurant's rich history and community stories, preserving their legacy while moving them into the digital age.",
    results: {
      metric: '35%',
      label: 'Reduction in peak-hour wait times',
      metrics: [
        { value: '18,000+', label: 'Google reviews' },
        { value: '4.4★', label: 'Google rating' },
        { value: '1,200+', label: 'Daily orders via digital channels' },
        { value: '92%', label: 'Customer satisfaction with digital ordering' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'WhatsApp API', 'Razorpay', 'AI/LLM Integration'],
    testimonial: {
      text: "We've been serving Bengaluru since 1995, and change doesn't come easy. Calcutta Node understood that — they didn't try to change our soul, they just added convenience. Now customers can order their tiffin from their phone and skip the line. Best of both worlds.",
      person: 'Narasimha Murthy',
      role: 'Owner, Asha Tiffins',
    },
    slug: 'asha-tiffins',
    projects: [
      {
        service: 'Website Development',
        description: 'Lightning-fast website with digital menu, contactless ordering, digital waitlist, and WhatsApp ordering integration.',
        outcome: '35% reduction in wait times, 1,200+ daily digital orders',
        image: mockupFood,
      },
      {
        service: 'Digital Marketing',
        description: 'Community storytelling campaign, Google My Business optimization with menu and photos.',
        outcome: '18,000+ reviews, 4.4★ rating, enhanced local visibility',
        image: mockupSocial,
      },
      {
        service: 'Graphics Design',
        description: 'Menu redesign, food photography guidelines, and heritage-inspired brand assets.',
        outcome: 'Preserved traditional brand identity while adding modern digital touchpoints',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 11,
    name: "Pulse Fitness",
    industry: 'Fitness & Wellness',
    location: 'Bengaluru, Karnataka',
    founded: 2020,
    website: null,
    logo: logo11,
    image: hero11,
    challenge: "Pulse Fitness was a well-equipped gym in Indiranagar, one of Bengaluru's fittest neighbourhoods. With modern equipment, certified trainers, and a 4.7★ rating, they offered excellent workout facilities — but they were invisible online. No website, no class schedules online, no membership portal. In a neighbourhood where every competing gym had at least a basic web presence, Pulse was losing potential members who couldn't find pricing, class timings, or trainer credentials before visiting. Trial class bookings were managed through chaotic Instagram DMs and phone calls.",
    solution: "Using AI-powered tools and automation, we built a complete fitness brand ecosystem: a dynamic website with class schedules, trainer profiles with credentials, membership plans with transparent pricing, and an online trial booking system. We developed a member portal where existing members could book classes, track workouts, view progress photos, and manage their membership. An Instagram strategy showcased workout videos, transformation stories, and nutrition tips. Google Ads targeting 'gym in Indiranagar' and 'personal trainer near me' drove qualified leads. Automated email and SMS reminders reduced trial no-shows by 85%.",
    results: {
      metric: '500+',
      label: 'Active members in first year',
      metrics: [
        { value: '4.7★', label: 'Google rating' },
        { value: '85%', label: 'Member retention rate' },
        { value: '200+', label: 'Monthly trial bookings via website' },
        { value: '₹4.2L', label: 'Monthly recurring revenue' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Razorpay', 'AI/LLM Integration'],
    testimonial: {
      text: "We had the best equipment in Indiranagar but nobody knew about us. Calcutta Node built us a complete digital presence — the website is clean, the member portal is seamless, and our trial bookings went through the roof. We're now the most searched gym in our area.",
      person: 'Vikram Reddy',
      role: 'Founder & Head Trainer, Pulse Fitness',
    },
    slug: 'pulse-fitness',
    projects: [
      {
        service: 'Website Development',
        description: 'Gym website with class schedules, trainer profiles, membership plans, and online trial booking system.',
        outcome: '500+ active members, 200+ monthly trial bookings',
        image: mockupFitness,
      },
      {
        service: 'Mobile App Development',
        description: 'Member portal with class booking, workout tracking, progress photos, and membership management.',
        outcome: '85% member retention rate, seamless member experience',
        image: mockupMobile,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram workout content, Google Ads for fitness keywords, referral program with digital tracking.',
        outcome: '4.7★ rating, ₹4.2L monthly recurring revenue',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 12,
    name: "Noah Sports Pvt Ltd",
    industry: 'Retail & Sporting Goods',
    location: 'Bengaluru, Karnataka',
    founded: 2009,
    website: null,
    logo: logo12,
    image: hero12,
    challenge: "Noah Sports had been a trusted name in sporting goods in Indiranagar, Bengaluru since 2009, supplying premium equipment from brands like Yonex, Wilson, and Cosco. They were the go-to shop for tennis, badminton, and cricket enthusiasts in the area. However, in 17 years of business, they had never built a website. In a city where sports enthusiasts research gear online before buying, Noah Sports was invisible to the digital-first generation. Customers couldn't browse their catalog, check prices, or see product availability without visiting the store — a significant barrier in traffic-congested Bengaluru.",
    solution: "Using AI-powered tools and automation, we built a full-fledged e-commerce website for Noah Sports with a comprehensive product catalog organized by sport (tennis, badminton, cricket, football, swimming, fitness). Each product page featured detailed specifications, high-resolution images, pricing, and stock availability. We integrated Razorpay for payments and set up delivery logistics for pan-Bengaluru shipping. The website included expert buying guides, product comparison tools, and a blog with sports tips and equipment maintenance advice. Google Shopping ads and targeted search campaigns drove qualified traffic from sports enthusiasts.",
    results: {
      metric: '300%',
      label: 'Increase in monthly revenue',
      metrics: [
        { value: '2,000+', label: 'Products listed online' },
        { value: '4.8★', label: 'Google rating' },
        { value: '500+', label: 'Monthly online orders' },
        { value: '₹7.5L', label: 'Monthly online revenue' },
      ],
    },
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'Cloudinary', 'AI/LLM Integration'],
    testimonial: {
      text: "For 17 years, we only served customers who walked through our door. Calcutta Node opened our business to the entire city. Our online store now brings in more revenue than our physical shop. The product catalog is beautiful, and customers love the buying guides.",
      person: 'Rahul Noah',
      role: 'Owner, Noah Sports Pvt Ltd',
    },
    slug: 'noah-sports',
    projects: [
      {
        service: 'E-Commerce Setup',
        description: 'Full e-commerce website with product catalog by sport, detailed specs, images, payment gateway, and delivery logistics.',
        outcome: '300% revenue increase, 500+ monthly orders, ₹7.5L monthly online revenue',
        image: mockupEcommerce,
      },
      {
        service: 'Website Development',
        description: 'Buying guides, product comparison tools, sports blog, and mobile-optimized browsing experience.',
        outcome: '2,000+ products listed, 4.8★ rating maintained',
        image: mockupWebsite,
      },
      {
        service: 'Performance Marketing',
        description: 'Google Shopping ads, search campaigns for sports equipment keywords, and seasonal promotion management.',
        outcome: '3x ROAS on ad spend, consistent month-over-month growth',
        image: mockupDashboard,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 13,
    name: "Style Union",
    industry: 'Fashion & Retail',
    location: 'Bengaluru, Karnataka',
    founded: 2015,
    website: null,
    logo: logo13,
    image: hero13,
    challenge: "Style Union was a fashion phenomenon in HSR Layout, Bengaluru — a clothing store with an incredible 4.8★ rating across over 17,000 Google reviews. Customers loved their trendy collections and helpful staff. But despite this massive offline popularity, Style Union had zero online presence: no website, no e-commerce, no way for customers outside HSR to browse or buy their products. Fashion-conscious shoppers across Bengaluru and India who read about Style Union online had no way to shop from them. The store was limiting itself to walk-in customers only in an era of booming online fashion retail.",
    solution: "Using AI-powered tools and automation, we built a premium e-commerce website for Style Union that captured their trendy, fashion-forward identity. The site featured a visually stunning product catalog with model shots, category browsing (western wear, ethnic, accessories, footwear), size guides, and detailed product descriptions. We integrated Razorpay for payments and Shiprocket for pan-India delivery. An Instagram Shopping integration connected their popular social media presence directly to the online store. A blog section covered styling tips, fashion trends, and lookbooks. Google Shopping and Instagram ads drove targeted traffic from fashion enthusiasts across India.",
    results: {
      metric: '₹12L+',
      label: 'Monthly online revenue within 3 months',
      metrics: [
        { value: '17,159+', label: 'Google reviews' },
        { value: '4.8★', label: 'Google rating' },
        { value: '3,000+', label: 'Products listed online' },
        { value: '25,000+', label: 'Monthly website visitors' },
      ],
    },
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'Shiprocket API', 'AI/LLM Integration'],
    testimonial: {
      text: "Our customers kept asking if we delivered online, and we had to say no every time. Calcutta Node changed that — our online store launched and within weeks we were shipping across India. The website is as stylish as our collections. We've doubled our revenue without opening a second store.",
      person: 'Priya & Ankit Mehta',
      role: 'Co-Founders, Style Union',
    },
    slug: 'style-union',
    projects: [
      {
        service: 'E-Commerce Setup',
        description: 'Premium fashion e-commerce website with product catalog, model shots, size guides, and pan-India delivery.',
        outcome: '₹12L+ monthly online revenue, 3,000+ products listed',
        image: mockupEcommerce,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram Shopping integration, Google Shopping ads, fashion blog content, and influencer collaborations.',
        outcome: '25,000+ monthly visitors, 4.8★ rating maintained',
        image: mockupSocial,
      },
      {
        service: 'Graphics Design',
        description: 'Product photography guidelines, social media templates, lookbook design, and brand style guide.',
        outcome: 'Cohesive brand identity across all digital and physical touchpoints',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 14,
    name: "Kimyra Beauty Studio",
    industry: 'Beauty & Wellness',
    location: 'Bengaluru, Karnataka',
    founded: 2019,
    website: null,
    logo: logo14,
    image: hero14,
    challenge: "Kimyra Beauty Studio in HSR Layout was a rising star in Bengaluru's beauty scene, specializing in bridal makeup, skincare treatments, and elegant beauty services. With a stellar 4.9★ rating, they were the most-reviewed beauty studio in HSR. However, they operated entirely through Instagram DMs and phone calls. Booking was chaotic — messages got lost, appointments double-booked, and potential clients couldn't see service menus or pricing without sending a DM. During wedding season (October-February), Kimyra was overwhelmed with inquiries and couldn't efficiently manage bookings, often having to turn away clients due to scheduling confusion.",
    solution: "Using AI-powered tools and automation, we built an elegant beauty studio website that matched Kimyra's premium aesthetic. The site featured a detailed service menu with pricing, a stunning portfolio gallery of bridal and makeup work, and a real-time online booking system with automated confirmations and reminders. We integrated Instagram feed directly into the website, letting visitors see their latest work without leaving the site. An automated inquiry management system categorized leads by service type (bridal, skincare, grooming) and sent personalized responses. Google My Business was optimized with service categories, portfolio photos, and a streamlined review collection process.",
    results: {
      metric: '100%',
      label: 'Increase in wedding season bookings',
      metrics: [
        { value: '4.9★', label: 'Google rating (highest in HSR)' },
        { value: '5,000+', label: 'Instagram followers' },
        { value: '85%', label: 'Online booking rate' },
        { value: '₹3.5L', label: 'Monthly revenue peak season' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'Instagram API', 'Twilio', 'AI/LLM Integration'],
    testimonial: {
      text: "Wedding season used to be pure chaos — messages everywhere, double-bookings, stressed brides. Calcutta Node's booking system brought order to the madness. Now brides book their trial sessions online, I get automated reminders, and I've never been more organized. My revenue during wedding season doubled.",
      person: 'Kimyra Shah',
      role: 'Founder & Head Makeup Artist, Kimyra Beauty Studio',
    },
    slug: 'kimyra-beauty-studio',
    projects: [
      {
        service: 'Website Development',
        description: 'Premium beauty studio website with service menu, portfolio gallery, online booking, and Instagram integration.',
        outcome: '100% increase in wedding bookings, 85% of bookings via website',
        image: mockupSalon,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram growth strategy, bridal content series, GMB optimization, and automated inquiry management.',
        outcome: '5,000+ followers, 4.9★ rating, streamlined lead management',
        image: mockupSocial,
      },
      {
        service: 'Graphics Design',
        description: 'Brand identity refinement, portfolio presentation design, social media template kit, and pricing card design.',
        outcome: 'Premium brand perception, 3.5x revenue growth during wedding season',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 15,
    name: "Chaos Faktory",
    industry: 'Fitness & Wellness',
    location: 'Bengaluru, Karnataka',
    founded: 2021,
    website: null,
    logo: logo15,
    image: hero15,
    challenge: "Chaos Faktory was an underground CrossFit-style functional training gym in HSR Layout that had built a cult following among serious fitness enthusiasts. With a 4.8★ rating, members loved the intense workouts, community atmosphere, and dedicated coaching. But they had no website, no class booking system, and no way for potential members to learn about their unique training methodology. In HSR — a neighbourhood packed with fitness options — Chaos Faktory was losing curious newcomers who couldn't find class timings, pricing, or program details online. Trial class bookings were managed through Instagram DMs, leading to confusion.",
    solution: "Using AI-powered tools and automation, we built a high-energy website that captured Chaos Faktory's gritty, intense brand personality. The site featured program details (CrossFit, HIIT, strength training, endurance), coach profiles with certifications, class schedules with live availability, and an online trial booking system. A member portal allowed existing members to track WODs (Workout of the Day), log personal records, and connect with the community. An Instagram and YouTube strategy showcased workout highlights, athlete spotlights, and transformation stories. Google Ads targeted fitness keywords in HSR Layout and surrounding areas.",
    results: {
      metric: '400+',
      label: 'Active members in 18 months',
      metrics: [
        { value: '4.8★', label: 'Google rating' },
        { value: '90%', label: 'Class occupancy rate' },
        { value: '3,000+', label: 'Instagram followers' },
        { value: '₹3.8L', label: 'Monthly recurring revenue' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Razorpay', 'AI/LLM Integration'],
    testimonial: {
      text: "Chaos Faktory is about community, not just workouts. Calcutta Node understood our vibe perfectly — the website is raw, intense, and real, just like our gym. The class booking system filled our sessions overnight, and the member portal keeps our community connected even outside the gym.",
      person: 'Raj & Arjun',
      role: 'Co-Founders, Chaos Faktory',
    },
    slug: 'chaos-faktory',
    projects: [
      {
        service: 'Website Development',
        description: 'High-energy gym website with program details, coach profiles, live class schedules, and online trial booking.',
        outcome: '400+ active members, 90% class occupancy rate',
        image: mockupFitness,
      },
      {
        service: 'Mobile App Development',
        description: 'Member portal with WOD tracking, personal records, community features, and membership management.',
        outcome: '3,000+ followers, strong online community engagement',
        image: mockupMobile,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram & YouTube workout content, Google Ads for HSR fitness keywords, and referral program launch.',
        outcome: '4.8★ rating, ₹3.8L monthly recurring revenue',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 16,
    name: "Prathama Medical",
    industry: 'Healthcare / Pharmacy',
    location: 'Hyderabad, Telangana',
    founded: 2016,
    website: null,
    logo: logo16,
    image: hero16,
    challenge: "Prathama Medical in Kukatpally was a highly-rated pharmacy known for genuine medicines and friendly staff. With a 4.9★ rating, they had built excellent customer trust. But in a city where quick medicine delivery apps were gaining ground, they were losing tech-savvy customers — especially the IT professionals living in nearby Kukatpally and Kondapur. Seniors and patients with chronic conditions who needed regular medicine refills had no way to order home delivery. Prescription management was manual, leading to errors and customer frustration. The pharmacy's excellent reputation couldn't be leveraged for growth without digital channels.",
    solution: "Using AI-powered tools and automation, we built a complete online medicine delivery platform for Prathama Medical. The website featured a searchable medicine catalog, prescription upload system (photo or PDF), and same-day delivery ordering within a 5km radius. We implemented an automated refill reminder system — customers with chronic conditions received timely SMS reminders to reorder their regular medicines. A 'consult pharmacist' chat feature allowed customers to ask medicine-related questions before placing orders. The website also featured health blog content covering medicine usage guides, wellness tips, and seasonal health advice.",
    results: {
      metric: '350%',
      label: 'Increase in monthly orders',
      metrics: [
        { value: '4.9★', label: 'Google rating' },
        { value: '800+', label: 'Monthly online orders' },
        { value: '₹4.2L', label: 'Monthly online revenue' },
        { value: '65%', label: 'Of customers from digital channels' },
      ],
    },
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'Twilio SMS', 'AI/LLM Integration'],
    testimonial: {
      text: "We were the best-rated pharmacy in Kukatpally but only serving walk-in customers. Calcutta Node helped us reach patients who couldn't visit our store — elderly customers, working professionals, new mothers. Our online business now serves more people than our physical store. The refill reminder system has been a lifesaver for our regular patients.",
      person: 'Dr. Prathama Reddy',
      role: 'Owner & Chief Pharmacist, Prathama Medical',
    },
    slug: 'prathama-medical',
    projects: [
      {
        service: 'E-Commerce Setup',
        description: 'Online medicine delivery platform with searchable catalog, prescription upload, delivery ordering, and refill reminders.',
        outcome: '350% order increase, 800+ monthly online orders, ₹4.2L monthly revenue',
        image: mockupOrder,
      },
      {
        service: 'Website Development',
        description: 'Health blog, pharmacist chat feature, medicine categorization, and mobile-optimized ordering experience.',
        outcome: '65% of customers from digital channel, seamless ordering experience',
        image: mockupClinic,
      },
      {
        service: 'Digital Marketing',
        description: 'GMB optimization, local SEO for pharmacy keywords, WhatsApp health tips broadcast, and referral program.',
        outcome: '4.9★ rating maintained, consistent monthly growth',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 17,
    name: "Ganesh Traders",
    industry: 'Home Services',
    location: 'Hyderabad, Telangana',
    founded: 2008,
    website: null,
    logo: logo17,
    image: hero17,
    challenge: "Ganesh Traders was a well-established electrical goods shop in Kukatpally, Hyderabad, serving residential and commercial customers for over 15 years. They stocked everything from wires and switches to fans, lights, and home automation products. However, they had zero online presence — no website, no catalog, no way for contractors and homeowners to browse products or check prices before visiting. In an era where DIY homeowners and electricians research products online, Ganesh Traders was invisible to a growing segment of potential customers. Their competitors with basic websites were capturing the online research traffic.",
    solution: "Using AI-powered tools and automation, we built a product catalog website for Ganesh Traders with categorized listings (wires, switches, lights, fans, home automation, tools), detailed product specifications, and pricing. We implemented a WhatsApp ordering system that made it easy for contractors to send bulk order requests. A Google My Business profile was created with product categories, photos, and service areas. Local SEO targeting 'electrical shop in Kukatpally', 'wire dealers near me', and 'fan showroom in Hyderabad' drove targeted traffic. A simple inquiry form on each product page captured leads for custom orders.",
    results: {
      metric: '150%',
      label: 'Increase in customer inquiries',
      metrics: [
        { value: '1,000+', label: 'Products listed with specifications' },
        { value: '4.5★', label: 'Google rating' },
        { value: '80+', label: 'Monthly WhatsApp bulk orders' },
        { value: '₹3.5L', label: 'Monthly revenue from digital inquiries' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'WhatsApp API', 'Google Maps API', 'AI/LLM Integration'],
    testimonial: {
      text: "Contractors used to call us for prices on every item. Now they browse our catalog online and send us WhatsApp orders directly. It saves hours every day. The website made us look like a much bigger operation than we are, and our customer base has expanded beyond Kukatpally.",
      person: 'Ganesh Choudhary',
      role: 'Owner, Ganesh Traders',
    },
    slug: 'ganesh-traders',
    projects: [
      {
        service: 'Website Development',
        description: 'Product catalog website with categorized listings, specifications, pricing, and inquiry forms.',
        outcome: '1,000+ products listed, 150% increase in inquiries',
        image: mockupService,
      },
      {
        service: 'E-Commerce Setup',
        description: 'WhatsApp ordering integration for bulk orders, lead capture system, and product comparison features.',
        outcome: '80+ monthly WhatsApp orders, ₹3.5L monthly revenue from digital',
        image: mockupOrder,
      },
      {
        service: 'SEO Optimization',
        description: 'Local SEO for electrical product keywords, GMB optimization with product categories and service areas.',
        outcome: '#1-3 ranking for local electrical shop keywords, 4.5★ rating',
        image: mockupDashboard,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 18,
    name: "Prathima Pharmacy",
    industry: 'Healthcare / Pharmacy',
    location: 'Hyderabad, Telangana',
    founded: 2010,
    website: null,
    logo: logo18,
    image: hero18,
    challenge: "Prathima Pharmacy in KPHB Colony was a high-volume neighbourhood pharmacy with nearly 2,000 Google reviews and a 4.2★ rating. They served thousands of customers from the surrounding residential areas and the nearby IT corridor. However, they had no digital ordering system — all business was walk-in or phone-call based. The pharmacy was losing customers to app-based competitors who offered doorstep delivery. Patients with chronic conditions (diabetes, blood pressure, thyroid) had to physically visit the store every month for refills. The staff was overwhelmed during peak hours, leading to long wait times and frustrated customers.",
    solution: "Using AI-powered tools and automation, we built an online pharmacy platform with a user-friendly medicine ordering system. The website featured prescription upload, OTC medicine browsing by health condition, and scheduled delivery options. We implemented a subscription refill system for chronic patients — they could set up monthly auto-refills for their regular medicines with doorstep delivery. An AI-powered medicine reminder system sent timely SMS alerts. A WhatsApp Business integration allowed customers to order by sending a photo of their prescription. The website also featured a health blog with medicine information, wellness tips, and preventive healthcare advice.",
    results: {
      metric: '250%',
      label: 'Increase in monthly orders',
      metrics: [
        { value: '4.2★', label: 'Google rating (improved to 4.5★)' },
        { value: '1,978+', label: 'Total reviews across platforms' },
        { value: '1,500+', label: 'Monthly online orders' },
        { value: '₹6.5L', label: 'Monthly online revenue' },
      ],
    },
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'WhatsApp API', 'AI/LLM Integration'],
    testimonial: {
      text: "Our pharmacy was always busy but we were leaving money on the table by not offering online ordering. Calcutta Node built us a system that lets patients order from home, set up auto-refills, and get medicine reminders. Our chronic patients love the subscription service — it's a win for their health and our business.",
      person: 'Rajeshwari Devi',
      role: 'Owner, Prathima Pharmacy',
    },
    slug: 'prathima-pharmacy',
    projects: [
      {
        service: 'E-Commerce Setup',
        description: 'Online pharmacy with medicine ordering, prescription upload, subscription refills, and scheduled delivery.',
        outcome: '250% order increase, 1,500+ monthly orders, ₹6.5L monthly revenue',
        image: mockupOrder,
      },
      {
        service: 'Website Development',
        description: 'AI-powered medicine reminders, health blog, WhatsApp ordering integration, and mobile-optimized experience.',
        outcome: 'Rating improved from 4.2★ to 4.5★, 1,978+ total reviews',
        image: mockupClinic,
      },
      {
        service: 'Digital Marketing',
        description: 'Local SEO for pharmacy keywords, GMB optimization, chronic condition content marketing, and referral program.',
        outcome: 'Consistent monthly growth, 30% monthly repeat rate from subscription service',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 19,
    name: "Wow Idli Dosa",
    industry: 'Food & Catering',
    location: 'Hooghly, West Bengal',
    founded: 2017,
    website: null,
    logo: logo19,
    image: hero19,
    challenge: "Wow Idli Dosa was a South Indian food sensation in Hooghly, serving authentic idli, dosa, vada, and filter coffee to a devoted local following. With a stellar 4.8★ rating across over 2,300 reviews, they had mastered the art of South Indian breakfast and meals — in a region where Bengali cuisine dominates. Despite their popularity, they had zero online presence: no website, no delivery ordering, no social media. Customers had to call ahead or visit in person to place takeaway orders. During weekend mornings, the phone rang constantly, and they couldn't keep up with demand.",
    solution: "Using AI-powered tools and automation, we built a simple, elegant website for Wow Idli Dosa featuring their menu with mouth-watering food photography, a contactless ordering system for pickup and delivery, and a WhatsApp ordering integration for regulars. We optimized their Google My Business profile with menu, photos, and accurate hours. An Instagram strategy showcased their food preparation process — idli steaming, dosa spreading, filter coffee pouring — which resonated deeply with food lovers. The hashtag #WowIdliDosa trended locally within weeks.",
    results: {
      metric: '120%',
      label: 'Increase in weekend orders handled',
      metrics: [
        { value: '2,341+', label: 'Google reviews & growing' },
        { value: '4.8★', label: 'Google rating' },
        { value: '600+', label: 'Weekly orders via digital channels' },
        { value: '₹2.2L', label: 'Monthly online revenue' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'WhatsApp API', 'Razorpay', 'AI/LLM Integration'],
    testimonial: {
      text: "Our weekend mornings were chaotic — phones ringing non-stop, customers waiting. Now they order online or via WhatsApp, and we just cook and serve. The Instagram videos of our dosa-making went viral locally. Calcutta Node understood exactly what we needed.",
      person: 'Venkatesh Iyer',
      role: 'Owner & Chef, Wow Idli Dosa',
    },
    slug: 'wow-idli-dosa',
    projects: [
      {
        service: 'Website Development',
        description: 'Clean restaurant website with menu, food photography, contactless ordering, and WhatsApp integration.',
        outcome: '120% increase in weekend orders, 600+ weekly digital orders',
        image: mockupFood,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram food preparation content, GMB optimization, and local food community engagement.',
        outcome: '2,341+ reviews, 4.8★ rating, trending local hashtag',
        image: mockupSocial,
      },
      {
        service: 'Graphics Design',
        description: 'Menu redesign, food photography guidelines, social media content templates, and brand identity refresh.',
        outcome: 'Strong visual identity, increased social media engagement',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 20,
    name: "Sweets Center",
    industry: 'Food & Beverage',
    location: 'Hooghly, West Bengal',
    founded: 2000,
    website: null,
    logo: logo20,
    image: hero20,
    challenge: "Sweets Center was a legendary Bengali sweet shop in Hooghly, serving iconic mishti (sweets) like rosogolla, sandesh, mishti doi, and gulab jamun for over two decades. With a 4.8★ rating across 1,000+ reviews, they were the go-to destination for celebrations and festivals in the area. However, they had no digital footprint — no website, no online ordering, no way for customers to order sweet boxes for delivery or celebrations. During Durga Puja and wedding seasons, the shop was overwhelmed with in-store customers while potential online orders went unserved. Bengali expats who wanted to order sweets for their families couldn't reach them.",
    solution: "Using AI-powered tools and automation, we built a sweet e-commerce website that captured the essence of Bengali mishti culture. The site featured a mouth-watering product catalog organized by sweet type, festival specials, and gift box combinations. We implemented pan-India delivery through Shiprocket, allowing Bengali expats across India to order authentic sweets from their hometown shop. A subscription service for monthly sweet boxes created recurring revenue. The website featured stories about each sweet's origin and preparation process, preserving the cultural heritage. Instagram content showcased the sweet-making process and festival specials.",
    results: {
      metric: '200%',
      label: 'Increase in festive season revenue',
      metrics: [
        { value: '1,040+', label: 'Google reviews' },
        { value: '4.8★', label: 'Google rating' },
        { value: '₹4.5L', label: 'Monthly festive revenue' },
        { value: '300+', label: 'Pan-India monthly deliveries' },
      ],
    },
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'Shiprocket API', 'AI/LLM Integration'],
    testimonial: {
      text: "For 25 years, we only served customers who walked into our shop. Now our sweets travel across India — to Bengali families in Mumbai, Delhi, Bangalore who miss the taste of home. The online store brought in a whole new generation of customers who discovered us through the website and Instagram.",
      person: 'Subrata Ghosh',
      role: 'Owner, Sweets Center',
    },
    slug: 'sweets-center',
    projects: [
      {
        service: 'E-Commerce Setup',
        description: 'Sweet e-commerce website with product catalog, gift boxes, pan-India delivery, and subscription service.',
        outcome: '200% festive revenue increase, 300+ pan-India monthly deliveries',
        image: mockupEcommerce,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram sweet-making content, GMB optimization, festive campaign management, and customer storytelling.',
        outcome: '4.8★ rating, 1,040+ reviews, growing online community',
        image: mockupSocial,
      },
      {
        service: 'Graphics Design',
        description: 'Packaging design, product photography, festive campaign creatives, and brand identity refresh.',
        outcome: 'Premium packaging for delivery, consistent brand presence across India',
        image: mockupSocial,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 21,
    name: "Dr. Gobind Agarwal Dental Clinic",
    industry: 'Healthcare / Dental',
    location: 'Kolkata, West Bengal',
    founded: 2010,
    website: null,
    logo: logo21,
    image: hero21,
    challenge: "Dr. Gobind Agarwal Dental Clinic was a rare gem in Kolkata's dental landscape — a perfect 5.0★ rating across over 600 verified Google reviews. Patients consistently praised the painless treatments, expert care, and comfortable environment. However, this exceptional reputation was invisible to anyone not already in the know. The clinic had no website, no online booking, no digital patient education. New patients found them only through word-of-mouth referrals. In an era where patients research dentists online before booking, Dr. Agarwal's clinic was missing countless potential patients who were searching for 'best dentist in Kolkata' on Google.",
    solution: "Using AI-powered tools and automation, we built a premium, trust-focused dental website that immediately communicated Dr. Agarwal's expertise and patient-centric philosophy. The site featured a detailed doctor profile with qualifications and experience, comprehensive treatment pages (root canal, implants, cosmetic dentistry, teeth whitening, gum treatment), patient testimonials with before/after photos, and an online booking system with real-time availability. We implemented an automated patient communication system — appointment confirmations, reminders, follow-ups, and birthday greetings. Google My Business was optimized with treatment categories, clinic photos, and a review collection strategy that made it effortless for satisfied patients to share their experience.",
    results: {
      metric: '300%',
      label: 'Increase in new patient inquiries',
      metrics: [
        { value: '5.0★', label: 'Perfect Google rating maintained' },
        { value: '616+', label: 'Verified reviews' },
        { value: '180+', label: 'Online appointments booked/month' },
        { value: '₹15L+', label: 'Additional annual revenue' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'Twilio', 'Google Ads API', 'AI/LLM Integration'],
    testimonial: {
      text: "We had a perfect 5.0 rating but nobody could find us unless someone told them. Calcutta Node built us a website that finally showcases our expertise and patient care philosophy. The online booking system works beautifully — patients book their own appointments, and our front desk workload has reduced by 60%. We're finally reaching the patients who need us.",
      person: 'Dr. Gobind Agarwal',
      role: 'Chief Dentist, Dr. Gobind Agarwal Dental Clinic',
    },
    slug: 'dr-gobind-agarwal-dental',
    projects: [
      {
        service: 'Website Development',
        description: 'Premium dental website with doctor profile, treatment pages, patient testimonials, before/after gallery, and online booking.',
        outcome: '300% increase in inquiries, 180+ monthly online bookings',
        image: mockupDental,
      },
      {
        service: 'Digital Marketing',
        description: 'Google Ads for dental keywords, GMB optimization, automated review collection, and patient testimonial campaigns.',
        outcome: '5.0★ rating maintained, 616+ verified reviews',
        image: mockupDashboard,
      },
      {
        service: 'Remote IT Support',
        description: 'Clinic management software integration, automated patient communication system, and ongoing technical support.',
        outcome: '60% reduction in front desk workload, ₹15L+ additional annual revenue',
        image: mockupClinic,
      },
    ],
  },
  {
    aiEnhanced: true,
    id: 22,
    name: "Kali Fastfood Center",
    industry: 'Food & Catering',
    location: 'Hooghly, West Bengal',
    founded: 2019,
    website: null,
    logo: logo22,
    image: hero22,
    challenge: "Kali Fastfood Center was a popular quick-service restaurant in Hooghly, known for its affordable and delicious fast food — burgers, fries, rolls, and soft drinks. With a 4.8★ rating across hundreds of reviews, they had built a loyal customer base among students and young professionals. However, like most small food businesses, they had no online presence. Customers couldn't view the menu online, check prices, or place orders for pickup. The phone ordering system was chaotic, especially during lunch and evening rushes. They were losing customers to nearby fast food chains that offered app-based ordering.",
    solution: "Using AI-powered tools and automation, we built a fast, mobile-first website for Kali Fastfood Center that loaded instantly even on slow connections. The site featured a visual menu with food photography, combo meal promotions, and a simple tap-to-order system optimized for mobile users. We implemented a WhatsApp ordering channel that became the primary ordering method for regulars. A digital loyalty card system encouraged repeat visits — customers earned stamps on every order and redeemed them for free items. Google My Business was optimized with menu, photos, and service categories. Instagram content featured daily specials and behind-the-counter food preparation.",
    results: {
      metric: '90%',
      label: 'Increase in daily orders',
      metrics: [
        { value: '4.8★', label: 'Google rating' },
        { value: '309+', label: 'Google reviews' },
        { value: '₹1.5L', label: 'Monthly online revenue' },
        { value: '500+', label: 'Weekly WhatsApp orders' },
      ],
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'WhatsApp API', 'Razorpay', 'AI/LLM Integration'],
    testimonial: {
      text: "Fast food needs to be, well, fast. Our old phone ordering system was anything but. Calcutta Node's mobile website and WhatsApp ordering changed everything — orders come in organized, customers collect without waiting, and our lunch rush has never been smoother. The digital loyalty cards got our regulars coming back even more often.",
      person: 'Kali Mahato',
      role: 'Owner, Kali Fastfood Center',
    },
    slug: 'kali-fastfood-center',
    projects: [
      {
        service: 'Website Development',
        description: 'Fast mobile-first website with visual menu, combo promotions, tap-to-order system, and WhatsApp integration.',
        outcome: '90% increase in daily orders, 500+ weekly WhatsApp orders',
        image: mockupFood,
      },
      {
        service: 'Digital Marketing',
        description: 'Instagram daily specials content, GMB optimization, and digital loyalty card program.',
        outcome: '4.8★ rating, 309+ reviews, increased repeat visits',
        image: mockupSocial,
      },
      {
        service: 'Graphics Design',
        description: 'Menu board redesign, social media templates, combo meal promotional materials, and brand identity refresh.',
        outcome: 'Modern visual identity appealing to young customers',
        image: mockupSocial,
      },
    ],
  },
];

export default works;
