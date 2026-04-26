import { supabase } from '@/lib/supabase';
import ChapterList from '@/components/ChapterList';
import { Novel, Chapter } from '@/types';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getNovel(id: string): Promise<Novel | null> {
  const { data } = await supabase.from('novels').select('*').eq('id', id).single();
  return data;
}

async function getChapters(novelId: string): Promise<Chapter[]> {
  const { data } = await supabase
    .from('chapters')
    .select('*')
    .eq('novel_id', novelId)
    .order('chapter_number', { ascending: true });
  return data || [];
}

export default async function NovelDetailPage({ params }: { params: { id: string } }) {
  const novel = await getNovel(params.id);
  if (!novel) notFound();
  const chapters = await getChapters(novel.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="comic-border rounded-xl overflow-hidden">
            {novel.cover_image ? (
              <Image src={novel.cover_image} alt={novel.title} width={320} height={480}
                className="w-full h-auto object-cover" />
            ) : (
              <div className="w-full h-96 bg-panel flex items-center justify-center">
                <span className="text-gray-500 text-lg">No Cover</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="comic-title text-5xl text-primary mb-4">{novel.title}</h1>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
              {novel.genre}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              novel.status === 'ongoing' ? 'bg-green-500/20 text-green-400' :
              novel.status === 'completed' ? 'bg-cyber/20 text-cyber' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              {novel.status.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-400 mb-2">By <span className="text-white font-medium">{novel.author}</span></p>
          <p className="text-gray-300 leading-relaxed mt-4">{novel.description}</p>
          <p className="text-gray-500 text-sm mt-4">{chapters.length} Chapter{chapters.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <ChapterList chapters={chapters} novelId={novel.id} />
    </div>
  );
}
