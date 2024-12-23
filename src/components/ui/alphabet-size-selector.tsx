"use client"

import { SliderProps } from "@radix-ui/react-slider"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface AlphabetSizeSelectorProps {
  value: SliderProps['value']
  onChange: SliderProps['onValueChange']
}

export function AlphabetSizeSizeSelector({ value, onChange }: AlphabetSizeSelectorProps) {
  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="alphabet-size">Alphabet Size</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="alphabet-size"
              max={70}
              min={2}
              defaultValue={value}
              step={1}
              onValueChange={onChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="alphabet Size"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The alphabet size used in the text and patterns. Only printable ASCII characters are used.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
