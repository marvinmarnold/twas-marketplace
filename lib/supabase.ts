import { createClient } from '@supabase/supabase-js'
import { IListing } from './api'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE) {
    console.error('SUPABASE_URL or SUPABASE_SERVICE_ROLE is not set')
    throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE is not set')
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)


export async function getListing(id: string) {
    const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        throw error
    }

    return data
}

export async function updateListing(id: string, updatedListing: IListing) {
    const { data, error } = await supabase
        .from('listings')
        .update(updatedListing)
        .eq('id', id)
        .select()

    if (error) {
        throw error
    }

    return data
}
