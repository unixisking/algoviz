'use client'

import { useStore } from '@/lib/store'
import Editor from '@monaco-editor/react'

export default function IDE() {
  const currentPreset = useStore((store) => store.currentPreset)

  return (
    <Editor
      value={currentPreset.code}
      height="80vh"
      defaultLanguage="c"
      defaultValue={currentPreset.code}
    />
  )
}
