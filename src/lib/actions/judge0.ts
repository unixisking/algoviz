export async function getSubmission(token: string) {
  const response = await fetch(
    `${process.env.JUDGE0_API_KEY}/submissions/${token}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  )

  return await response.json()
}

// export async function submission(url: string, code: string): string {}
