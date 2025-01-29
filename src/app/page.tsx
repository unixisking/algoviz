import { ArrowBigLeft, ArrowBigRight, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CodeViewer } from "@/components/ui/code-viewer"
import { PresetActions } from "@/components/ui/preset-actions"
import { PresetSave } from "@/components/ui/preset-save"
import { PresetSelector } from "@/components/ui/preset-selector"
import { PresetShare } from "@/components/ui/preset-share"
import { presets } from "@/data/presets"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ToggleTheme } from "@/components/ToggleTheme"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AlgoOptions from "@/components/AlgoOptions"
import { LineChart } from "@/components/AreaChart"
import PerfCharts from "@/components/PerfCharts"

export default function PlaygroundPage() {
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
                                    <AlgoOptions />
                                </div>
                                <div className="md:order-1">
                                    <div className="flex h-[80vh] flex-col space-y-4">
                                        <div className="space-y-2 pl-4 py-1 border-2 border-neutral-900/10 h-full">
                                            <PerfCharts />
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
                                    <AlgoOptions />
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
