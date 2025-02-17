'use client'

import * as React from 'react'
import { PopoverProps } from '@radix-ui/react-popover'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useMutationObserver } from '@/hooks/use-mutation-observer'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { Algo, AlgoType } from '@/data/models'
// import { SharedSlice } from '@/lib/store'

interface ModelSelectorProps extends PopoverProps {
  types: readonly AlgoType[]
  models: Algo[]
  //   setCurrentAlgo: (model: Algo) => void
  currentAlgo: Algo
  // setCurrentAlgo: SharedSlice['updateAlgo']
  setCurrentAlgo: (algo: Algo) => void
}

export function AlgoSelector({
  models,
  currentAlgo,
  setCurrentAlgo,
  types,
  ...props
}: ModelSelectorProps) {
  const [open, setOpen] = React.useState(false)
  // const [selectedModel, setSelectedModel] = React.useState<Model>(models[0])
  const [peekedModel, setPeekedModel] = React.useState<Algo>(models[0])
  // console.log('selected', selectedAlgos)

  return (
    <div className="grid gap-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">First Algorithm</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The pattern matching algorithm that will be used
        </HoverCardContent>
      </HoverCard>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {currentAlgo ? currentAlgo.name : 'Select a model...'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <HoverCard>
            <HoverCardContent
              side="left"
              align="start"
              forceMount
              className="min-h-[280px]"
            >
              <div className="grid gap-2">
                <h4 className="font-medium leading-none">{peekedModel.name}</h4>
                <div className="text-sm text-muted-foreground">
                  {peekedModel.description}
                </div>
                {peekedModel.strengths ? (
                  <div className="mt-4 grid gap-2">
                    <h5 className="text-sm font-medium leading-none">
                      Strengths
                    </h5>
                    <ul className="text-sm text-muted-foreground">
                      {peekedModel.strengths}
                    </ul>
                  </div>
                ) : null}
              </div>
            </HoverCardContent>
            <Command loop>
              <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
                <CommandInput placeholder="Search Models..." />
                <CommandEmpty>No Models found.</CommandEmpty>
                <HoverCardTrigger />
                {types.map((type) => (
                  <CommandGroup key={type} heading={type}>
                    {models
                      .filter((model) => model.type === type)
                      .map((algo) => (
                        <ModelItem
                          key={algo.id}
                          algo={algo}
                          isSelected={currentAlgo.id === algo.id}
                          onPeek={(model) => setPeekedModel(model)}
                          onSelect={() => {
                            setCurrentAlgo(algo)
                            setOpen(false)
                          }}
                        />
                      ))}
                  </CommandGroup>
                ))}
              </CommandList>
            </Command>
          </HoverCard>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface ModelItemProps {
  algo: Algo
  isSelected: boolean
  onSelect: () => void
  onPeek: (model: Algo) => void
}

function ModelItem({ algo, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  // eslint-disable-next-line
  useMutationObserver(ref, (mutations: any[]) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'aria-selected' &&
        ref.current?.getAttribute('aria-selected') === 'true'
      ) {
        onPeek(algo)
      }
    })
  })

  return (
    <CommandItem
      key={algo.id}
      onSelect={onSelect}
      ref={ref}
      className="data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground"
    >
      {algo.name}
      <Check
        className={cn('ml-auto', isSelected ? 'opacity-100' : 'opacity-0')}
      />
    </CommandItem>
  )
}
