import 'dotenv/config';
import { createClient } from "@supabase/supabase-js";

const supaUrl = process.env.SUPABASE_URL;
const supaKey = process.env.SUPABASE_KEY;

const supabase = createClient(supaUrl, supaKey);

export default supabase;