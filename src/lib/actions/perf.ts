'use server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs'

import { IBenchmark } from '@/lib/store/perf-slice'

const execFileAsync = promisify(execFile)

interface SubmitOptions {
  kinds: string[]
  textSize: number
  patternLength: number
  alphabetSize: number
}

interface AlgosMetrics {
  kind: string
  metrics: IBenchmark[]
}

export async function submit(
  options: SubmitOptions
): Promise<AlgosMetrics[] | undefined> {
  const { kinds, textSize, patternLength, alphabetSize } = options

  const programFilePath = path.join(
    process.cwd(),
    'src',
    'bin',
    process.env.NODE_ENV === 'production' ? 'program_linux' : 'program'
  )

  if (!fs.existsSync(programFilePath)) {
    throw new Error(`Binary file not found at: ${programFilePath}`)
  }

  const allMetrics: AlgosMetrics[] = []

  for (const kind of kinds) {
    const metrics = []
    for (let i = 2; i <= alphabetSize; i = i + 6) {
      const { stdout, stderr } = await execFileAsync(programFilePath, [
        '-k',
        kind,
        '-t',
        textSize.toString(),
        '-l',
        patternLength.toString(),
        '-a',
        i.toString(),
      ])
      if (stderr) {
        console.log('Error executing binary', stderr)
        return
      }
      metrics.push({ alphabetSize: i, time: parseFloat(stdout) })
    }
    allMetrics.push({ kind, metrics })
  }

  return allMetrics
}

export async function genReport(textInput: string): Promise<string> {
  const response = await fetch(
    'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'x-use-cache': 'false',
      },
      body: JSON.stringify({
        inputs: textInput,
        parameters: { max_new_tokens: 100, return_full_text: false },
      }),
    }
  )
  const result = await response.json()
  console.log(result)
  return result[0].generated_text
}
