'use server'

import { C_LANGUAGE_ID, isSubmissionError } from '../constants'

export async function submission(source_code: string) {
  const params = new URLSearchParams({
    base64_encoded: 'true',
    wait: 'true',
  })
  try {
    const submission = await fetch(
      `${process.env.JUDGE0_API_KEY}/submissions?${params.toString()}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          source_code: btoa(source_code),
          language_id: C_LANGUAGE_ID,
          params,
        }),
      }
    )
    const submissionResponse = await submission.json()
    const isError = isSubmissionError(submissionResponse.status.description)

    return {
      success: !isError,
      response: {
        ...submissionResponse,
        stdout: isError
          ? submissionResponse.stdout
          : atob(submissionResponse.stdout),
      },
    }
  } catch (error) {
    console.error('Error during submission call', error)
    return { sucess: false, message: 'Error during submission call' }
  }
}
