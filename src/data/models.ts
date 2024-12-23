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
        id: "c305f976-8e38-42b1-9fb7-d21b2e34f0da",
        name: "Brute Force Algorithm",
        description:
            "The brute force algorithm is a simple and straightforward algorithm that compares the pattern with the text at every position.",
        type: "Brute Force",
        strengths:
            "Simple to implement, easy to understand, and works well for small datasets",
    },
    {
        id: "464a47c3-7aa7b5-44d7-b669-f9cb5a9e8465",
        name: "Morris-Pratt Algorithm",
        description: "The Morris-Pratt algorithm is a more efficient string searching algorithm that uses a prefix function to avoid unnecessary comparisons.",
        type: "Left to right",
        strengths:
            "Efficient for large datasets, avoids unnecessary comparisons",
    },
    {
        id: "464a47c3-7ab5-44d7-b669-f9cb5a9e8465",
        name: "Knuth-Morris-Pratt Algorithm",
        description: "The Knuth-Morris-Pratt algorithm is a more efficient string searching algorithm that uses a prefix function to avoid unnecessary comparisons.",
        type: "Left to right",
        strengths:
            "Efficient for large datasets, avoids unnecessary comparisons",
    },
    {
        id: "ac0797b0-7e31-43b6-a494-da7e2ab43445",
        name: "Boyer-Moore Algorithm",
        description: "The Boyer-Moore algorithm is an efficient string searching algorithm that uses two heuristics to skip unnecessary comparisons.",
        type: "Right to Left",
        strengths: "Efficient for large datasets, skips unnecessary comparisons",
    },
    {
        id: "be638fb1-973b-4471-a49c-290325085802",
        name: "Horspool",
        description:
            "The Horspool algorithm is a simple and efficient string searching algorithm that uses a bad character rule to skip unnecessary comparisons.",
        type: "Right to Left",
        strengths:
            "Simple to implement, efficient for large datasets, skips unnecessary comparisons",
    },
]
