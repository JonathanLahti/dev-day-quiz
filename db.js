
import * as dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://igglygwqxxrpqezogysi.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)

