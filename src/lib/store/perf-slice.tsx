import { StateCreator } from 'zustand'
import { SharedSlice } from '.'
import { CodelabSlice } from './codelab-slice'

export interface IBenchmark {
  time: number
  alphabetSize: number
}

export interface AlgoPerfSlice {
  alphabetSize: number
  patternLength: number
  textLength: number
  metrics: { kind: string; metrics: IBenchmark[] }[]

  updateAlphabetSize: (newSize: number[]) => void
  updatePatternLength: (newLength: number[]) => void
  updateTextLength: (newLength: number[]) => void
  updateMetrics: (newMetrics: { kind: string; metrics: IBenchmark[] }[]) => void
}

export const createAlgoPerfSlice: StateCreator<
  AlgoPerfSlice & CodelabSlice & SharedSlice,
  [],
  [],
  AlgoPerfSlice
> = (set) => ({
  alphabetSize: 8,
  patternLength: 8,
  textLength: 100000,
  metrics: [],

  updateAlphabetSize: (size) => set(() => ({ alphabetSize: size[0] })),
  updatePatternLength: (length) => set(() => ({ patternLength: length[0] })),
  updateTextLength: (length) => set(() => ({ textLength: length[0] })),
  updateMetrics: (metrics) => set(() => ({ metrics })),
})
