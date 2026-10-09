export function useSeo(title: string, description: string) {
  const full = title === 'Home' ? 'Goldenheart College | Boarding school in Abeokuta' : `${title} | Goldenheart College`
  useSeoMeta({ title: full, description, ogTitle: full, ogDescription: description, ogImage: '/logo.jpg' })
}
