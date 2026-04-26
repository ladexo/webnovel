import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    title: 'Children of Fate | Graphic Novel',
    description: 'Read Children of Fate - an epic graphic novel series',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
          >html lang="en">
            >body>
              >Navbar />
              >main className="min-h-screen">{children}>/main>
        >/body>
      >/html>
    );
}
