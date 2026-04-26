'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/novels', label: 'Novels', icon: '📚' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 p-6">
      <Link href="/admin" className="comic-title text-xl mb-8 block">
        Admin Panel
      </Link>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === link.href
                ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-8 pt-8 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <span>🌐</span>
          <span>View Site</span>
        </Link>
      </div>
    </aside>
  );
}
