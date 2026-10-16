export type Field = {
  key: string; label: string
  type: 'text' | 'textarea' | 'rich' | 'date' | 'number' | 'bool' | 'select' | 'image'
  options?: string[]; from?: { table: string; value: string; label: string }
  required?: boolean; readonly?: boolean; help?: string; slugFrom?: string
}
export type Resource = {
  slug: string; table: string; label: string; singular: string
  fields: Field[]; columns: string[]; order: { col: string; asc: boolean }
  canCreate?: boolean; csv?: boolean; hint?: string
}
const cats = ['Announcements', 'Academics', 'Events', 'Achievements', 'Parents']

export const resources: Resource[] = [
  { slug: 'events', table: 'events', label: 'Events', singular: 'event', order: { col: 'date', asc: true }, columns: ['title', 'date', 'category', 'published'], fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Web address name', type: 'text', slugFrom: 'title', help: 'Filled in for you if left empty.' },
    { key: 'date', label: 'Date', type: 'date', required: true },
    { key: 'time', label: 'Time', type: 'text', help: 'For example 10:00 AM' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'category', label: 'Category', type: 'select', options: ['Calendar', 'Parents', 'Sports', 'Academics', 'Culture', 'Other'] },
    { key: 'body', label: 'Details', type: 'textarea' },
    { key: 'published', label: 'Show on website', type: 'bool' },
  ] },
  { slug: 'terms', table: 'terms', label: 'Academic calendar', singular: 'term', order: { col: 'starts', asc: true }, columns: ['session', 'term', 'starts', 'ends'], fields: [
    { key: 'session', label: 'Session', type: 'text', required: true, help: 'For example 2026/2027' },
    { key: 'term', label: 'Term', type: 'select', options: ['First Term', 'Second Term', 'Third Term'], required: true },
    { key: 'starts', label: 'Resumption date', type: 'date', required: true },
    { key: 'ends', label: 'Closing date', type: 'date', required: true },
    { key: 'note', label: 'Notes', type: 'text', help: 'Mid-term break, exams, graduation and so on' },
    { key: 'sort', label: 'Order', type: 'number', help: '1, 2, 3 to control the order' },
  ] },
  { slug: 'posts', table: 'posts', label: 'News posts', singular: 'post', order: { col: 'published_at', asc: false }, columns: ['title', 'category', 'published', 'published_at'], fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Web address name', type: 'text', slugFrom: 'title' },
    { key: 'category', label: 'Category', type: 'select', options: cats },
    { key: 'excerpt', label: 'Short summary', type: 'textarea' },
    { key: 'body', label: 'Article', type: 'rich' },
    { key: 'cover_url', label: 'Cover image', type: 'image' },
    { key: 'published', label: 'Publish now', type: 'bool' },
  ] },
  { slug: 'albums', table: 'albums', label: 'Photo albums', singular: 'album', order: { col: 'sort', asc: true }, columns: ['title', 'sort'], fields: [
    { key: 'title', label: 'Album title', type: 'text', required: true },
    { key: 'slug', label: 'Web address name', type: 'text', slugFrom: 'title' },
    { key: 'cover_url', label: 'Cover photo', type: 'image' },
    { key: 'sort', label: 'Order', type: 'number' },
  ] },
  { slug: 'photos', table: 'photos', label: 'Photos', singular: 'photo', order: { col: 'id', asc: false }, columns: ['caption', 'url'], fields: [
    { key: 'album_id', label: 'Album', type: 'select', from: { table: 'albums', value: 'id', label: 'title' }, required: true },
    { key: 'url', label: 'Photo', type: 'image', required: true },
    { key: 'caption', label: 'Caption', type: 'text' },
  ] },
  { slug: 'videos', table: 'videos', label: 'Videos', singular: 'video', order: { col: 'sort', asc: true }, columns: ['title', 'youtube_id'], fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'youtube_id', label: 'YouTube video ID', type: 'text', required: true, help: 'The part after v= in the YouTube link.' },
    { key: 'sort', label: 'Order', type: 'number' },
  ] },
  { slug: 'testimonials', table: 'testimonials', label: 'Testimonials', singular: 'testimonial', order: { col: 'name', asc: true }, columns: ['name', 'relation', 'approved'], fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'relation', label: 'Relationship', type: 'text', help: 'For example Parent or Alumnus' },
    { key: 'quote', label: 'What they said', type: 'textarea', required: true },
    { key: 'approved', label: 'Show on website', type: 'bool' },
  ] },
  { slug: 'waec', table: 'waec_results', label: 'WAEC results', singular: 'candidate result', order: { col: 'year', asc: false }, columns: ['year', 'grades'], hint: 'One row per candidate. Do not enter names or exam numbers.', fields: [
    { key: 'year', label: 'Exam year', type: 'number', required: true },
    { key: 'grades', label: 'Subjects and grades', type: 'textarea', required: true, help: 'One per line, like: English Language B3. No names or exam numbers.' },
  ] },
  { slug: 'messages', table: 'messages', label: 'Inbox', singular: 'message', canCreate: false, csv: true, order: { col: 'created_at', asc: false }, columns: ['name', 'contact', 'message', 'created_at', 'read'], fields: [
    { key: 'name', label: 'Name', type: 'text', readonly: true },
    { key: 'contact', label: 'Phone or email', type: 'text', readonly: true },
    { key: 'message', label: 'Message', type: 'textarea', readonly: true },
    { key: 'read', label: 'Marked as read', type: 'bool' },
  ] },
  { slug: 'signups', table: 'whatsapp_signups', label: 'WhatsApp signups', singular: 'signup', canCreate: false, csv: true, order: { col: 'created_at', asc: false }, columns: ['name', 'phone', 'created_at'], fields: [
    { key: 'name', label: 'Name', type: 'text', readonly: true },
    { key: 'phone', label: 'WhatsApp number', type: 'text', readonly: true },
  ] },
]
