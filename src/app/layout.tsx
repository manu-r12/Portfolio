// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import FloatingNavbar from '@/components/FloatingNavbar';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Manu Rajbhar | Portfolio',
  description: 'Personal portfolio of Manu Rajbhar, Software Developer',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 transition-colors duration-200`}>
        {children}
      </body>
    </html>
  );
}