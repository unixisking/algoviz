'use client'

import { SubmissionResult } from '@/lib/constants'
import { useStore } from '@/lib/store'
import clsx from 'clsx'
import { SquareChevronRight } from 'lucide-react'

export function Output() {
  const codeResult = useStore((store) => store.codeResult)
  return (
    <div className="text-sm h-full overflow-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="border-r pr-2 ">
            <SquareChevronRight className="w-5 h-5 flex-shrink-0" />
          </div>
          Console
        </div>
        {codeResult?.status && (
          <span
            className={clsx(
              'inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium ring-1 ring-inset',
              {
                'bg-green-50 text-green-700 ring-green-600/20 ':
                  codeResult?.status === SubmissionResult.ACCEPTED,
                'bg-red-50 text-red-700 ring-red-600/10':
                  codeResult?.status === SubmissionResult.ERROR,
              }
            )}
          >
            {codeResult?.status === SubmissionResult.ERROR
              ? 'compilation-error'
              : 'Success'}
          </span>
        )}
      </div>
      {codeResult && (
        <div className="px-2 pt-2">
          {codeResult?.status === SubmissionResult.ACCEPTED ? (
            codeResult.output
          ) : (
            <pre className="text-red-700">{codeResult.compile_output}</pre>
          )}
        </div>
      )}
    </div>
  )
}
