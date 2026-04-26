'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-panel/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="comic-title text-2xl text-primary">
          CHILDREN OF FATE
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-300 hover:text-primary transition-colors">Home</Link>
          <Link href="/novels" className="text-gray-300 hover:text-primary transition-colors">Novels</Link>
          <Link href="/admin" className="text-accent hover:text-primary transition-colors text-sm">Admin</Link>
        </div>
        <button className="md:hidden text-primary text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '\u2715' : '\u2630'}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-panel border-t border-primary/20 px-4 py-4 space-y-3">
          <Link href="/" className="block text-gray-300 hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/novels" className="block text-gray-300 hover:text-primary" onClick={() => setIsOpen(false)}>Novels</Link>
          <Link href="/admin" className="block text-accent hover:text-primary" onClick={() => setIsOpen(false)}>Admin</Link>
        </div>
      )}
    </nav>
  );
}
