// Touches the database with a tiny read. A scheduler or uptime monitor calls this regularly so
// Supabase never sees a week of inactivity. It answers 503 if the database cannot be reached,
// which is exactly what an uptime monitor needs in order to warn you.
export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'Cache-Control', 'no-store')
  const { public: c } = useRuntimeConfig(event)
  const key = String(c.supabaseKey || '')
  if (!c.supabaseUrl || !key) {
    setResponseStatus(event, 503)
    return { ok: false, error: 'Supabase is not configured on this server' }
  }
  try {
    await $fetch(`${c.supabaseUrl}/rest/v1/site_settings?select=key&limit=1`, {
      headers: { apikey: key, ...(key.startsWith('eyJ') ? { Authorization: `Bearer ${key}` } : {}) },
      timeout: 8000,
    })
    return { ok: true, checkedAt: new Date().toISOString() }
  } catch (e: any) {
    setResponseStatus(event, 503)
    return { ok: false, error: 'Database did not respond', status: e?.response?.status ?? null }
  }
})
