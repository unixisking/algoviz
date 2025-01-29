'use server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import path from 'path'

import { IBenchmark } from '@/lib/store/perf-slice'

const execFileAsync = promisify(execFile)

interface SubmitOptions {
    kind: string
    textSize: number
    patternLength: number
    alphabetSize: number
}

export async function submit(options: SubmitOptions): Promise<IBenchmark[] | undefined> {
    const { kind, textSize, patternLength, alphabetSize } = options
    const metrics = []

    const programFilePath = path.join(process.cwd(), 'src', 'bin', 'program')

    for (let i = 2; i <= alphabetSize; i = i + 6) {
        const { stdout, stderr } = await execFileAsync(
            programFilePath,
            [
                '-k',
                kind,
                '-t',
                textSize.toString(),
                '-l',
                patternLength.toString(),
                '-a',
                i.toString(),
            ]
        )
        if (stderr) {
            console.log("Error executing binary", stderr)
            return
        }
        metrics.push({ alphabetSize: i, time: parseFloat(stdout) })
    }
    console.log("metrics", metrics)

    return metrics
}