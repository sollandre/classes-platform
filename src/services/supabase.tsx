import { createClient, PostgrestError } from "@supabase/supabase-js";

export const supabase = createClient(import.meta.env.VITE_SUPA_URL, import.meta.env.VITE_SUPA_ANON)

export function checkError<T>(data: T[] | null, error: PostgrestError | null): data is T[] {
  if (data?.length === 0 || !data || error){
    const verifiedError = error ? error : new Error('Could not retrieve data')
    throw verifiedError
  }

  return true
}