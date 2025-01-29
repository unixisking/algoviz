export const types = ["Brute Force", "Left to right", "Right to Left"] as const

export type AlgoType = (typeof types)[number]

export interface Algo<Type = AlgoType> {
    id: string
    name: string
    description: string
    strengths?: string
    type: Type
}

export const algos: Algo<AlgoType>[] = [
    {
        id: "bf",
        name: "Brute Force Algorithm",
        description:
            "The brute force algorithm is a simple and straightforward algorithm that compares the pattern with the text at every position.",
        type: "Brute Force",
        strengths:
            "Simple to implement, easy to understand, and works well for small datasets",
    },
    {
        id: "mp",
        name: "Morris-Pratt Algorithm",
        description: "The Morris-Pratt algorithm is a more efficient string searching algorithm that uses a prefix function to avoid unnecessary comparisons.",
        type: "Left to right",
        strengths:
            "Efficient for large datasets, avoids unnecessary comparisons",
    },
    {
        id: "kmp",
        name: "Knuth-Morris-Pratt Algorithm",
        description: "The Knuth-Morris-Pratt algorithm is a more efficient string searching algorithm that uses a prefix function to avoid unnecessary comparisons.",
        type: "Left to right",
        strengths:
            "Efficient for large datasets, avoids unnecessary comparisons",
    },
    {
        id: "bm",
        name: "Boyer-Moore Algorithm",
        description: "The Boyer-Moore algorithm is an efficient string searching algorithm that uses two heuristics to skip unnecessary comparisons.",
        type: "Right to Left",
        strengths: "Efficient for large datasets, skips unnecessary comparisons",
    },
    {
        id: "hp",
        name: "Horspool",
        description:
            "The Horspool algorithm is a simple and efficient string searching algorithm that uses a bad character rule to skip unnecessary comparisons.",
        type: "Right to Left",
        strengths:
            "Simple to implement, efficient for large datasets, skips unnecessary comparisons",
    },
]
