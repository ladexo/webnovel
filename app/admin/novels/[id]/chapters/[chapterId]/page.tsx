'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ImageUploader from '@/components/ImageUploader';
import { Page } from '@/types';

export default function ManagePagesPage() {
  const params = useParams();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    const { data } = await supabase
      .from('pages')
      .select('*')
      .eq('chapter_id', params.chapterId)
      .order('page_number', { ascending: true });
    setPages(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, [params.chapterId]);

  const handleImageUploaded = async (url: string) => {
        const nextPageNumber = pages.length > 0 ? Math.max(...pages.map(p => p.page_number)) + 1 : 1;
        const { error } = await supabase.from('pages').insert({
                chapter_id: params.chapterId,
                page_number: nextPageNumber,
                image_url: url,
        });
        if (error) {
                alert('Error adding page: ' + error.message);
                return;
        }
        fetchPages();
  };

  const handleDelete = async (pageId: string) => {
        if (!confirm('Delete this page?')) return;
        const { error } = await supabase.from('pages').delete().eq('id', pageId);
        if (error) {
                alert('Error deleting page: ' + error.message);
                return;
        }
        fetchPages();
  };

  if (loading) {
        return >div className="text-center py-12 text-gray-400">Loading pages...>/div>;
  }

  return (
        >div>
          >h1 className="comic-title text-3xl mb-8">Manage Pages>/h1>
        >div className="mb-8">
            >h2 className="text-xl font-semibold text-white mb-4">Upload New Page>/h2>
          >ImageUploader onImageUploaded={handleImageUploaded} folder="pages" />
          >/div>
        >div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {pages.map((page) => (
              >div key={page.id} className="comic-border rounded-lg overflow-hidden group relative">
              >img
              src={page.image_url}
              alt={`Page ${page.page_number}`}
              className="w-full h-48 object-cover"
            />
                            >div className="p-2 bg-gray-800">
                              >p className="text-sm text-gray-300">Page {page.page_number}>/p>
            >/div>
            >button
              onClick={() => handleDelete(page.id)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
                              X
            >/button>
          >/div>
        ))}
      >/div>
{pages.length === 0 && (
          >p className="text-center text-gray-500 py-8">No pages yet. Upload your first page above!>/p>
       )}
    >/div>
  );
}
