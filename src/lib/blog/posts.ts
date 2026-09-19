export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  content: ArticleBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-a-resilient-apiary-from-the-ground-up',
    title: 'Building a resilient apiary from the ground up',
    excerpt: 'A practical framework for choosing a site, establishing healthy colonies, and designing an apiary that can thrive through changing seasons.',
    category: 'Field guide',
    publishedAt: 'September 12, 2026',
    readingTime: '8 min read',
    image: '/Abtimages/20240516_131820-e1763943642627-768x576.jpg',
    imageAlt: 'A Macaney beekeeper working with a hive outdoors',
    featured: true,
    content: [
      { type: 'paragraph', text: 'A successful apiary starts long before the first colony arrives. The strongest operations are planned around the landscape: reliable forage, clean water, protection from harsh weather, and access that makes calm, regular inspections possible.' },
      { type: 'paragraph', text: 'For beekeepers across Africa, resilience is more than a nice idea. It means building a system that can handle a dry spell, a sudden nectar flow, or a busy harvest week without putting colony health at risk.' },
      { type: 'heading', text: 'Start with the landscape, not the equipment' },
      { type: 'paragraph', text: 'Spend time observing a potential location. Look for flowering plants across more than one season, a water source that does not force bees across a neighbour’s path, and a position with morning sun and relief from the hottest afternoon exposure. A simple site assessment is one of the highest-value decisions a new beekeeper can make.' },
      { type: 'list', items: ['Choose a dry, well-drained position with a clear flight path.', 'Place hives where they receive gentle morning light and natural wind protection.', 'Map nearby nectar and pollen sources through both wet and dry seasons.', 'Plan a clean, quiet route for inspections and honey harvesting.'] },
      { type: 'heading', text: 'Build systems your bees can rely on' },
      { type: 'paragraph', text: 'Consistency matters. Standardise hive placement, label every colony, and keep notes after each inspection. Records turn everyday observations into useful decisions: which colonies build fastest, when swarming pressure rises, and where additional feeding or shade may be needed.' },
      { type: 'quote', text: 'Healthy colonies are not managed by guesswork. They are supported by small, timely decisions made throughout the season.' },
      { type: 'paragraph', text: 'As the apiary grows, resist the urge to add hives faster than your management routine can support. A smaller, well-observed apiary produces better learning—and often better honey—than a larger one that is rarely inspected.' },
      { type: 'heading', text: 'Measure progress in colony health' },
      { type: 'paragraph', text: 'Honey is an important outcome, but it is not the only measure of progress. Brood pattern, food stores, queen performance, pest pressure, and colony temperament provide an earlier picture of how the operation is doing. Prioritising these signals helps protect both this season’s harvest and next season’s colonies.' },
    ],
  },
  {
    slug: 'the-seasonal-checklist-for-healthy-colonies',
    title: 'The seasonal checklist for healthy colonies',
    excerpt: 'Use a calm, repeatable inspection rhythm to spot changes early and give every colony the care it needs.',
    category: 'Colony care',
    publishedAt: 'August 28, 2026',
    readingTime: '6 min read',
    image: '/Abtimages/chaa.jpeg',
    imageAlt: 'Beekeepers learning in an apiary',
    content: [
      { type: 'paragraph', text: 'Regular inspections are how beekeepers learn the language of their colonies. They reveal patterns in brood, stores, temperament, and activity long before a problem becomes a loss.' },
      { type: 'heading', text: 'Inspect with a purpose' },
      { type: 'paragraph', text: 'Open a hive with a few clear questions in mind: Is the queen laying well? Does the colony have enough food? Is there room to grow? Are there signs of pests, disease, or crowding? A focused inspection is gentler on bees and more useful for the beekeeper.' },
      { type: 'list', items: ['Observe flight activity before opening the hive.', 'Work slowly and use smoke sparingly.', 'Check brood, stores, and space in the same order each time.', 'Record action points while the inspection is fresh.'] },
      { type: 'paragraph', text: 'Adjust the rhythm to local weather and forage. During intense flows, colonies may need more frequent space checks. During lean periods, minimise disturbance and make sure stores are adequate.' },
    ],
  },
  {
    slug: 'from-hive-to-market-earning-trust-with-every-jar',
    title: 'From hive to market: earning trust with every jar',
    excerpt: 'Good honey deserves a thoughtful route to market—one that protects quality, tells a clear story, and creates repeat customers.',
    category: 'Honey business',
    publishedAt: 'August 10, 2026',
    readingTime: '7 min read',
    image: '/Abtimages/WhatsApp-Image-2025-11-13-at-4.11.37-PM.jpeg',
    imageAlt: 'Macaney team member presenting honey products',
    content: [
      { type: 'paragraph', text: 'A jar of honey carries the work of healthy colonies, careful harvests, and a producer’s reputation. Customers may first be drawn by the colour or label, but they return when every part of the experience feels trustworthy.' },
      { type: 'heading', text: 'Protect quality at harvest' },
      { type: 'paragraph', text: 'Harvest only mature, capped honey whenever possible. Keep tools and containers clean, separate honey from strong odours, and filter gently to remove wax particles without stripping away the character customers value.' },
      { type: 'heading', text: 'Make your story easy to understand' },
      { type: 'paragraph', text: 'Clear labelling gives customers confidence. Include the product name, net weight, harvest or batch information, producer contact details, and simple storage guidance. If your honey comes from a distinct local landscape, explain that connection in language people can understand.' },
      { type: 'quote', text: 'The best brand promise is a product that feels as considered on the shelf as it was in the apiary.' },
    ],
  },
  {
    slug: 'why-pollinators-belong-at-the-centre-of-farm-planning',
    title: 'Why pollinators belong at the centre of farm planning',
    excerpt: 'Small habitat choices can support bees, strengthen crops, and make farms more productive over the long term.',
    category: 'Sustainability',
    publishedAt: 'July 22, 2026',
    readingTime: '5 min read',
    image: '/Abtimages/chhh.jpg',
    imageAlt: 'A beekeeping training session in a green outdoor setting',
    content: [
      { type: 'paragraph', text: 'Bees are partners in a living farm system. When farms offer diverse flowering plants, water, and safer places to forage, they support more than honey production—they support the pollination relationships that many crops depend on.' },
      { type: 'heading', text: 'Design for forage across the year' },
      { type: 'paragraph', text: 'A few carefully selected flowering trees, hedgerows, and cover crops can create a more dependable food landscape for pollinators. Aim for variety in bloom times rather than one dramatic flowering moment.' },
      { type: 'list', items: ['Retain useful flowering trees and native vegetation where possible.', 'Plant diverse species with staggered bloom periods.', 'Provide shallow, clean water with safe landing places.', 'Avoid spraying when bees are actively foraging.'] },
      { type: 'paragraph', text: 'These choices are practical investments in a farm’s future. They improve the conditions in which bees, crops, and communities can all flourish.' },
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
