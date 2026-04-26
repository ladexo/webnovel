'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function NewChapterPage() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [chapterNumber, setChapterNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('chapters').insert({
      novel_id: params.id,
      title,
      chapter_number: chapterNumber,
    });
    if (error) {
      alert('Error creating chapter: ' + error.message);
      setLoading(false);
    } else {
      router.push(`/admin/novels/${params.id}/chapters`);
    }
  };

  return (
    <div>
      <h1 className="comic-title text-3xl mb-8">Add New Chapter</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Chapter Number</label>
          <input
            type="number"
            value={chapterNumber}
            onChange={(e) => setChapterNumber(parseInt(e.target.value))}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FFD700] focus:outline-none"
            required
            min={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Chapter Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#FFD700] focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-6 py-3 rounded-lg font-bold"
        >
          {loading ? 'Creating...' : 'Create Chapter'}
        </button>
      </form>
    </div>
  );
}
