import { StateCreator } from 'zustand'
import { SharedSlice } from '.'
import { AlgoPerfSlice } from './perf-slice'
import { Preset, presets } from '@/data/presets'

export interface CodelabSlice {
  currentPreset: Preset

  updatePreset: (newPreset: Preset) => void
}

export const createAlgoTeachAISlice: StateCreator<
  AlgoPerfSlice & CodelabSlice & SharedSlice,
  [],
  [],
  CodelabSlice
> = (set) => ({
  currentPreset: presets[0],

  updatePreset: (newPreset) => set(() => ({ currentPreset: newPreset })),
})
