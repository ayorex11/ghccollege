import { createClient } from '@supabase/supabase-js'
export default defineNuxtPlugin(() => {
  const { public: c } = useRuntimeConfig()
  const client = createClient(String(c.supabaseUrl), String(c.supabaseKey))
  return { provide: { supabase: client } }
})
