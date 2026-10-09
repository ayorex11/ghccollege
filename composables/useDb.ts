// Reads public rows from Supabase. Returns null if Supabase is not configured or the call fails,
// so pages can fall back to the placeholder content in data/site.ts.
export async function dbRest<T = any>(table: string, query = 'select=*'): Promise<T[] | null> {
  const { public: c } = useRuntimeConfig()
  const key = String(c.supabaseKey || '')
  if (!c.supabaseUrl || !key) return null
  try {
    return await $fetch<T[]>(`${c.supabaseUrl}/rest/v1/${table}?${query}`, {
      headers: { apikey: key, ...(key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {}) },
    })
  } catch (e) {
    console.warn('[db]', table, 'failed, using placeholder content')
    return null
  }
}
