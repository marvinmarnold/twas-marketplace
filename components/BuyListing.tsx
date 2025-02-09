"use client"

import { useTwas } from '@/context/twas';
import { IListing, TOKEN_DECIMALS, USDC_DECIMALS } from '@/lib/api';
import BigNumber from 'bignumber.js';
import { buyTokens } from '@/lib/buyTokens';
import { useState } from 'react';
import { updateListing } from '@/lib/supabase';

const formatDecimals = (value: string, decimals: number): string => {
    try {
        const bn = new BigNumber(value);
        return bn.dividedBy(new BigNumber(10).pow(decimals)).toFormat(decimals === USDC_DECIMALS ? 6 : 2);
    } catch {
        return '0';
    }
};

const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
};

export function BuyListing({ listing }: { listing: IListing }) {
    // const { isConnected } = useAccount();
    const [privateKey, setPrivateKey] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [boughtListing, setBoughtListing] = useState<IListing | null>(listing);

    if (!boughtListing) return null

    const handleBuy = async () => {
        // if (!isConnected) {
        //     return;
        // }

        try {
            setIsProcessing(true);
            const updatedListing = await buyTokens(boughtListing, privateKey)
            // Handle success (e.g., show success message, refresh listing state)

            setBoughtListing(updatedListing)

            console.log('Purchase successful:', updatedListing)

            const response = await fetch('/api/update-listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: boughtListing.id,
                    updatedListing: updatedListing
                })
            })

            if (!response.ok) {
                throw new Error('Failed to update listing')
            }

            const result = await response.json()
        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Purchase failed:', error)
        } finally {
            setIsProcessing(false);
        }
    };


    if (boughtListing?.purchaseTxHash) {
        return (
            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-green-600">Purchase Confirmed! 🎉</h2>

                <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                        <h3 className="font-semibold text-green-800 mb-2">Transaction Details</h3>
                        <div className="space-y-2 text-sm">
                            <p className="flex justify-between">
                                <span className="text-gray-600">Transaction Hash:</span>
                                <a
                                    href={`https://sepolia.basescan.org/tx/${boughtListing.purchaseTxHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {boughtListing.purchaseTxHash.slice(0, 6)}...{boughtListing.purchaseTxHash.slice(-4)}
                                </a>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-gray-600">Purchase Time:</span>
                                <span className="text-gray-900">{new Date(boughtListing.purchasedAt!).toLocaleString()}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-gray-600">Token Address:</span>
                                <a
                                    href={`https://sepolia.basescan.org/address/${boughtListing.sellTokenAddress}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    {boughtListing.sellTokenAddress.slice(0, 6)}...{boughtListing.sellTokenAddress.slice(-4)}
                                </a>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-gray-600">Amount:</span>
                                <span className="text-gray-900">
                                    {formatDecimals(boughtListing.sellTokenAmount, TOKEN_DECIMALS)} Tokens
                                </span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-gray-600">Total Cost:</span>
                                <span className="text-gray-900">
                                    {formatDecimals(boughtListing.receiveTokenAmount, USDC_DECIMALS)} USDC
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Your tokens have been successfully purchased and transferred to your wallet.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Invest in Twas Project</h2>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Token Address</h3>
                        <p className="mt-1 text-base text-gray-900 font-mono break-all">
                            {boughtListing.sellTokenAddress}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Listing ID</h3>
                        <p className="mt-1 text-base text-gray-900 font-mono break-all">
                            {boughtListing.id}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Number of Tokens</h3>
                        <p className="mt-1 text-xl font-semibold text-gray-900">
                            {formatDecimals(boughtListing.sellTokenAmount, TOKEN_DECIMALS)}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Price per Token</h3>
                        <p className="mt-1 text-xl font-semibold text-gray-900">
                            {formatDecimals(boughtListing.sellTokenPrice, USDC_DECIMALS)} USDC
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Total Price</h3>
                        <p className="mt-1 text-xl font-semibold text-gray-900">
                            {formatDecimals(
                                boughtListing.receiveTokenAmount,
                                USDC_DECIMALS
                            )} USDC
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Offer Expires</h3>
                        <p className="mt-1 text-base text-gray-900">
                            {formatDate(boughtListing.offerExpiresAt)}
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Chat logs</h3>
                    <div className="bg-gray-50 rounded-md p-4">
                        <p className="text-base text-gray-900 whitespace-pre-wrap">
                            {boughtListing.content}
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500">Escrow ID</h3>
                    <p className="mt-1 text-base text-gray-900 font-mono break-all">
                        {listing.escrowId}
                    </p>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="privateKey" className="block text-sm font-medium text-gray-700 mb-1">
                            Private Key (starts with 0x)
                        </label>
                        <input
                            type="password"
                            id="privateKey"
                            value={privateKey}
                            onChange={(e) => setPrivateKey(e.target.value)}
                            placeholder="0x..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            disabled={isProcessing}
                        />
                    </div>

                    <button
                        onClick={handleBuy}
                        disabled={!privateKey.startsWith('0x') || isProcessing}
                        className={`w-full py-3 px-4 rounded-md font-medium ${privateKey.startsWith('0x') && !isProcessing
                            ? 'bg-orange-500 hover:bg-orange-600 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        {isProcessing ? 'Processing...' : 'Buy Now'}
                    </button>
                </div>
            </div>
        </div>
    );
}
