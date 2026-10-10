import * as site from '~/data/site'

// Shows database content when there is some; otherwise the placeholder from data/site.ts.
// Before launch, set USE_PLACEHOLDERS to false so empty sections stay empty.
const USE_PLACEHOLDERS = true
const pick = <T>(rows: T[] | null, fallback: T[]) => (rows && rows.length ? rows : USE_PLACEHOLDERS ? fallback : rows || [])
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const toHtml = (s: string) => (/<\w+[^>]*>/.test(s || '') ? s : paragraphs(s).map(p => `<p>${esc(p)}</p>`).join(''))
const paragraphs = (s: string) => (s || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

export const useEvents = () => useAsyncData('events', async () => {
  const rows = await dbRest('events', 'select=*&published=eq.true&order=date.asc')
  return pick(rows && rows.map(r => ({ slug: r.slug, title: r.title, date: r.date, time: r.time || '', location: r.location || '', category: r.category || 'Event', text: r.body || '' })), site.events)
}, { default: () => site.events })

export const useTerms = () => useAsyncData('terms', async () => {
  const rows = await dbRest('terms', 'select=*&order=starts.asc')
  return pick(rows && rows.map(r => ({ term: r.term, start: r.starts, end: r.ends, note: r.note || '', session: r.session })), site.termDates as any[])
}, { default: () => site.termDates as any[] })

const samplePosts = site.posts.map(p => ({ slug: p.slug, title: p.title, date: p.date, category: p.category, excerpt: p.excerpt, html: p.body.map(b => `<p>${esc(b)}</p>`).join(''), cover: '' }))
export const usePosts = () => useAsyncData('posts', async () => {
  const rows = await dbRest('posts', 'select=*&published=eq.true&order=published_at.desc')
  return pick(rows && rows.map(r => ({ slug: r.slug, title: r.title, date: r.published_at, category: r.category || 'News', excerpt: r.excerpt || '', html: toHtml(r.body), cover: r.cover_url || '' })), samplePosts)
}, { default: () => samplePosts })

export const useTestimonials = () => useAsyncData('testimonials', async () => {
  const rows = await dbRest('testimonials', 'select=*&approved=eq.true')
  return pick(rows && rows.map(r => ({ name: r.name, relation: r.relation || 'Parent', quote: r.quote })), site.testimonials as any[])
}, { default: () => site.testimonials as any[] })

export const useVideos = () => useAsyncData('videos', async () => {
  const rows = await dbRest('videos', 'select=*&order=sort.asc')
  return (rows || []).map(r => ({ title: r.title, youtubeId: r.youtube_id }))
}, { default: () => [] as { title: string; youtubeId: string }[] })

export const useGallery = () => useAsyncData('gallery', async () => {
  const [albums, photos] = await Promise.all([dbRest('albums', 'select=*&order=sort.asc'), dbRest('photos', 'select=*')])
  const list = (albums || []).map(a => ({ slug: a.slug, title: a.title, cover: a.cover_url || '', photos: (photos || []).filter(p => p.album_id === a.id).map(p => ({ url: p.url, caption: p.caption || '' })) }))
  return list
}, { default: () => [] as { slug: string; title: string; cover: string; photos: { url: string; caption: string }[] }[] })

// Content edited under "Page content" in the admin. Falls back to the sample text in data/site.ts.
export const useBlocks = () => useAsyncData('blocks', async () => {
  const rows = await dbRest('content_blocks', 'select=*')
  return Object.fromEntries((rows || []).map(r => [r.key, r.body])) as Record<string, any>
}, { default: () => ({}) as Record<string, any> })

export async function useBlockContent() {
  const { data } = await useBlocks()
  const b = data.value || {}
  const sample = <T>(v: T, empty: T) => (USE_PLACEHOLDERS ? v : empty)
  const pb = b.principal
  const principal = {
    name: pb?.name || site.principal.name,
    title: pb?.title || site.principal.title,
    photo: pb?.photo || '',
    excerpt: pb ? pb.excerpt || '' : sample(site.principal.excerpt, ''),
    message: pb ? paragraphs(pb.message) : sample(site.principal.message, [] as string[]),
  }
  const subjects = b.subjects ? { jss: b.subjects.jss || [], sss: b.subjects.sss || [] } : sample({ jss: site.subjects.jss, sss: site.subjects.sss }, { jss: [], sss: [] })
  const clubs: any[] = b.clubs ?? sample(site.clubs as any[], [])
  const facilities: any[] = b.facilities ?? site.facilities
  const routine: any[] = b.routine ?? sample(site.routine as any[], [])
  const policies = (b.policies ?? sample(site.policies as any[], [])).map((p: any) => ({ id: (p.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'), title: p.title, items: p.items || [] }))
  return { principal, subjects, clubs, facilities, routine, policies }
}
