import { supabase } from '@/lib/supabase';
import PageReader from '@/components/PageReader';
import { Chapter, Page } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getChapter(chapterId: string): Promise<Chapter | null> {
  const { data } = await supabase.from('chapters').select('*').eq('id', chapterId).single();
  return data;
}

async function getPages(chapterId: string): Promise<Page[]> {
  const { data } = await supabase
    .from('pages')
    .select('*')
    .eq('chapter_id', chapterId)
    .order('page_number', { ascending: true });
  return data || [];
}

async function getAdjacentChapters(novelId: string, chapterNumber: number) {
  const { data: prev } = await supabase.from('chapters').select('id')
    .eq('novel_id', novelId).eq('chapter_number', chapterNumber - 1).single();
  const { data: next } = await supabase.from('chapters').select('id')
    .eq('novel_id', novelId).eq('chapter_number', chapterNumber + 1).single();
  return { prev, next };
}

export default async function ChapterReaderPage({ params }: { params: { id: string; chapterId: string } }) {
  const chapter = await getChapter(params.chapterId);
  if (!chapter) notFound();
  const pages = await getPages(chapter.id);
  const { prev, next } = await getAdjacentChapters(params.id, chapter.chapter_number);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link href={`/novels/${params.id}`} className="text-cyber hover:text-primary transition-colors">
          &larr; Back to Novel
        </Link>
        <h1 className="comic-title text-2xl text-primary">
          Ch. {chapter.chapter_number}: {chapter.title}
        </h1>
      </div>

      <PageReader pages={pages} />

      <div className="flex justify-between mt-10 pt-6 border-t border-panel">
        {prev ? (
          <Link href={`/novels/${params.id}/chapters/${prev.id}`} className="btn-primary">
            &larr; Previous Chapter
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/novels/${params.id}/chapters/${next.id}`} className="btn-primary">
            Next Chapter &rarr;
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
