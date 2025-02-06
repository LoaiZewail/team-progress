import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    "https://ymkxczbcoikqrmpfhirv.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlta3hjemJjb2lrcXJtcGZoaXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NjAxNTUsImV4cCI6MjA1NDQzNjE1NX0.Twitr0nzcs6jh2XFZe2AzGobJvZIv8b58JoYK80OB8c"
);