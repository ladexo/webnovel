import Link from 'next/link';
import Image from 'next/image';
import { Novel } from '@/types';

export default function NovelCard({ novel }: { novel: Novel }) {
  return (
    <Link href={`/novels/${novel.id}`}>
      <div className="bg-panel rounded-xl overflow-hidden comic-border card-hover">
        <div className="aspect-[2/3] relative bg-surface">
          {novel.cover_image ? (
            <Image src={novel.cover_image} alt={novel.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-600 text-4xl font-display">{novel.title[0]}</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg text-primary truncate">{novel.title}</h3>
          <p className="text-gray-400 text-sm mt-1">By {novel.author}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-accent">{novel.genre}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              novel.status === 'ongoing' ? 'bg-green-500/20 text-green-400' :
              novel.status === 'completed' ? 'bg-cyber/20 text-cyber' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>{novel.status}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
