import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://YOUR_PROJECT.supabase.co',
  'YOUR_SUPABASE_ANON_OR_SERVICE_KEY'
);

export { supabase };
