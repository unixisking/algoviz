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

interface WordLengthSelectorProps {
    value: SliderProps["defaultValue"]
    onChange: SliderProps["onValueChange"]
}

export function WordLengthSelector({ value, onChange }: WordLengthSelectorProps) {
    return (
        <div className="grid gap-2 pt-2">
            <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                    <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="pattern-length">Maxiumum Pattern Length</Label>
                            <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                                {value}
                            </span>
                        </div>
                        <Slider
                            id="pattern-length"
                            max={20}
                            min={2}
                            defaultValue={value}
                            step={4}
                            onValueChange={onChange}
                            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                            aria-label="Maxiumum Pattern Length"
                        />
                    </div>
                </HoverCardTrigger>
                <HoverCardContent
                    align="start"
                    className="w-[260px] text-sm"
                    side="left"
                >
                    The maximum length of each word in the word list. Word lists contains a static number of words (100).
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}