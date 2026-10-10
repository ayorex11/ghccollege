// Shrinks phone photos in the browser (max 1600px) before upload, then stores them in Supabase.
export async function resizeImage(file: File, max = 1600, quality = 0.82): Promise<Blob | File> {
  if (!file.type.startsWith('image/') || file.type === 'image/gif' || file.type === 'image/svg+xml') return file
  try {
    const bmp = await createImageBitmap(file)
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height))
    const c = document.createElement('canvas')
    c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale)
    c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height)
    const blob = await new Promise<Blob | null>(r => c.toBlob(r, 'image/jpeg', quality))
    return blob && blob.size < file.size ? blob : file
  } catch { return file }
}

export async function uploadImage(folder: string, file: File): Promise<string> {
  const sb = useNuxtApp().$supabase
  const body = await resizeImage(file)
  const ext = body.type === 'image/jpeg' ? 'jpg' : (file.name.split('.').pop() || 'png')
  const base = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 40)
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${base}.${ext}`
  const { error } = await sb.storage.from('images').upload(path, body, { contentType: body.type || undefined })
  if (error) throw error
  return sb.storage.from('images').getPublicUrl(path).data.publicUrl
}
