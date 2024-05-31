require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const supaUrl = process.env.SUPABASE_URL;
const supaKey = process.env.SUPABASE_KEY;

const supabase = createClient(supaUrl, supaKey);



module.exports = supabase;
