import { StateCreator } from 'zustand'
import { SharedSlice } from '.'
import { AlgoPerfSlice } from './perf-slice'
import { Preset, presets } from '@/data/presets'
import { SubmissionResult } from '../constants'

export interface CodelabSlice {
  currentPreset: Preset
  codeResult: {
    status: SubmissionResult
    output: string
    compile_output?: string
  } | null

  updatePreset: (newPresetId: string) => void
  updateCodeOfPreset: (code: string) => void
  updateCodeResult: (newCodeResult: {
    status: SubmissionResult
    output: string
    compile_output?: string
  }) => void
}

export const createAlgoTeachAISlice: StateCreator<
  AlgoPerfSlice & CodelabSlice & SharedSlice,
  [],
  [],
  CodelabSlice
> = (set) => ({
  currentPreset: presets[0],
  codeResult: null,

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
