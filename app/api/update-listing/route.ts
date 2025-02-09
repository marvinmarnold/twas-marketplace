import { updateListing } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { id, updatedListing } = await request.json()

        const result = await updateListing(id, updatedListing)

        return NextResponse.json({ success: true, data: result })
    } catch (error) {
        console.error('Error updating listing:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update listing' },
            { status: 500 }
        )
    }
}
