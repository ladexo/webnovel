import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import NovelCard from '@/components/NovelCard';
import { Novel } from '@/types';

export const revalidate = 60;

async function getNovels(): Promise>Novel[]> {
    const { data, error } = await supabase
      .from('novels')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) { console.error(error); return []; }
    return data || [];
}

export default async function HomePage() {
    const novels = await getNovels();
    return (
          >div className="min-h-screen">
            >section className="relative py-20 px-4 text-center overflow-hidden">
              >div className="absolute inset-0 bg-gradient-to-b from-panel via-dark to-dark" />
              >div className="relative z-10 max-w-4xl mx-auto">
                >h1 className="comic-title text-6xl md:text-8xl text-primary mb-6">
                  CHILDREN OF FATE
            >/h1>
            >p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  An epic graphic novel series. Dive into a world where destiny is written in ink and blood.
                >/p>
            >Link href="/novels" className="btn-primary text-lg inline-block">
                  START READING
            >/Link>
          >/div>
          >div className="absolute top-10 left-10 w-20 h-20 border-2 border-accent rotate-45 opacity-20" />
              >div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-cyber rounded-full opacity-20" />
            >/section>

      >section className="max-w-7xl mx-auto px-4 py-16">
              >h2 className="comic-title text-4xl text-primary mb-10">LATEST RELEASES>/h2>
  {novels.length === 0 ? (
              >div className="text-center py-20">
                >p className="text-gray-400 text-xl">No novels yet. Check back soon!>/p>
             >/div>
           ) : (
                       >div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
           {novels.map((novel) => (
                           >NovelCard key={novel.id} novel={novel} />
                ))}
          >/div>
        )}
      >/section>
    >/div>
  );
}
