export type StoreCategory = 'Honey & bee products' | 'Hives & equipment' | 'Training & courses';

export type StoreProduct = {
  id: string;
  name: string;
  description: string;
  category: StoreCategory;
  price: number;
  compareAtPrice?: number;
  currency: 'NGN';
  imageUrl: string;
  selarUrl: string;
};

export const storeProducts: StoreProduct[] = [
  {
    id: 'pure-honey',
    name: '100% Pure Raw Honey',
    description: 'Raw, undiluted honey sourced from ethical beekeepers. Available in 50cl and 1 litre sizes.',
    category: 'Honey & bee products',
    price: 15000,
    currency: 'NGN',
    imageUrl: 'https://files.selar.co/product-images/2026/products/macaneybiogreen/100-pure-honey-selar.com-6aba932d69f27.jpeg',
    selarUrl: 'https://selar.com/q1115xh0w1',
  },
  {
    id: 'langstroth-hive-kit',
    name: '10-Frame Langstroth Beehive Kit',
    description: 'A modular, high-yield hive kit with brood box, honey super, queen excluder, inner cover, and zinc-roofed outer cover.',
    category: 'Hives & equipment',
    price: 120000,
    currency: 'NGN',
    imageUrl: 'https://files.selar.co/product-images/2026/products/macaneybiogreen/10-frame-langstroth-beehi-selar.com-6aba7e2e6aa7a.jpeg',
    selarUrl: 'https://selar.com/110947b665',
  },
  {
    id: 'kenya-top-bar-hive',
    name: 'Kenya Top Bar Hive',
    description: 'A sustainable horizontal hive designed for natural comb building, calmer inspections, and easier harvesting.',
    category: 'Hives & equipment',
    price: 50000,
    currency: 'NGN',
    imageUrl: 'https://files.selar.co/product-images/2026/products/macaneybiogreen/kenya-top-bar-hive-selar.com-6aba715eccd5e.jpeg',
    selarUrl: 'https://selar.com/89j008zb0f',
  },
  {
    id: 'colony-establishment-system',
    name: 'African Controlled Colony Establishment System',
    description: 'A structured beekeeping course covering colony establishment, nectar mapping, quality control, and apiary management.',
    category: 'Training & courses',
    price: 120000,
    currency: 'NGN',
    imageUrl: 'https://files.selar.co/product-images/2026/products/macaneybiogreen/african-controlled-colony-selar.com-6abfcc8c33513.png',
    selarUrl: 'https://selar.com/7721l352h3',
  },
  {
    id: 'advanced-beekeeping-masterclass',
    name: 'Advanced Beekeeping Masterclass',
    description: 'A practical A–Z course in profitable apiary management, hive mastery, colony health, queen rearing, and marketing.',
    category: 'Training & courses',
    price: 13500,
    compareAtPrice: 150000,
    currency: 'NGN',
    imageUrl: 'https://files.selar.co/product-images/2026/products/macaneybiogreen/title-macaney-advanced-be-selar.com-6abfcfde9e74e.jpeg',
    selarUrl: 'https://selar.com/j190b90878',
  },
];