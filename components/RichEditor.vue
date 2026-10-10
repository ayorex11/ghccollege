<template>
  <div class="mt-1 rounded border border-[#D8CFC4] bg-white font-normal">
    <div v-if="editor" class="flex flex-wrap gap-1 border-b border-line bg-maroon-soft p-2">
      <button v-for="b in buttons" :key="b.label" type="button" class="rounded px-2.5 py-1 text-sm font-semibold hover:bg-white" :class="b.active?.() ? 'bg-maroon text-white hover:bg-maroon' : 'text-ink'" @click="b.run">{{ b.label }}</button>
      <label class="cursor-pointer rounded px-2.5 py-1 text-sm font-semibold text-ink hover:bg-white">Image<input type="file" accept="image/*" class="hidden" @change="addImage" /></label>
      <span v-if="busy" class="px-2 py-1 text-xs">Uploading…</span>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>
<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [string] }>()
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// Older posts were plain text with blank lines between paragraphs
const toHtml = (v: string) => (/<\w+[^>]*>/.test(v || '') ? v : (v || '').split(/\n\s*\n/).filter(Boolean).map(p => `<p>${esc(p.trim())}</p>`).join(''))
const busy = ref(false)
const editor = useEditor({
  content: toHtml(props.modelValue),
  extensions: [StarterKit, Link.configure({ openOnClick: false }), Image],
  editorProps: { attributes: { class: 'rich min-h-[16rem] px-4 py-3 focus:outline-none' } },
  onUpdate: ({ editor }) => emit('update:modelValue', editor.isEmpty ? '' : editor.getHTML()),
})
watch(() => props.modelValue, v => { if (editor.value && v !== editor.value.getHTML()) editor.value.commands.setContent(toHtml(v), false) })
onBeforeUnmount(() => editor.value?.destroy())
const c = () => editor.value!.chain().focus()
const buttons = [
  { label: 'Bold', run: () => c().toggleBold().run(), active: () => editor.value?.isActive('bold') },
  { label: 'Italic', run: () => c().toggleItalic().run(), active: () => editor.value?.isActive('italic') },
  { label: 'Heading', run: () => c().toggleHeading({ level: 2 }).run(), active: () => editor.value?.isActive('heading', { level: 2 }) },
  { label: 'Subheading', run: () => c().toggleHeading({ level: 3 }).run(), active: () => editor.value?.isActive('heading', { level: 3 }) },
  { label: 'Bullets', run: () => c().toggleBulletList().run(), active: () => editor.value?.isActive('bulletList') },
  { label: 'Numbers', run: () => c().toggleOrderedList().run(), active: () => editor.value?.isActive('orderedList') },
  { label: 'Quote', run: () => c().toggleBlockquote().run(), active: () => editor.value?.isActive('blockquote') },
  { label: 'Link', run: setLink, active: () => editor.value?.isActive('link') },
  { label: 'Undo', run: () => c().undo().run() },
  { label: 'Redo', run: () => c().redo().run() },
]
function setLink() {
  const prev = editor.value!.getAttributes('link').href || ''
  const url = window.prompt('Link address (leave empty to remove the link)', prev)
  if (url === null) return
  if (url === '') c().unsetLink().run(); else c().setLink({ href: url }).run()
}
async function addImage(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  busy.value = true
  try { c().setImage({ src: await uploadImage('posts', file) }).run() } catch (err: any) { alert(err.message) }
  busy.value = false
  ;(e.target as HTMLInputElement).value = ''
}
</script>
