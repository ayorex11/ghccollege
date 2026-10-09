// Sends a public form to Supabase. Until Supabase keys are set, it just
// logs to the console so forms can be tried during development.
export async function useSubmit(table: string, row: Record<string, unknown>) {
  const { public: cfg } = useRuntimeConfig()
  if (!cfg.supabaseUrl || !cfg.supabaseKey) { console.info('[dev] would save to', table, row); return }
  const res = await fetch(`${cfg.supabaseUrl}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: cfg.supabaseKey as string,
      // legacy anon keys are JWTs (start with eyJ); new publishable keys are not and go in apikey only
      ...(String(cfg.supabaseKey).startsWith('eyJ') ? { Authorization: `Bearer ${cfg.supabaseKey}` } : {}),
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  })
  if (!res.ok) throw new Error('Could not send. Please try again or use WhatsApp.')
}
