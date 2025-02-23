'use client'

import { RotateCcw } from 'lucide-react'
import { Button } from './ui/button'
import { useStore } from '@/lib/store'
import { submission } from '@/lib/actions/judge0'

export default function CodeRunner() {
  const presetCode = useStore((store) => store.currentPreset.code)
  const updateCodeResult = useStore((store) => store.updateCodeResult)
  return (
    <div className="flex items-center space-x-2">
      <Button
        onClick={async () => {
          const response = await submission(presetCode)
          updateCodeResult(response.response.stdout)
        }}
      >
        Run
      </Button>
      <Button variant="secondary">
        <span className="sr-only">Reset</span>
        <RotateCcw />
      </Button>
    </div>
  )
}
