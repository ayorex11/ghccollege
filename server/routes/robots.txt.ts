// Tells search engines to skip the admin and where the sitemap is.
export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  const base = useSiteConfig(event).url
  return `User-agent: *\nDisallow: /admin\n\nSitemap: ${base}/sitemap.xml\n`
})
