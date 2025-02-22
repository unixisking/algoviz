'use client'

import React from 'react'
import { algos, types } from '@/data/models'
import { AlphabetSizeSizeSelector } from './ui/alphabet-size-selector'
import { AlgoSelector } from './ui/model-selector'
import { TextSizeSelector } from './ui/textsize-selector'
import { WordLengthSelector } from './ui/wordlength-selector'
import { useStore } from '@/lib/store'
import { RotateCcw } from 'lucide-react'
import { Button } from './ui/button'
import { submit } from '@/lib/actions/perf'

export default function AlgoOptions() {
  const alphabetSize = useStore((state) => state.alphabetSize)
  const patternLength = useStore((state) => state.patternLength)
  const textLength = useStore((state) => state.textLength)
  const firstAlgo = useStore((state) => state.currentFirstAlgo)
  const secondAlgo = useStore((state) => state.currentSecondAlgo)

  const updateAlphabetSize = useStore((state) => state.updateAlphabetSize)
  const updatePatternLength = useStore((state) => state.updatePatternLength)
  const updateTextLength = useStore((state) => state.updateTextLength)
  const updateFirstAlgo = useStore((state) => state.updateFirstAlgo)
  const updateSecondAlgo = useStore((state) => state.updateSecondAlgo)
  const updateMetrics = useStore((state) => state.updateMetrics)

  return (
    <>
      <AlgoSelector
        types={types}
        models={algos}
        currentAlgo={firstAlgo}
        setCurrentAlgo={updateFirstAlgo}
      />
      <AlgoSelector
        types={types}
        models={algos}
        currentAlgo={secondAlgo}
        setCurrentAlgo={updateSecondAlgo}
      />
      <AlphabetSizeSizeSelector
        onChange={updateAlphabetSize}
        value={[alphabetSize]}
      />
      <TextSizeSelector onChange={updateTextLength} value={[textLength]} />
      <WordLengthSelector
        onChange={updatePatternLength}
        value={[patternLength]}
      />
      <div className="flex items-center space-x-2 pt-2">
        <Button
          onClick={async () => {
            const metrics = await submit({
              patternLength,
              textSize: textLength,
              alphabetSize,
              kinds: [firstAlgo.id, secondAlgo.id],
            })
            if (metrics) {
              updateMetrics(metrics)
            } else {
              //Show error
            }
          }}
        >
          Run
        </Button>
        <Button variant="secondary">
          <span className="sr-only">Restart</span>
          <RotateCcw />
        </Button>
      </div>
    </>
  )
}
