// Adds published news posts and events (from the database) to the sitemap, so Google finds them.
export default defineEventHandler(async (event) => {
  const { public: c } = useRuntimeConfig(event)
  const key = String(c.supabaseKey || '')
  if (!c.supabaseUrl || !key) return []
  const headers = { apikey: key, ...(key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {}) }
  const get = (t: string, q: string) => $fetch<any[]>(`${c.supabaseUrl}/rest/v1/${t}?${q}`, { headers, timeout: 8000 }).catch(() => [])
  const [posts, events] = await Promise.all([
    get('posts', 'select=slug,published_at&published=eq.true'),
    get('events', 'select=slug,date&published=eq.true'),
  ])
  return [
    ...posts.filter(p => p.slug).map(p => ({ loc: `/blog/${p.slug}`, lastmod: p.published_at })),
    ...events.filter(e => e.slug).map(e => ({ loc: `/events/${e.slug}`, lastmod: e.date })),
  ]
})
