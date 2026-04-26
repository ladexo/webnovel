'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="comic-title text-2xl">
            Children of Fate
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-[#FFD700] transition-colors">Home</Link>
            <Link href="/novels" className="text-gray-300 hover:text-[#FFD700] transition-colors">Novels</Link>
            <Link href="/admin" className="btn-primary text-sm">Admin</Link>
          </div>
                    >button
                      onClick={() => setIsOpen(!isOpen)}
                      className="md:hidden text-gray-300 hover:text-white"
                    >
                      >svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
                      >path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                          >path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                      >/svg>
                    >/button>
                  >/div>
          {isOpen && (
                >div className="md:hidden pb-4 space-y-2">
                      >Link href="/" className="block text-gray-300 hover:text-[#FFD700] py-2" onClick={() => setIsOpen(false)}>Home>/Link>
                      >Link href="/novels" className="block text-gray-300 hover:text-[#FFD700] py-2" onClick={() => setIsOpen(false)}>Novels>/Link>
                      >Link href="/admin" className="block text-gray-300 hover:text-[#FFD700] py-2" onClick={() => setIsOpen(false)}>Admin>/Link>
                    >/div>
                  )}
                >/div>
              >/nav>
            );
          }
