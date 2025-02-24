// Based on Judge0 API
export const C_LANGUAGE_ID = 50

enum SubmissionStatus {
  IN_QUEUE = 'In Queue',
  PROCESSING = 'Processing',
  ACCEPTED = 'Accepted',
}

enum SubmissionError {
  WRONG_ANSWER = 'Wrong Answer',
  TIME_LIMIT_EXCEEDED = 'Time Limit Exceeded',
  COMPILATION_ERROR = 'Compilation Error',
  RUNTIME_ERROR_SIGSEGV = 'Runtime Error (SIGSEGV)',
  RUNTIME_ERROR_SIGXFSZ = 'Runtime Error (SIGXFSZ)',
  RUNTIME_ERROR_SIGFPE = 'Runtime Error (SIGFPE)',
  RUNTIME_ERROR_SIGABRT = 'Runtime Error (SIGABRT)',
  RUNTIME_ERROR_NZEC = 'Runtime Error (NZEC)',
  RUNTIME_ERROR_OTHER = 'Runtime Error (Other)',
  INTERNAL_ERROR = 'Internal Error',
  EXEC_FORMAT_ERROR = 'Exec Format Error',
}

export enum SubmissionResult {
  ACCEPTED = SubmissionStatus.ACCEPTED,
  ERROR = 'Error',
  IN_QUEUE = SubmissionStatus.IN_QUEUE,
}

const submissionErrorSet = new Set<string>(Object.values(SubmissionError))
const submissionStatusSet = new Set<string>(Object.values(SubmissionStatus))
const submissionResultSet = new Set<string>(Object.values(SubmissionResult))

export function isSubmissionError(value: string): value is SubmissionError {
  return submissionErrorSet.has(value)
}

export function isSubmissionStatus(value: string): value is SubmissionStatus {
  return submissionStatusSet.has(value)
}

export function isSubmissionResult(value: string): value is SubmissionResult {
  return submissionResultSet.has(value)
}
