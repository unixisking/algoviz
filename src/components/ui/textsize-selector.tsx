"use client"

import * as React from "react"
import { SliderProps } from "@radix-ui/react-slider"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface TextSizeSelectorProps {
  value: SliderProps["defaultValue"]
  onChange: SliderProps["onValueChange"]
}

export function TextSizeSelector({
  value,
  onChange
}: TextSizeSelectorProps) {

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="text-size">Text Length</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {value}
              </span>
            </div>
            <Slider
              id="text-size"
              max={500000}
              defaultValue={value}
              step={10000}
              onValueChange={onChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Text Length"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
          The text length to generate.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
