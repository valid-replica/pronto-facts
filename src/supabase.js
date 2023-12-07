import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rbldvlzijlyennuzfyby.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibGR2bHppamx5ZW5udXpmeWJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0NDAxNTAsImV4cCI6MjAxNzAxNjE1MH0.e5lfHoiVrs5-A1rT33d-5UlHRB3HMDUqWu_qRT9LcME";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
