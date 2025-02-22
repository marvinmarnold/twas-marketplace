import { baseSepolia } from "viem/chains";

export const API_ROUTES = {
    createListing: "/api/create-listing"
}

export const TOKEN_DECIMALS = 18;
export const USDC_DECIMALS = 6;
export const CHAIN = baseSepolia;

export type IListing = {
    id: string;
    content: string;
    createdAt: number;
    sellTokenAddress: `0x${string}`;
    // "1000000000000000000000000" = 1.00 (shifted right by TOKEN_DECIMALS)
    // number of tokens being sold
    sellTokenAmount: string;

    // "1000000" = 1.000000 USDC (shifted right by USDC_DECIMALS)
    // USDC price for each whole 1.0 token (not for 0.000000000000001 tokens)
    sellTokenPrice: string;
    offerExpiresAt: number;
    // In usdc $1 = 1000000
    receiveTokenAmount: string;
    receiveTokenAddress: `0x${string}`;
    escrowId: `0x${string}`;
    purchaseTxHash?: `0x${string}`;
    purchaserAddress?: `0x${string}`;
    purchasedAt?: number;
}