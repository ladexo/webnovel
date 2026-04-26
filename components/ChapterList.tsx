import Link from 'next/link';
import { Chapter } from '@/types';

export default function ChapterList({ chapters, novelId }: { chapters: Chapter[]; novelId: string }) {
  if (chapters.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">No chapters available yet.</p>
    );
  }

  return (
    <div className="space-y-2">
      {chapters.map((chapter) => (
        <Link
          key={chapter.id}
          href={`/novels/${novelId}/chapters/${chapter.id}`}
          className="block p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[#FFD700] font-bold mr-3">
                Ch. {chapter.chapter_number}
              </span>
              <span className="text-white group-hover:text-[#FFD700] transition-colors">
                {chapter.title}
              </span>
            </div>
            <span className="text-gray-500 text-sm">
              {new Date(chapter.created_at).toLocaleDateString()}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
