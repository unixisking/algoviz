import { getSubmission } from '@/lib/actions/judge0'

export async function Output() {
  const output = await getSubmission('812bd105-f0fe-4eeb-9a75-7d964c1f41c7')
  return <div className="px-2 pt-2">{output.stdout}</div>
}
