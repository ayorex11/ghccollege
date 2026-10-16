import { settings } from '~/data/site'

// Sets the page title, description, canonical address and the tags WhatsApp, Telegram, Facebook and X use for previews.
// All addresses are full https:// addresses built from the site's main domain (NUXT_SITE_URL, default https://www.goldenheart.com.ng).
export function useSeo(title: string, description: string, image?: string) {
  const full = title === 'Home' ? 'Goldenheart College | Boarding school in Abeokuta' : `${title} | Goldenheart College`
  const origin = (useSiteConfig().url || useRequestURL().origin).replace(/\/$/, '')
  const url = origin + (useRoute().path === '/' ? '/' : useRoute().path.replace(/\/$/, ''))
  const img = image ? (/^https?:\/\//.test(image) ? image : origin + image) : `${origin}/og-image.jpg`
  useHead({ link: [{ rel: 'canonical', href: url }] })
  useSeoMeta({
    title: full, description,
    ogTitle: full, ogDescription: description, ogType: 'website', ogSiteName: 'Goldenheart College', ogLocale: 'en_NG',
    ogUrl: url, ogImage: img, ogImageAlt: image ? title : 'Goldenheart College crest and motto',
    ...(image ? {} : { ogImageWidth: 1200, ogImageHeight: 630 }),
    twitterCard: 'summary_large_image', twitterTitle: full, twitterDescription: description, twitterImage: img,
  })
}

// Structured data so Google understands this is a school: name, address, phone numbers, social profiles.
export function useSchoolSchema() {
  const origin = (useSiteConfig().url || useRequestURL().origin).replace(/\/$/, '')
  const s = settings
  const data = {
    '@context': 'https://schema.org',
    '@type': ['School', 'EducationalOrganization'],
    name: s.name, alternateName: 'GHC', url: origin, slogan: s.motto,
    logo: `${origin}/logo.jpg`, image: `${origin}/og-image.jpg`,
    description: 'A Christian co-educational full boarding school for ages 10 to 16 in Moloko-Asipa, near Abeokuta, Ogun State, Nigeria.',
    foundingDate: String(s.founded),
    email: s.email, telephone: [s.phone, s.phone2].filter(Boolean),
    address: { '@type': 'PostalAddress', streetAddress: 'Moloko-Asipa Village, Obafe Road, off Sagamu-Abeokuta Expressway (Km 20)', addressLocality: 'Abeokuta', addressRegion: 'Ogun State', addressCountry: 'NG' },
    geo: { '@type': 'GeoCoordinates', latitude: 7.1449458, longitude: 3.3722477 },
    sameAs: [s.social.youtube, s.social.instagram, s.social.facebook].filter(Boolean),
  }
  useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(data) }] })
}
