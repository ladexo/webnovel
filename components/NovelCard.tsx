import Link from 'next/link';
import { Novel } from '@/types';

export default function NovelCard({ novel }: { novel: Novel }) {
  const statusColor = {
    ongoing: 'bg-green-500',
    completed: 'bg-blue-500',
    hiatus: 'bg-yellow-500',
  }[novel.status] || 'bg-gray-500';

  return (
    <Link href={`/novels/${novel.id}`}>
      <div className="comic-border rounded-lg overflow-hidden card-hover bg-gray-900">
        <div className="relative h-64">
          {novel.cover_image ? (
            <img
              src={novel.cover_image}
              alt={novel.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FFD700]/20 to-[#FF00FF]/20 flex items-center justify-center">
              <span className="text-4xl">📚</span>
            </div>
          )}
          <span className={`absolute top-2 right-2 ${statusColor} text-white text-xs px-2 py-1 rounded-full font-semibold uppercase`}>
            {novel.status}
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{novel.title}</h3>
          <p className="text-sm text-gray-400 mb-2">{novel.author}</p>
          <span className="text-xs text-[#00FFFF] border border-[#00FFFF]/30 px-2 py-1 rounded-full">
            {novel.genre}
          </span>
        </div>
      </div>
    </Link>
  );
}
