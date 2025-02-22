"use client";

import Link from 'next/link';
import { TwasInfo } from '@/components/TwasInfo';
import { usePathname } from 'next/navigation'


export default function Home() {
  const pathname = usePathname()
  console.log('pathname', pathname)

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="w-full px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-gray-600 hover:text-gray-900">
              Twas
            </Link>
          </div>
          <div>
          </div>
        </div>
      </nav>


      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 py-8">
        <TwasInfo />
      </div>
    </main>
  );
}