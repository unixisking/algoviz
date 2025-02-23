'use client'

import { useStore } from '@/lib/store'

export function Output() {
  const codeResult = useStore((store) => store.codeResult)
  return <div className="px-2 pt-2">{codeResult}</div>
}
