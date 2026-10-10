import * as site from './site'

type Opt = string | { value: string; label: string }
export type BField = { key: string; label: string; type: 'text' | 'textarea' | 'lines' | 'image' | 'select'; options?: Opt[]; help?: string }
export type Block = { slug: string; key: string; label: string; kind: 'object' | 'list'; hint?: string; itemName?: string; fields: BField[]; defaults: any }

export const blocks: Block[] = [
  { slug: 'principal', key: 'principal', label: 'Principal’s message', kind: 'object', hint: 'Shown on the Home page (short quote) and the About page (full message).', fields: [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'photo', label: 'Photo', type: 'image' },
    { key: 'excerpt', label: 'Short quote for the Home page', type: 'textarea' },
    { key: 'message', label: 'Full welcome message', type: 'textarea', help: 'Leave a blank line between paragraphs.' },
  ], defaults: { name: site.principal.name, title: site.principal.title, photo: '', excerpt: site.principal.excerpt, message: site.principal.message.join('\n\n') } },

  { slug: 'subjects', key: 'subjects', label: 'Subjects', kind: 'object', hint: 'Shown on the Academics page.', fields: [
    { key: 'jss', label: 'Junior Secondary (JSS) subjects', type: 'lines', help: 'One subject per line.' },
    { key: 'sss', label: 'Senior Secondary (SSS) subjects', type: 'lines', help: 'One subject per line.' },
  ], defaults: { jss: site.subjects.jss, sss: site.subjects.sss } },

  { slug: 'clubs', key: 'clubs', label: 'Clubs and societies', kind: 'list', itemName: 'club', hint: 'Shown on the School Life page.', fields: [
    { key: 'name', label: 'Club name', type: 'text' },
    { key: 'category', label: 'Category', type: 'text', help: 'For example Arts, STEM, Sports, Faith. Clubs with the same category are grouped.' },
    { key: 'day', label: 'Meeting day', type: 'text' },
    { key: 'text', label: 'Short description', type: 'textarea' },
  ], defaults: site.clubs },

  { slug: 'facilities', key: 'facilities', label: 'Facilities', kind: 'list', itemName: 'facility', hint: 'Shown on the School Life page.', fields: [
    { key: 'title', label: 'Facility name', type: 'text' },
    { key: 'icon', label: 'Icon', type: 'select', options: [
      { value: 'science', label: 'Laboratory' }, { value: 'menu_book', label: 'Library or book' }, { value: 'laptop_mac', label: 'Computer' },
      { value: 'sports_soccer', label: 'Sports' }, { value: 'hotel', label: 'Hostel' }, { value: 'school', label: 'Classroom' }, { value: 'home', label: 'Building' }] },
    { key: 'text', label: 'Short description', type: 'textarea' },
    { key: 'photo', label: 'Photo (optional)', type: 'image' },
  ], defaults: site.facilities.map(f => ({ ...f, photo: '' })) },

  { slug: 'routine', key: 'routine', label: 'Boarding routine', kind: 'list', itemName: 'time slot', hint: 'Shown on the School Life page, in the order listed here.', fields: [
    { key: 'time', label: 'Time', type: 'text', help: 'For example 5:30 AM' },
    { key: 'title', label: 'Activity', type: 'text' },
    { key: 'text', label: 'Details', type: 'textarea' },
  ], defaults: site.routine },

  { slug: 'policies', key: 'policies', label: 'Policies', kind: 'list', itemName: 'policy', hint: 'Shown on the Policies page.', fields: [
    { key: 'title', label: 'Policy title', type: 'text', help: 'For example School rules, Safeguarding.' },
    { key: 'items', label: 'Points', type: 'lines', help: 'One point per line.' },
  ], defaults: site.policies.map(p => ({ title: p.title, items: p.items })) },
]
