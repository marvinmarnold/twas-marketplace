import ListingOverview from '@/components/ListingOverview';
import { getListing } from '@/lib/supabase';
import Link from 'next/link';


export default async function ListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>
}) {
  const listingId = (await params).listingId
  console.log('listingId', listingId)
  const listing = await getListing(listingId)
  console.log('listing', listing)
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
            {/* -@ts-expect-error msg */}
            {/* <appkit-button /> */}
          </div>
        </div>
      </nav>

      <ListingOverview listing={listing} />

    </main>
  );
}