import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Use provided credentials as fallbacks if environment variables are missing or empty
  return {
    url: url && url !== '' ? url : 'https://czxpzzlokxeayjgzqrgs.supabase.co',
    key: key && key !== '' ? key : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eHB6emxva3hlYXlqZ3pxcmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzOTY3ODksImV4cCI6MjA3NTk3Mjc4OX0.vQDiW-OZtPqAzmhsrDGaor_86FeGvRo7tRlXwS16s0E'
  };
};

const config = getSupabaseConfig();
export const supabase = createClient(config.url, config.key);
