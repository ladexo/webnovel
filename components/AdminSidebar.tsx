'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();
  const links = [
    { href: '/admin', label: 'Dashboard', icon: '\u2302' },
    { href: '/admin/novels', label: 'Novels', icon: '\u270E' },
  ];

  return (
    <aside className="w-64 bg-panel border-r border-primary/20 min-h-screen p-6 hidden md:block">
      <h2 className="comic-title text-xl text-primary mb-8">ADMIN PANEL</h2>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === link.href
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'text-gray-400 hover:text-white hover:bg-surface'
            }`}>
            <span className="text-lg">{link.icon}</span>
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
