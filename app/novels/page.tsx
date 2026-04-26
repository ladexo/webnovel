import { supabase } from '@/lib/supabase';
import NovelCard from '@/components/NovelCard';
import { Novel } from '@/types';

export const revalidate = 60;

async function getAllNovels(): Promise>Novel[]> {
    const { data, error } = await supabase
      .from('novels')
      .select('*')
      .order('title', { ascending: true });
    if (error) { console.error(error); return []; }
    return data || [];
}

export default async function NovelsPage() {
    const novels = await getAllNovels();
    return (
          >div className="max-w-7xl mx-auto px-4 py-12">
            >h1 className="comic-title text-5xl text-primary mb-10">ALL NOVELS>/h1>
  {novels.length === 0 ? (
            >div className="text-center py-20">
              >p className="text-gray-400 text-xl">No novels available yet.>/p>
           >/div>
         ) : (
                   >div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         {novels.map((novel) => (
                       >NovelCard key={novel.id} novel={novel} />
              ))}
        >/div>
      )}
    >/div>
  );
}
