export type stepsState = { i: number, j: number, action: SHIFT_OPERATION, shift: number }[]

interface IBF {
    found: number
    steps: stepsState
}

export enum SHIFT_OPERATION {
    SHIFT_PATTERN = "SHIFT_PATTERN",
    SHIFT_TEXT = "SHIFT_TEXT"
}

export function bf(text: string, pattern: string): IBF {
    const n = text.length
    const m = pattern.length
    const steps = []
    const { SHIFT_PATTERN, SHIFT_TEXT } = SHIFT_OPERATION

    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        while (j <= m - 1 && pattern[j] == text[i + j]) {
            j++
            steps.push({ i: i + j, j, action: SHIFT_TEXT, shift: 1 })
        }

        if (j == m) {
            steps.push({ i: i + 1, j: 0, action: SHIFT_PATTERN, isPatternMatched: true, patternIndex: i, shift: 1 })
        }
        else {
            steps.push({ i: i + 1, j: 0, action: SHIFT_PATTERN, shift: 1 })
        }
    }
    return { steps, found: -1 }
}

function preMp(pattern: string) {
    const m = pattern.length
    const mpNext = new Array(m + 1).fill(0)
    let i = 0
    let j = mpNext[0] = -1

    while (i < m) {
        while (j > -1 && pattern[i] != pattern[j]) {
            j = mpNext[j]
        }
        mpNext[++i] = ++j
    }
    return mpNext
}

export function MP(text: string, pattern: string): IBF {
    const m = pattern.length
    const n = text.length
    const mpNext = preMp(pattern)
    const steps = []
    let i = 0, j = 0
    const { SHIFT_PATTERN, SHIFT_TEXT } = SHIFT_OPERATION

    while (i < n) {
        // We didn't match the letter from text at index i with the letter from pattern at index j
        while (j > -1 && pattern[j] != text[i]) {
            steps.push({ i, j: Math.max(0, mpNext[j]), action: SHIFT_PATTERN, shift: j - mpNext[j] })
            j = mpNext[j]
        }
        j++
        i++
        // we matched the pattern
        if (j >= m) {
            steps.push({ i, j: i - j, action: SHIFT_PATTERN, isPatternMatched: true, patternIndex: i - j, shift: j - mpNext[j] })
            j = mpNext[j]
        }
        // we didn't match the pattern yet but we matched part of it and we are still looking for the rest
        else {
            steps.push({ i, j, action: SHIFT_TEXT, shift: 1 })
        }
    }
    return { steps, found: -1 }
}
