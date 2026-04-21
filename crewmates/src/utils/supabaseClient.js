import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://afaclokiblhyqqszqhbp.supabase.co'
const supabaseKey = 'sb_publishable_ziC0gE2CqLcIq2Ef_HSMPQ_XDMQnZpw'

export const supabase = createClient(supabaseUrl, supabaseKey)
