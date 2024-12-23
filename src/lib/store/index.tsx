import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AlgoPerfSlice, createAlgoPerfSlice } from './perf-slice'
import { AlgoVizSlice, createAlgoVizSlice } from './viz-slice'
import { Algo, algos } from '@/data/models'

export interface SharedSlice {
    currentAlgo: Algo

    updateAlgo: (newAlgo: Algo) => void
}

const createSharedSlice: StateCreator<AlgoPerfSlice & AlgoVizSlice & SharedSlice, [], [], SharedSlice> = (set) => ({
    currentAlgo: algos[0],

    updateAlgo: (newAlgo) => set(() => ({ currentAlgo: newAlgo })),
})

export const useStore = create<AlgoPerfSlice & AlgoVizSlice & SharedSlice>()(
    devtools(
        persist(
            (...args) => ({
                ...createAlgoPerfSlice(...args),
                ...createAlgoVizSlice(...args),
                ...createSharedSlice(...args),
            }),
            {
                name: 'algoviz-store',
            }
        ))
)
