import { supabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function AdminDashboard() {
  const { count: novelCount } = await supabase.from('novels').select('*', { count: 'exact', head: true });
  const { count: chapterCount } = await supabase.from('chapters').select('*', { count: 'exact', head: true });
  const { count: pageCount } = await supabase.from('pages').select('*', { count: 'exact', head: true });

  return (
    <div>
      <h1 className="comic-title text-4xl text-primary mb-8">ADMIN DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-panel p-6 rounded-xl comic-border">
          <p className="text-gray-400 text-sm">Total Novels</p>
          <p className="text-4xl font-bold text-primary mt-2">{novelCount || 0}</p>
        </div>
        <div className="bg-panel p-6 rounded-xl comic-border">
          <p className="text-gray-400 text-sm">Total Chapters</p>
          <p className="text-4xl font-bold text-accent mt-2">{chapterCount || 0}</p>
        </div>
        <div className="bg-panel p-6 rounded-xl comic-border">
          <p className="text-gray-400 text-sm">Total Pages</p>
          <p className="text-4xl font-bold text-cyber mt-2">{pageCount || 0}</p>
        </div>
      </div>
    </div>
  );
}
