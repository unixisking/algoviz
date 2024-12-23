'use client'

import { ArrowBigLeft, ArrowBigRight, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CodeViewer } from "@/components/ui/code-viewer"
import { WordLengthSelector } from "@/components/ui/wordlength-selector"
import { AlgoSelector } from "@/components/ui/model-selector"
import { PresetActions } from "@/components/ui/preset-actions"
import { PresetSave } from "@/components/ui/preset-save"
import { PresetSelector } from "@/components/ui/preset-selector"
import { PresetShare } from "@/components/ui/preset-share"
import { TextSizeSelector } from "@/components/ui/textsize-selector"
import { AlphabetSizeSizeSelector } from "@/components/ui/alphabet-size-selector"
import { algos, types } from "@/data/models"
import { presets } from "@/data/presets"
import { useStore } from "@/lib/store"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ToggleTheme } from "@/components/ToggleTheme"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PlaygroundPage() {
    const alphabetSize = useStore(state => state.alphabetSize)
    const patternLength = useStore(state => state.patternLength)
    const textLength = useStore(state => state.textLength)
    const currentAlgo = useStore(state => state.currentAlgo)

    const updateAlphabetSize = useStore(state => state.updateAlphabetSize)
    const updatePatternLength = useStore(state => state.updatePatternLength)
    const updateTextLength = useStore(state => state.updateTextLength)
    const updateAlgo = useStore(state => state.updateAlgo)


    return (
        <ThemeProvider>
            <div className="hidden h-full flex-col md:flex p-4 mx-auto max-w-[90%]">
                <Tabs defaultValue="perf" className="">
                    <TabsList>
                        <TabsTrigger
                            className="py-2 data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
                            value="perf">Performance Benchmarks</TabsTrigger>
                        <TabsTrigger
                            className="py-2 data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
                            value="viz">Algorithms Visualizations</TabsTrigger>
                    </TabsList>
                    <TabsContent value="perf">
                        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                            <h2 className="text-lg font-semibold w-full">Performance Benchmarks of Pattern Matching Algorithms</h2>
                            <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                                <PresetSelector presets={presets} />
                                <PresetSave />
                                <div className="hidden space-x-2 md:flex">
                                    <CodeViewer />
                                    <PresetShare />
                                </div>
                                <PresetActions />
                                <ToggleTheme />
                            </div>
                        </div>
                        <Separator />
                        <div className="container h-full py-6">
                            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                                <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                                    <AlgoSelector types={types} models={algos} selectedAlgo={currentAlgo} onAlgoChange={updateAlgo} />
                                    <AlphabetSizeSizeSelector onChange={updateAlphabetSize} value={[alphabetSize]} />
                                    <TextSizeSelector onChange={updateTextLength} value={[textLength]} />
                                    <WordLengthSelector onChange={updatePatternLength} value={[patternLength]} />
                                </div>
                                <div className="md:order-1">
                                    <div className="flex h-[80vh] flex-col space-y-4">
                                        <div className="space-y-2 pl-4 py-1 border-2 border-neutral-900/10 h-full"></div>
                                        <div className="flex items-center space-x-2">
                                            <Button>Run</Button>
                                            <Button variant="secondary">
                                                <span className="sr-only">Restart</span>
                                                <RotateCcw />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </TabsContent>
                    <TabsContent value="viz">
                        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                            <h2 className="text-lg font-semibold w-full">Pattern Matching Algorithms Visualizations</h2>
                            <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                                <div className="hidden space-x-2 md:flex">
                                    <CodeViewer />
                                </div>
                                <ToggleTheme />
                            </div>
                        </div>
                        <Separator />
                        <div className="container h-full py-6">
                            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                                <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                                    <AlgoSelector types={types} models={algos} selectedAlgo={currentAlgo} onAlgoChange={updateAlgo} />
                                    <AlphabetSizeSizeSelector onChange={updateAlphabetSize} value={[alphabetSize]} />
                                    <TextSizeSelector onChange={updateTextLength} value={[textLength]} />
                                    <WordLengthSelector onChange={updatePatternLength} value={[patternLength]} />
                                </div>
                                <div className="md:order-1">
                                    <div className="flex h-[80vh] flex-col space-y-4">
                                        <div className="space-y-2 pl-4 py-1 border-2 border-neutral-900/10 h-full"></div>
                                        <div className="flex items-center space-x-2">
                                            <Button>Run</Button>
                                            <Button variant="secondary">
                                                <span className="sr-only">Back</span>
                                                <ArrowBigLeft />
                                            </Button>
                                            <Button variant="secondary">
                                                <span className="sr-only">Forward</span>
                                                <ArrowBigRight />
                                            </Button>
                                            <Button variant="secondary">
                                                <span className="sr-only">Restart</span>
                                                <RotateCcw />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </TabsContent>
                </Tabs>

                {/* </Tabs> */}
            </div>
        </ThemeProvider>
    )
}
