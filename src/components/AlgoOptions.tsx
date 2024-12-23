'use client'

import { algos, types } from '@/data/models'
import React from 'react'
import { AlphabetSizeSizeSelector } from './ui/alphabet-size-selector'
import { AlgoSelector } from './ui/model-selector'
import { TextSizeSelector } from './ui/textsize-selector'
import { WordLengthSelector } from './ui/wordlength-selector'
import { useStore } from "@/lib/store"

export default function AlgoOptions() {
    const alphabetSize = useStore(state => state.alphabetSize)
    const patternLength = useStore(state => state.patternLength)
    const textLength = useStore(state => state.textLength)
    const currentAlgo = useStore(state => state.currentAlgo)

    const updateAlphabetSize = useStore(state => state.updateAlphabetSize)
    const updatePatternLength = useStore(state => state.updatePatternLength)
    const updateTextLength = useStore(state => state.updateTextLength)
    const updateAlgo = useStore(state => state.updateAlgo)
    return (
        <>
            <AlgoSelector types={types} models={algos} selectedAlgo={currentAlgo} onAlgoChange={updateAlgo} />
            <AlphabetSizeSizeSelector onChange={updateAlphabetSize} value={[alphabetSize]} />
            <TextSizeSelector onChange={updateTextLength} value={[textLength]} />
            <WordLengthSelector onChange={updatePatternLength} value={[patternLength]} />
        </>
    )
}
