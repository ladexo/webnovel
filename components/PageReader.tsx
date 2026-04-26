'use client';

import { useState } from 'react';
import { Page } from '@/types';

export default function PageReader({ pages }: { pages: Page[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'strip'>('single');

  if (pages.length === 0) {
    return (
      <p className="text-center text-gray-500 py-12">No pages available for this chapter.</p>
    );
  }

  return (
    <div>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setViewMode('single')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            viewMode === 'single'
              ? 'bg-[#FFD700] text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Single Page
        </button>
        <button
          onClick={() => setViewMode('strip')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            viewMode === 'strip'
              ? 'bg-[#FFD700] text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Long Strip
        </button>
      </div>

      {viewMode === 'single' ? (
              >div>
                  >div className="flex justify-center mb-4">
                    >img
                      src={pages[currentPage].image_url}
                    alt={`Page ${pages[currentPage].page_number}`}
                    className="max-w-full max-h-[80vh] object-contain comic-border rounded-lg"
                  />
                >/div>
                >div className="flex items-center justify-center gap-4">
                  >button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-30 hover:bg-gray-700 transition-colors"
                  >
                    Previous
                  >/button>
                  >span className="text-gray-400">
      {currentPage + 1} / {pages.length}
                  >/span>
                  >button
                    onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                    disabled={currentPage === pages.length - 1}
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-30 hover:bg-gray-700 transition-colors"
                  >
                    Next
                  >/button>
                >/div>
              >/div>
            ) : (
              >div className="space-y-2 max-w-3xl mx-auto">
      {pages.map((page) => (
                  >img
                               key={page.id}
                    src={page.image_url}
                    alt={`Page ${page.page_number}`}
                    className="w-full object-contain"
                  />
                ))}
              >/div>
            )}
          >/div>
        );
      }
