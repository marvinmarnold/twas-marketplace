import { BuyListing } from '@/components/BuyListing';
import { TwasInfo } from '@/components/TwasInfo';
import { IListing } from '@/lib/api';


export default async function ListingOverview({
    listing,
}: {
    listing: IListing | undefined
}) {
    console.log("other listing", listing)
    return (

        <div className="flex-1 px-4 sm:px-6 py-8">
            <TwasInfo />
            {listing ? (
                <BuyListing listing={listing} />
            ) : (
                <p>Loading</p>
            )}
        </div>
    );
}