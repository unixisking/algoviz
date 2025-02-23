import { StateCreator } from 'zustand'
import { SharedSlice } from '.'
import { AlgoPerfSlice } from './perf-slice'
import { Preset, presets } from '@/data/presets'

export interface CodelabSlice {
  currentPreset: Preset
  codeResult: string

  updatePreset: (newPresetId: string) => void
  updateCodeOfPreset: (code: string) => void
  updateCodeResult: (newCodeResult: string) => void
}

export const createAlgoTeachAISlice: StateCreator<
  AlgoPerfSlice & CodelabSlice & SharedSlice,
  [],
  [],
  CodelabSlice
> = (set) => ({
  currentPreset: presets[0],
  codeResult: '',

  updateCodeOfPreset: (code) =>
    set((prevState) => ({
      ...prevState,
      currentPreset: { ...prevState.currentPreset, code },
    })),

  updatePreset: (newPresetId) =>
    set(() => ({
      currentPreset: presets.filter((p) => p.id === newPresetId)[0],
    })),
  updateCodeResult: (newCodeResult) =>
    set(() => ({ codeResult: newCodeResult })),
})
