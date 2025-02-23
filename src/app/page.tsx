import { Separator } from '@/components/ui/separator'
import { CodeViewer } from '@/components/ui/code-viewer'
import { PresetActions } from '@/components/ui/preset-actions'
import { PresetSave } from '@/components/ui/preset-save'
import { PresetShare } from '@/components/ui/preset-share'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ToggleTheme } from '@/components/ToggleTheme'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AlgoOptions from '@/components/AlgoOptions'
import PerfCharts from '@/components/PerfCharts'
import IDE from '@/components/IDE'
import PerfTable from '@/components/PerfTable'
import { CommandMenu } from '@/components/CommandMenu'
import { PresetSelector } from '@/components/ui/preset-selector'
import { presets } from '@/data/presets'
// import { PresetSelector } from '@/components/ui/preset-selector'
// import { presets } from '@/data/presets'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import Chat from '@/components/Chat'
import { Output } from '@/components/Output'
import CodeRunner from '@/components/CodeRunner'

export default function PlaygroundPage() {
  return (
    <ThemeProvider>
      <div className="hidden h-full flex-col md:flex p-4 mx-auto max-w-[95%]">
        <Tabs defaultValue="codelab" className="">
          <TabsList>
            <TabsTrigger
              className="py-2 data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
              value="codelab"
            >
              CodeLab
            </TabsTrigger>
            <TabsTrigger
              className="py-2 data-[state=active]:bg-neutral-900 data-[state=active]:text-white"
              value="perf"
            >
              Performance Benchmarks
            </TabsTrigger>
          </TabsList>
          <TabsContent value="perf">
            <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
              <h2 className="text-lg font-semibold w-full">
                Performance Benchmarks of Pattern Matching Algorithms
              </h2>
              <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                <CommandMenu />
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
                      <div className="grid grid-cols-6 w-full">
                        <PerfCharts />
                        <PerfTable />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="codelab">
            <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
              <h2 className="text-lg font-semibold w-full">
                Code Lab: Test your algorithms here
              </h2>
              <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                <div className="hidden space-x-2 md:flex">
                  <PresetSelector presets={presets} />
                  {/* <CodeViewer /> */}
                  <CodeRunner />
                </div>
                <ToggleTheme />
              </div>
            </div>
            <Separator />
            <ResizablePanelGroup
              direction="horizontal"
              className="max-w-vw rounded-lg border"
            >
              <ResizablePanel defaultSize={70}>
                <IDE />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={80}>
                    <Chat />
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel className="relative">
                    <div className="bg-black/90 text-white text-sm h-full">
                      <p className="border border-white p-1">Output</p>
                      <Output />
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>
        </Tabs>

        {/* </Tabs> */}
      </div>
    </ThemeProvider>
  )
}
