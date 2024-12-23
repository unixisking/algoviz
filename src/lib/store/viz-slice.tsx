import { StateCreator } from "zustand";
import { SharedSlice } from ".";
import { stepsState } from "../algos";
import { AlgoPerfSlice } from "./perf-slice";

export interface AlgoVizSlice {
    pattern: string,
    text: string,
    steps: stepsState[],
    currentStep: number,

    updatePattern: (newPattern: string) => void,
    updateText: (newText: string) => void,
    updateSteps: (newSteps: stepsState[]) => void,
    updateCurrentStep: (newStep: number) => void,
}

export const createAlgoVizSlice: StateCreator<AlgoPerfSlice & AlgoVizSlice & SharedSlice, [], [], AlgoVizSlice> = (set) => ({
    pattern: "",
    text: "",
    steps: [],
    currentStep: 0,

    updatePattern: (pattern) => set(() => ({ pattern })),
    updateText: (text) => set(() => ({ text })),
    updateSteps: (steps) => set(() => ({ steps })),
    updateCurrentStep: (nextStep) => set(() => ({ currentStep: nextStep })),
})