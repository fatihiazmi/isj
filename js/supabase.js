import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://kwfiuewakyupbxxgoded.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_Oq3FW1JbUNem0TCMFI1u_Q_ObsYDo_L'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
