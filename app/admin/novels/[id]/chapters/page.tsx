import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Chapter, Novel } from '@/types';

export const revalidate = 0;

async function getNovel(id: string): Promise<Novel | null> {
  const { data } = await supabase.from('novels').select('*').eq('id', id).single();
  return data;
}

async function getChapters(novelId: string): Promise<Chapter[]> {
  const { data } = await supabase.from('chapters').select('*').eq('novel_id', novelId)
    .order('chapter_number', { ascending: true });
  return data || [];
}

export default async function AdminChaptersPage({ params }: { params: { id: string } }) {
  const novel = await getNovel(params.id);
  const chapters = await getChapters(params.id);
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/novels" className="text-cyber text-sm hover:text-primary">&larr; Back to Novels</Link>
          <h1 className="comic-title text-4xl text-primary mt-2">{novel?.title || 'Novel'} - CHAPTERS</h1>
        </div>
        <Link href={`/admin/novels/${params.id}/chapters/new`} className="btn-primary">+ Add Chapter</Link>
      </div>
      <div className="space-y-3">
        {chapters.map((ch) => (
          <div key={ch.id} className="bg-panel p-4 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-primary font-bold mr-3">Ch. {ch.chapter_number}</span>
              <span className="text-white">{ch.title}</span>
            </div>
            <Link href={`/admin/novels/${params.id}/chapters/${ch.id}`}
              className="text-cyber hover:text-primary transition-colors text-sm">
              Manage Pages &rarr;
            </Link>
          </div>
        ))}
        {chapters.length === 0 && (
          <p className="text-gray-500 text-center py-10">No chapters yet.</p>
        )}
      </div>
    </div>
  );
}
