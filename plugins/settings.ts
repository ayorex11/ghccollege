import { settings } from '~/data/site'

// Loads site settings from Supabase before the page renders and applies them over the defaults.
export default defineNuxtPlugin(async () => {
  const cached = useState<Record<string, string> | null>('site-settings', () => null)
  if (!cached.value) {
    const rows = await dbRest('site_settings', 'select=*')
    cached.value = Object.fromEntries((rows || []).map(r => [r.key, r.value]))
  }
  const s = cached.value || {}
  if (s.phone) settings.phone = s.phone
  if (s.whatsapp) settings.whatsapp = s.whatsapp.replace(/\D/g, '')
  if (s.email) settings.email = s.email
  if (s.address) settings.addressLines = [s.address]
  if (s.mapsLink) settings.mapsLink = s.mapsLink
  if (s.instagram) settings.social.instagram = s.instagram
  if (s.youtube) settings.social.youtube = s.youtube
  if (s.facebook) settings.social.facebook = s.facebook
  if (s.broadcastLink) settings.broadcastLink = s.broadcastLink
  if (s.session) settings.session = s.session
  if (s.visitingDays) settings.visitingDays = s.visitingDays
  if (s.heroTitle) settings.heroTitle = s.heroTitle
})
