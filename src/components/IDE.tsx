'use client'

import { useStore } from '@/lib/store'
import Editor from '@monaco-editor/react'

export default function IDE() {
  const currentPreset = useStore((store) => store.currentPreset)
  const updateCodeOfPreset = useStore((store) => store.updateCodeOfPreset)

  return (
    <Editor
      onChange={(newCode) => updateCodeOfPreset(newCode ?? '')}
      value={currentPreset.code}
      height="80vh"
      defaultLanguage="c"
    />
  )
}
