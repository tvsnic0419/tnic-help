import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';

export default function LibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      <ScrollProgress />
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}