import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Novel } from '@/types';

export const revalidate = 0;

async function getAdminNovels(): Promise<Novel[]> {
  const { data } = await supabase.from('novels').select('*').order('created_at', { ascending: false });
  return data || [];
}

export default async function AdminNovelsPage() {
  const novels = await getAdminNovels();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="comic-title text-4xl text-primary">MANAGE NOVELS</h1>
        <Link href="/admin/novels/new" className="btn-primary">+ Add Novel</Link>
      </div>
      <div className="space-y-4">
        {novels.map((novel) => (
          <div key={novel.id} className="bg-panel p-4 rounded-xl flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{novel.title}</h3>
              <p className="text-gray-400 text-sm">{novel.genre} &bull; {novel.status}</p>
            </div>
            <Link href={`/admin/novels/${novel.id}/chapters`}
              className="text-cyber hover:text-primary transition-colors">
              Manage Chapters &rarr;
            </Link>
          </div>
        ))}
        {novels.length === 0 && (
          <p className="text-gray-500 text-center py-10">No novels yet. Click &quot;+ Add Novel&quot; to create one.</p>
        )}
      </div>
    </div>
  );
}
