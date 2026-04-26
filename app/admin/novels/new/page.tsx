'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';

export default function NewNovelPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', author: '', genre: '', status: 'ongoing' as const,
  });
  const [coverUrl, setCoverUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const { error } = await supabase.from('novels').insert([{
      ...form, slug, cover_image: coverUrl,
    }]);
    if (error) { alert('Error creating novel: ' + error.message); setLoading(false); return; }
    router.push('/admin/novels');
    router.refresh();
  };

  return (
    <div className="max-w-2xl">
      <h1 className="comic-title text-4xl text-primary mb-8">ADD NEW NOVEL</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 mb-2">Title</label>
          <input type="text" required value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-surface border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Author</label>
          <input type="text" required value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full bg-surface border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Genre</label>
          <input type="text" required value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
            className="w-full bg-surface border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea rows={4} required value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-surface border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none" />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Status</label>
          <select value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as any })}
            className="w-full bg-surface border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none">
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="hiatus">Hiatus</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Cover Image</label>
          <ImageUploader bucket="novel-images" folder="covers" onUpload={(url) => setCoverUrl(url)} />
          {coverUrl && <p className="text-green-400 text-sm mt-2">Cover uploaded!</p>}
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creating...' : 'Create Novel'}
        </button>
      </form>
    </div>
  );
}
