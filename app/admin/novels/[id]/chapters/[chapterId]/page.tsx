'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ImageUploader from '@/components/ImageUploader';
import { Page } from '@/types';
import Image from 'next/image';

export default function ManagePagesPage({ params }: { params: { id: string; chapterId: string } }) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    const { data } = await supabase.from('pages').select('*')
      .eq('chapter_id', params.chapterId).order('page_number', { ascending: true });
    setPages(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPages(); }, []);

  const addPage = async (imageUrl: string) => {
    const nextNum = pages.length > 0 ? Math.max(...pages.map(p => p.page_number)) + 1 : 1;
    const { error } = await supabase.from('pages').insert([{
      chapter_id: params.chapterId, page_number: nextNum, image_url: imageUrl,
    }]);
    if (error) { alert('Error: ' + error.message); return; }
    fetchPages();
  };

  const deletePage = async (pageId: string) => {
    if (!confirm('Delete this page?')) return;
    await supabase.from('pages').delete().eq('id', pageId);
    fetchPages();
  };

  return (
    <div>
      <h1 className="comic-title text-4xl text-primary mb-8">MANAGE PAGES</h1>
      <div className="mb-8 bg-panel p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Upload New Page</h3>
        <ImageUploader bucket="novel-images" folder={`chapters/${params.chapterId}`}
          onUpload={(url) => addPage(url)} />
      </div>
      {loading ? (
        <p className="text-gray-400">Loading pages...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pages.map((page) => (
            <div key={page.id} className="relative group">
              <div className="bg-panel rounded-lg overflow-hidden">
                <Image src={page.image_url} alt={`Page ${page.page_number}`}
                  width={200} height={300} className="w-full h-auto object-cover" />
                <div className="p-2 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Page {page.page_number}</span>
                  <button onClick={() => deletePage(page.id)}
                    className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
