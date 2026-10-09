import * as site from '~/data/site'

// Shows database content when there is some; otherwise the placeholder from data/site.ts.
// Before launch, set USE_PLACEHOLDERS to false so empty sections stay empty.
const USE_PLACEHOLDERS = true
const pick = <T>(rows: T[] | null, fallback: T[]) => (rows && rows.length ? rows : USE_PLACEHOLDERS ? fallback : rows || [])
const paragraphs = (s: string) => (s || '').split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)

export const useEvents = () => useAsyncData('events', async () => {
  const rows = await dbRest('events', 'select=*&published=eq.true&order=date.asc')
  return pick(rows && rows.map(r => ({ slug: r.slug, title: r.title, date: r.date, time: r.time || '', location: r.location || '', category: r.category || 'Event', text: r.body || '' })), site.events)
}, { default: () => site.events })

export const useTerms = () => useAsyncData('terms', async () => {
  const rows = await dbRest('terms', 'select=*&order=starts.asc')
  return pick(rows && rows.map(r => ({ term: r.term, start: r.starts, end: r.ends, note: r.note || '', session: r.session })), site.termDates as any[])
}, { default: () => site.termDates as any[] })

export const usePosts = () => useAsyncData('posts', async () => {
  const rows = await dbRest('posts', 'select=*&published=eq.true&order=published_at.desc')
  return pick(rows && rows.map(r => ({ slug: r.slug, title: r.title, date: r.published_at, category: r.category || 'News', excerpt: r.excerpt || '', body: paragraphs(r.body), cover: r.cover_url || '' })), site.posts.map(p => ({ ...p, cover: '' })))
}, { default: () => site.posts.map(p => ({ ...p, cover: '' })) })

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
