
'use client'

import { createContext, Dispatch, SetStateAction } from 'react';
import { stepsState } from "./algos";

export enum ALGO_KIND {
    BF,
    MP,
    KMP,
    BM,
    HP,
    QS
}

interface IAlgoContextProps {
    kind: ALGO_KIND
    text: string
    pattern: string
    steps: stepsState | null
    setText: (value: string) => void
    setPattern: (value: string) => void
    setSteps: Dispatch<SetStateAction<stepsState | null>>
    setKind: (value: ALGO_KIND) => void
    move: (kind: "back" | "forward") => void
}
export const AlgoContext = createContext<IAlgoContextProps>({
    kind: ALGO_KIND.BF,
    text: "",
    pattern: "",
    steps: [],
    setText: function (): void {
        throw new Error("Function not implemented.");
    },
    setPattern: function (): void {
        throw new Error("Function not implemented.");
    },
    setKind: function (): void {
        throw new Error("Function not implemented.");
    },
    move: function (): void {
        throw new Error("Function not implemented.");
    },
    setSteps: function (): void {
        throw new Error("Function not implemented.");
    },
});