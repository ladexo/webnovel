import Link from 'next/link';
import { Chapter } from '@/types';

export default function ChapterList({ chapters, novelId }: { chapters: Chapter[]; novelId: string }) {
  return (
    <div>
      <h2 className="comic-title text-3xl text-primary mb-6">CHAPTERS</h2>
      {chapters.length === 0 ? (
        <p className="text-gray-500">No chapters available yet.</p>
      ) : (
        <div className="space-y-3">
          {chapters.map((chapter) => (
            <Link key={chapter.id} href={`/novels/${novelId}/chapters/${chapter.id}`}
              className="block bg-panel hover:bg-surface p-4 rounded-xl transition-all duration-200 border border-transparent hover:border-primary/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-primary font-display text-xl w-16">
                    CH.{chapter.chapter_number}
                  </span>
                  <span className="text-white font-medium">{chapter.title}</span>
                </div>
                <span className="text-cyber text-sm">Read &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
