export const SERVICES = [
  {
    name: 'Commercial Apiary Setup & Management',
    description: 'Plan, establish, and manage productive apiaries with practical systems built for African landscapes and commercial goals.',
    icon: 'hive',
    image: '/images/beeess.png',
    imageAlt: 'Beekeepers tending wooden hives in a sunny apiary',
  },
  {
    name: 'Smart Hive & AgTech Advisory',
    description: 'Use thoughtful hive monitoring, field data, and modern tools to make better decisions for every colony.',
    icon: 'sparkles',
    image: '/images/beeai.png',
    imageAlt: 'A smart bee illustration representing agtech advisory',
  },
  {
    name: 'Cooperative & Community Training',
    description: 'Equip groups with clear, hands-on beekeeping knowledge that creates stronger local enterprises and livelihoods.',
    icon: 'users',
    image: '/Abtimages/20240516_131820-e1763943642627-768x576.jpg',
    imageAlt: 'A group of beekeeping trainees in protective suits',
  },
  {
    name: 'Wholesale Bee Products Supply (Honey, Beeswax, Propolis)',
    description: 'Source dependable, quality bee products with the traceability and care your business or programme requires.',
    icon: 'package',
    image: '/Abtimages/WhatsApp-Image-2025-11-13-at-4.11.39-PM.jpeg',
    imageAlt: 'Locally produced blocks of beeswax ready for supply',
  },
  {
    name: 'General Apiculture Consultation',
    description: 'Get clear direction for the question in front of you—from colony care and harvests to your next big idea.',
    icon: 'message',
    image: '/Abtimages/chaa.jpeg',
    imageAlt: 'Beekeepers receiving practical field guidance',
  },
] as const;

export type Service = (typeof SERVICES)[number];
