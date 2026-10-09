// ─────────────────────────────────────────────────────────────
// All site content lives here for now. Every block marked
// `placeholder: true` is sample text to be replaced via the admin.
// Shapes match the Supabase tables in supabase/schema.sql, so
// swapping to live data later only touches composables/useContent.ts
// ─────────────────────────────────────────────────────────────

export const settings = {
  name: 'Goldenheart College',
  short: 'GHC',
  motto: 'Knowledge, Integrity & Excellence',
  founded: 2017,
  phone: '+234 903 135 4602',
  whatsapp: '2349031354602',
  email: 'goldenheartcollegeghc@gmail.com',
  addressLines: ['Moloko-Asipa Village, Obafe Road,', 'off Sagamu-Abeokuta Expressway (Km 20),', 'Abeokuta, Ogun State, Nigeria'],
  mapsLink:
    'https://www.google.com/maps/dir//GOLDENHEART+COLLEGE+(GHC),+49VC%2BXVH,+GOLDENHEART+Avenue,+Moloko-Asipa+village,+iyana+obafe,+LGA,+Abeokuta,+Ogun+State',
  mapsEmbed: 'https://www.google.com/maps?q=Goldenheart+College+Moloko-Asipa+Abeokuta&output=embed',
  social: {
    youtube: 'https://www.youtube.com/@goldenheartcollegeghc430',
    instagram: 'https://www.instagram.com/collegegoldenheart',
    facebook: '', // TODO: add in admin
  },
  broadcastLink: '', // TODO: WhatsApp channel/group invite link
  heroTitle: 'Nurturing young people of character, knowledge and excellence',
  session: '2026/2027',
  visitingDays: 'To be confirmed', // TODO
}

export const wa = (msg = 'Hello Goldenheart College, I would like to make an enquiry.') =>
  `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(msg)}`

export const nav = [
  { label: 'Home', to: '/', icon: 'home' },
  { label: 'About', to: '/about', icon: 'school' },
  { label: 'Academics', to: '/academics', icon: 'menu_book' },
  { label: 'School Life', to: '/school-life', icon: 'hotel' },
  { label: 'Events', to: '/events', icon: 'event' },
  { label: 'Gallery', to: '/gallery', icon: 'photo_library' },
  { label: 'News', to: '/blog', icon: 'newspaper' },
  { label: 'Contact', to: '/contact', icon: 'call' },
]

export const stats = [
  { value: '35', label: 'Acres of campus' },
  { value: '10–16', label: 'Age range' },
  { value: String(settings.founded), label: 'Founded' },
  { value: 'Full', label: 'Boarding, co-ed' },
]

export const values = [
  { title: 'Knowledge', text: 'A broad Nigerian and British blend curriculum, taught to an international standard.' },
  { title: 'Integrity', text: 'Honesty and sound moral character, in the classroom and in the hostel.' },
  { title: 'Excellence', text: 'Helping each child reach their best using their individual talents.' },
  { title: 'Faith', text: 'A Christian faith-based school, open to families of all faiths who share our values.' },
]

export const principal = {
  name: 'Mr Gbenga Olatunde Adewale',
  title: 'Principal',
  photo: '', // TODO: upload in admin
  excerpt:
    'Welcome to Goldenheart College. Here, your child will be known by name, guided with care, and challenged to grow in knowledge, integrity and excellence.',
  message: [
    'Dear parents, guardians and students,',
    'Welcome to Goldenheart College. Since 2017, we have been a home as much as a school for boys and girls between the ages of ten and sixteen. Our campus, set on thirty-five acres of natural land in Moloko-Asipa, gives children room to learn, to play and to grow.',
    'We are a Christian faith-based school, and we warmly welcome families of every faith who identify with our values. Our motto, Knowledge, Integrity and Excellence, is not decoration. It is what we ask of every student and every member of staff, every day.',
    'Our curriculum blends the best of the Nigerian and British approaches, preparing students for WAEC and NECO examinations and for the world beyond them. Just as important, we nurture each child in the fear of God, so that they leave us as young people of character.',
    'I invite you to explore our website, and then to speak with us. We would be glad to answer your questions.',
  ],
  placeholder: true, // message is a draft for the Principal to approve
}

export const leadership = [
  { name: 'Mr Gbenga Olatunde Adewale', role: 'Principal' },
]

export const board = [
  { name: 'Dr Lawrence Akande', role: 'Chairman' },
  { name: 'Adejoke Akande', role: 'Chairperson' },
  { name: 'D.O Adaralegbe', role: 'Member' },
  { name: 'Femi Akande', role: 'Secretary' },
]

export const vision = 'To be the foremost academic institution where excellence is attained through knowledge, good moral and integrity.'
export const mission =
  'To help learners imbibe knowledge, integrity and achieve excellence using their individual talents by nurturing them in the fear of God.'

export const history = [
  'Goldenheart College (GHC) was established in 2017 as a co-educational, full boarding school near Abeokuta, Ogun State.',
  'Set on 35 acres of natural land in Moloko-Asipa Village, the school provides an exciting learning environment for children between the ages of 10 and 16.',
  'Our curriculum is a blend of Nigerian and British approaches, offering a broad-based education of international standard to meet global needs.',
]

export const levels = [
  { key: 'jss', name: 'Junior Secondary (JSS 1–3)', ages: 'Ages 10–13', exam: 'Junior school certificate / BECE', text: 'Builds strong foundations in English, mathematics, science and the humanities.' },
  { key: 'sss', name: 'Senior Secondary (SSS 1–3)', ages: 'Ages 13–16', exam: 'WAEC and NECO', text: 'Focused preparation in Science, Arts and Commercial subjects for WAEC and NECO.' },
]

// placeholder: confirm with school and edit in admin
export const subjects = {
  jss: ['English Language', 'Mathematics', 'Basic Science', 'Basic Technology', 'Social Studies', 'Civic Education', 'Computer Studies', 'Christian Religious Studies', 'Yoruba', 'Agricultural Science', 'Business Studies', 'Physical & Health Education'],
  sss: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature in English', 'Government', 'Economics', 'Commerce', 'Financial Accounting', 'Geography', 'Further Mathematics', 'Computer Studies', 'Civic Education'],
  placeholder: true,
}

export const termDates = [
  { term: 'First Term', start: '2026-09-14', end: '2026-12-11', note: 'Resumption, mid-term break, examinations', placeholder: true },
  { term: 'Second Term', start: '2027-01-11', end: '2027-04-02', note: 'Resumption, mid-term break, examinations', placeholder: true },
  { term: 'Third Term', start: '2027-04-26', end: '2027-07-23', note: 'Resumption, examinations, graduation', placeholder: true },
]

export const facilities = [
  { title: 'Science laboratories', text: 'Hands-on practical work in physics, chemistry and biology.', icon: 'science' },
  { title: 'Library', text: 'A quiet space for reading, research and private study.', icon: 'menu_book' },
  { title: 'ICT room', text: 'Computers for practical lessons and digital skills.', icon: 'laptop_mac' },
  { title: 'Sports pitch', text: 'Open ground for football, athletics and inter-class games.', icon: 'sports_soccer' },
]

// placeholder: confirm what actually exists
export const clubs = [
  { name: 'Press and Debate Club', day: 'To be confirmed', category: 'Arts', text: 'Public speaking, writing and critical thinking.' },
  { name: 'Science and Technology Club', day: 'To be confirmed', category: 'STEM', text: 'Experiments, projects and science fairs.' },
  { name: 'Choir and Drama', day: 'To be confirmed', category: 'Arts', text: 'Music, worship and stage performance.' },
  { name: 'Sports and Athletics', day: 'To be confirmed', category: 'Sports', text: 'Training and inter-house competition.' },
]

// placeholder: replace with the school's real routine
export const routine = [
  { time: '5:30 AM', title: 'Rising and morning devotion', text: 'The day starts with prayer and personal preparation.' },
  { time: '7:00 AM', title: 'Breakfast and assembly', text: 'Breakfast, then morning assembly.' },
  { time: '8:00 AM', title: 'Lessons', text: 'Classes run through the morning with a short break.' },
  { time: '2:00 PM', title: 'Games and clubs', text: 'Sports, clubs and societies.' },
  { time: '6:00 PM', title: 'Supervised prep', text: 'Evening study under the watch of staff.' },
  { time: '9:00 PM', title: 'Lights out', text: 'Rest, so students are ready for the next day.' },
]

export const events = [
  { slug: 'resumption-first-term', title: 'First Term Resumption', date: '2026-09-14', time: '8:00 AM', location: 'School campus', category: 'Calendar', text: 'Students return to campus for the new session. Placeholder event.', placeholder: true },
  { slug: 'parents-visiting-day', title: 'Parents’ Visiting Day', date: '2026-10-24', time: '10:00 AM', location: 'School campus', category: 'Parents', text: 'Parents and guardians visit their children. Placeholder event.', placeholder: true },
  { slug: 'inter-class-sports', title: 'Inter-Class Sports Day', date: '2026-11-14', time: '9:00 AM', location: 'Sports pitch', category: 'Sports', text: 'A day of friendly competition. Placeholder event.', placeholder: true },
  { slug: 'first-term-exams', title: 'First Term Examinations', date: '2026-12-01', time: '8:00 AM', location: 'School campus', category: 'Calendar', text: 'End of term examinations. Placeholder event.', placeholder: true },
]

export const posts = [
  { slug: 'welcome-to-the-new-session', title: 'Welcome to the new session', date: '2026-09-14', category: 'Announcements', excerpt: 'A word of welcome to returning students and new families.', body: ['This is a placeholder article. Replace it from the admin dashboard.', 'Use the editor to add text, images and links.'], placeholder: true },
  { slug: 'science-practical-week', title: 'Science practical week', date: '2026-10-02', category: 'Academics', excerpt: 'Students spend the week in the laboratories.', body: ['This is a placeholder article. Replace it from the admin dashboard.'], placeholder: true },
  { slug: 'sports-day-highlights', title: 'Sports day highlights', date: '2026-10-09', category: 'Events', excerpt: 'Moments from our latest inter-class competition.', body: ['This is a placeholder article. Replace it from the admin dashboard.'], placeholder: true },
]

export const testimonials = [
  { name: 'Parent name', relation: 'Parent', quote: 'Placeholder testimonial. Replace with a real parent’s words from the admin.', placeholder: true },
  { name: 'Parent name', relation: 'Parent', quote: 'Placeholder testimonial. Replace with a real parent’s words from the admin.', placeholder: true },
  { name: 'Parent name', relation: 'Parent', quote: 'Placeholder testimonial. Replace with a real parent’s words from the admin.', placeholder: true },
]

export const albums = [
  { slug: 'campus', title: 'Our campus', count: 0, placeholder: true },
  { slug: 'laboratories', title: 'In the laboratories', count: 0, placeholder: true },
  { slug: 'sports', title: 'Sports and games', count: 0, placeholder: true },
  { slug: 'graduation', title: 'Graduation', count: 0, placeholder: true },
]

export const videos = [
  { title: 'Admission ongoing', youtubeId: '' }, // TODO: paste video IDs from the YouTube channel
]

export const policies = [
  { id: 'rules', title: 'School rules', items: ['Students attend all lessons, devotions and prep on time.', 'Respect for staff, fellow students and school property is expected at all times.', 'Students do not leave the campus without permission.', 'Phones and electronics follow the school’s boarding guidelines.'], placeholder: true },
  { id: 'safeguarding', title: 'Safeguarding', items: ['Every child’s safety and dignity comes first.', 'Concerns can be raised with the Principal or by WhatsApp at any time.', 'Staff are expected to follow the school’s child protection standards.'], placeholder: true },
  { id: 'boarding', title: 'Boarding guidelines', items: ['Parents receive a boarding list and uniform list before resumption.', 'Visiting follows the published visiting days.'], placeholder: true },
]
