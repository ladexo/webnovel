'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Page } from '@/types';

export default function PageReader({ pages }: { pages: Page[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'scroll'>('scroll');

  if (pages.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl">No pages uploaded yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setViewMode('single')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'single' ? 'bg-primary text-dark' : 'bg-panel text-gray-400 hover:text-white'
          }`}
        >
          Single Page
        </button>
        <button
          onClick={() => setViewMode('scroll')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'scroll' ? 'bg-primary text-dark' : 'bg-panel text-gray-400 hover:text-white'
          }`}
        >
          Long Strip
        </button>
        <span className="text-gray-500 text-sm ml-4">
          {viewMode === 'single' ? `Page ${currentPage + 1} of ${pages.length}` : `${pages.length} pages`}
        </span>
      </div>

      {viewMode === 'single' ? (
        <div>
          <div className="flex justify-center">
            <div className="max-w-2xl w-full">
              <Image
                src={pages[currentPage].image_url}
                alt={`Page ${pages[currentPage].page_number}`}
                width={800}
                height={1200}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              &larr; Prev
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
              disabled={currentPage === pages.length - 1}
              className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-1">
          {pages.map((page, idx) => (
            <Image
              key={page.id}
              src={page.image_url}
              alt={`Page ${page.page_number}`}
              width={800}
              height={1200}
              className="w-full h-auto"
              priority={idx < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
}
