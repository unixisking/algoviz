import { StateCreator } from "zustand";
import { SharedSlice } from ".";
import { AlgoVizSlice } from "./viz-slice";

export interface AlgoPerfSlice {
    alphabetSize: number,
    patternLength: number,
    textLength: number,

    updateAlphabetSize: (newSize: number[]) => void,
    updatePatternLength: (newLength: number[]) => void,
    updateTextLength: (newLength: number[]) => void,
}

export const createAlgoPerfSlice: StateCreator<AlgoPerfSlice & AlgoVizSlice & SharedSlice, [], [], AlgoPerfSlice> = (set) => ({
    alphabetSize: 8,
    patternLength: 8,
    textLength: 100000,

    updateAlphabetSize: (size) => set(() => ({ alphabetSize: size[0] })),
    updatePatternLength: (length) => set(() => ({ patternLength: length[0] })),
    updateTextLength: (length) => set(() => ({ textLength: length[0] })),
})