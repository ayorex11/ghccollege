import * as site from '~/data/site'
import { waecFallback } from '~/data/waecResults'

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
  const ab = b.about
  const about = {
    welcome: ab?.welcome ? paragraphs(ab.welcome) : site.welcome,
    story: ab?.story ? paragraphs(ab.story) : site.history,
    vision: ab?.vision || site.vision,
    mission: ab?.mission || site.mission,
  }
  const symbols = { anthem: b.anthem?.anthem ?? site.anthem, creed: b.anthem?.creed ?? site.creed }
  const scholarships: { title: string; text: string }[] = b.scholarships ?? site.scholarships
  const chairman = { ...site.chairman, ...(b.chairman || {}) }
  return { principal, subjects, clubs, facilities, routine, policies, about, symbols, scholarships, chairman }
}

// WAEC results: anonymous rows (year + "Subject Grade" lines). Database rows win; otherwise the real data in data/waecResults.ts.
export const useWaec = () => useAsyncData('waec', async () => {
  const rows = await dbRest('waec_results', 'select=year,grades&order=year.desc')
  return rows && rows.length ? rows.map(r => ({ year: Number(r.year), grades: String(r.grades) })) : waecFallback
}, { default: () => waecFallback })

export const GRADES = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9']
const CREDITS = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6']
function parseGrades(text: string) {
  return text.split('\n').map(l => l.trim().match(/^(.*?)[\s,:\-–]+([A-F][1-9])$/i)).filter(Boolean).map(m => ({ subject: m![1].trim(), grade: m![2].toUpperCase() }))
}
export function waecStats(rows: { year: number; grades: string }[]) {
  const isEn = (s: string) => /^english language$/i.test(s), isMa = (s: string) => /^general mathematics$/i.test(s)
  const make = (list: { year: number; grades: string }[]) => {
    const cands = list.map(r => parseGrades(r.grades))
    const entries = cands.flat()
    const dist = Object.fromEntries(GRADES.map(g => [g, entries.filter(e => e.grade === g).length]))
    const bySubject: Record<string, { n: number; credit: number }> = {}
    for (const e of entries) { const x = (bySubject[e.subject] ||= { n: 0, credit: 0 }); x.n++; if (CREDITS.includes(e.grade)) x.credit++ }
    return {
      candidates: cands.length, entries: entries.length, credits: entries.filter(e => CREDITS.includes(e.grade)).length, dist,
      enMath: cands.filter(c => c.some(e => isEn(e.subject) && CREDITS.includes(e.grade)) && c.some(e => isMa(e.subject) && CREDITS.includes(e.grade))).length,
      subjects: Object.entries(bySubject).map(([subject, v]) => ({ subject, ...v })).sort((a, b) => b.n - a.n || a.subject.localeCompare(b.subject)),
    }
  }
  const years = [...new Set(rows.map(r => r.year))].sort((a, b) => b - a)
  return { all: make(rows), years: years.map(y => ({ year: y, ...make(rows.filter(r => r.year === y)) })) }
}
