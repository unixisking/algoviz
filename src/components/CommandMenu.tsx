'use client'

import * as React from 'react'

import {
  CommandDialog,
  //   CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  //   CommandSeparator,
  //   CommandShortcut,
} from '@/components/ui/command'
import { MagicIcon } from './PerfCharts'
import { InputAI } from './InputAI'
import { Button } from './ui/button'

import { genReport } from '@/lib/actions/perf'

export function CommandMenu() {
  const [response, setResponse] = React.useState<string | null>(null)
  const [searchedText, setSearchedText] = React.useState('')
  const [open, setOpen] = React.useState(false)
  console.log('reponse from cmdk', response)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen((open) => !open)}
        className="inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-[18px] relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
      >
        <span className="inline-flex">Command prompt</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.4rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>J
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          onValueChange={(text) => setSearchedText(text)}
          value={searchedText}
          placeholder="Type a command or search..."
        />
        <CommandList>
          {/* <CommandEmpty>No results found.</CommandEmpty> */}
          <CommandGroup heading="AI Assistant" className="text-sm">
            <div className="p-2 flex text-sm">
              <MagicIcon className="flex-shrink-0 mr-2" />
              <p>
                <InputAI
                  text="
                Hello I'm AlgoTeach AI Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Labore sit eos omnis placeat id
                mollitia facilis repellendus"
                />
              </p>
            </div>
            {response ? (
              <div className="p-2">
                <CommandItem>Hello</CommandItem>
                <p className="font-bold">Response :</p>
                <InputAI text={response} />
              </div>
            ) : (
              <div className="pl-2">
                <p className="font-bold mt-2">Suggested Prompts</p>
                <div className="mt-4">
                  <CommandItem>
                    <Button
                      onClick={async () => {
                        setSearchedText(
                          'What is a pattern matching algorithm ?'
                        )
                        const response = await genReport(
                          'What is a pattern matching algorithm ?'
                        )
                        if (response) {
                          setResponse(response)
                        }
                      }}
                      variant={'outline'}
                    >
                      What is a pattern matching algorithm ?
                    </Button>
                  </CommandItem>
                  <CommandItem>
                    <Button
                      onClick={() =>
                        setSearchedText('Explain the performance results')
                      }
                      variant={'outline'}
                    >
                      Explain the performance results
                    </Button>
                  </CommandItem>
                  <CommandItem>
                    <Button
                      onClick={() =>
                        setSearchedText('Explain the performance results')
                      }
                      variant={'outline'}
                    >
                      Which one is the fastest ?
                    </Button>
                  </CommandItem>
                </div>
              </div>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
