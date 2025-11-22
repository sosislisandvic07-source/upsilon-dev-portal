// lib/supabase.js

import { createClient } from '@supabase/supabase-js';

// Vercel'e eklediğimiz ortam değişkenlerini kullanıyoruz
// Bu değişkenler Vercel tarafından otomatik olarak buraya sağlanır.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase istemcisini oluştur ve dışa aktar
export const supabase = createClient(supabaseUrl, supabaseAnonKey);