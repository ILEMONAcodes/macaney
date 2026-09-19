export const SERVICES = [
  {
    name: 'Commercial Apiary Setup & Management',
    description: 'Plan, establish, and manage productive apiaries with practical systems built for African landscapes and commercial goals.',
    icon: 'hive',
  },
  {
    name: 'Smart Hive & AgTech Advisory',
    description: 'Use thoughtful hive monitoring, field data, and modern tools to make better decisions for every colony.',
    icon: 'sparkles',
  },
  {
    name: 'Cooperative & Community Training',
    description: 'Equip groups with clear, hands-on beekeeping knowledge that creates stronger local enterprises and livelihoods.',
    icon: 'users',
  },
  {
    name: 'Wholesale Bee Products Supply (Honey, Beeswax, Propolis)',
    description: 'Source dependable, quality bee products with the traceability and care your business or programme requires.',
    icon: 'package',
  },
  {
    name: 'General Apiculture Consultation',
    description: 'Get clear direction for the question in front of you—from colony care and harvests to your next big idea.',
    icon: 'message',
  },
] as const;

export type Service = (typeof SERVICES)[number];
