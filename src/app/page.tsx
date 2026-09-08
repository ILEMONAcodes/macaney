import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/layout/Hero';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero />
    </main>
  );
}