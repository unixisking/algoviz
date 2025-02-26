'use client'

import { useStore } from '@/lib/store'
import Editor from '@monaco-editor/react'
import { useTheme } from './ThemeProvider'

export default function IDE() {
  const currentPreset = useStore((store) => store.currentPreset)
  const updateCodeOfPreset = useStore((store) => store.updateCodeOfPreset)
  const { appliedTheme } = useTheme()

  return (
    <Editor
      onChange={(newCode) => updateCodeOfPreset(newCode ?? '')}
      value={currentPreset.code}
      height="80vh"
      theme={appliedTheme === 'dark' ? 'vs-dark' : 'light'}
      defaultLanguage="c"
    />
  )
}
