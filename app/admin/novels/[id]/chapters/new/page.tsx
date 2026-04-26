'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function NewChapterPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [chapterNumber, setChapterNumber] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('chapters').insert([{
      novel_id: params.id, title, chapter_number: chapterNumber,
    }]);
    if (error) { alert('Error: ' + error.message); setLoading(false); return; }
    router.push(`/admin/novels/${params.id}/chapters`);
    router.refresh();
  };

  return (
    <div className="max-w-2xl">
      <h1 className="comic-title text-4xl text-primary mb-8">ADD NEW CHAPTER</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Chapter Number</label>
          <input type="number" min={1} required value={chapterNumber}
            onChange={(e) => setChapterNumber(parseInt(e.target.value))}
            className="w-full bg-surface border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Title</label>
          <input type="text" required value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-surface border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creating...' : 'Create Chapter'}
        </button>
      </form>
    </div>
  );
}
