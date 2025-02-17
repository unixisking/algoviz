import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { AlgoPerfSlice, createAlgoPerfSlice } from './perf-slice'
import { AlgoVizSlice, createAlgoVizSlice } from './viz-slice'
import { Algo, algos } from '@/data/models'

export interface SharedSlice {
  currentFirstAlgo: Algo
  currentSecondAlgo: Algo
  // updateAlgo: (newAlgo: Algo, key: keyof SharedSlice['currentAlgo']) => void
  updateFirstAlgo: (algo: Algo) => void
  updateSecondAlgo: (algo: Algo) => void
}

const createSharedSlice: StateCreator<
  AlgoPerfSlice & AlgoVizSlice & SharedSlice,
  [],
  [],
  SharedSlice
> = (set) => ({
  currentFirstAlgo: algos[0],
  currentSecondAlgo: algos[1],

  // updateAlgo: (newAlgo, key) => set(() => ()),
  updateFirstAlgo: (newAlgo) =>
    set(() => ({
      currentFirstAlgo: newAlgo,
    })),
  updateSecondAlgo: (newAlgo) =>
    set(() => ({
      currentSecondAlgo: newAlgo,
    })),
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
    )
  )
)
