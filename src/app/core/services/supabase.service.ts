import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://plebqozujrbwrhxhgptb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZWJxb3p1anJid3JoeGhncHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTQwMjAsImV4cCI6MjA1NzI5MDAyMH0.zgmn34bvTTZ9csRiCT0VcfsOwNPF-6PaMVO9KDoq2-s';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
