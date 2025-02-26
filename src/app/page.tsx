import { Separator } from '@/components/ui/separator'
import { CodeViewer } from '@/components/ui/code-viewer'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ToggleTheme } from '@/components/ToggleTheme'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AlgoOptions from '@/components/AlgoOptions'
import PerfCharts from '@/components/PerfCharts'
import IDE from '@/components/IDE'
import PerfTable from '@/components/PerfTable'
import { PresetSelector } from '@/components/ui/preset-selector'
import { presets } from '@/data/presets'

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
      <div className="hidden h-full flex-col md:flex p-4 mx-auto  dark:bg-zinc-900 dark:text-zinc-100">
        <Tabs defaultValue="codelab" className="dark:text-zinc-100">
          <TabsList className="dark:bg-zinc-800">
            <TabsTrigger
              className="py-2 data-[state=active]:bg-neutral-900 data-[state=active]:text-white dark:data-[state=active]:bg-zinc-700 dark:data-[state=inactive]:text-zinc-400 dark:data-[state=inactive]:hover:bg-zinc-800/50"
              value="codelab"
            >
              CodeLab
            </TabsTrigger>
            <TabsTrigger
              className="py-2 data-[state=active]:bg-neutral-900 data-[state=active]:text-white dark:data-[state=active]:bg-zinc-700 dark:data-[state=inactive]:text-zinc-400 dark:data-[state=inactive]:hover:bg-zinc-800/50"
              value="perf"
            >
              Performance Benchmarks
            </TabsTrigger>
          </TabsList>
          <TabsContent value="perf" className="dark:bg-zinc-900">
            <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
              <h2 className="text-lg font-semibold w-full dark:text-zinc-100">
                Performance Benchmarks of Pattern Matching Algorithms
              </h2>
              <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                <div className="hidden space-x-2 md:flex">
                  <CodeViewer />
                </div>
                <ToggleTheme />
              </div>
            </div>
            <Separator className="dark:bg-zinc-700" />
            <div className="container h-full py-6">
              <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                  <AlgoOptions />
                </div>
                <div className="md:order-1">
                  <div className="flex h-[80vh] flex-col space-y-4">
                    <div className="space-y-2 pl-4 py-1 border-2 border-neutral-900/10 dark:border-zinc-700 h-full dark:bg-zinc-800">
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
          <TabsContent value="codelab" className="dark:bg-zinc-900">
            <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
              <h2 className="text-lg font-semibold w-full dark:text-zinc-100">
                Code Lab: Test your algorithms here
              </h2>
              <div className="ml-auto flex w-full space-x-2 sm:justify-end">
                <div className="hidden space-x-2 md:flex">
                  <PresetSelector presets={presets} />
                  <CodeRunner />
                </div>
                <ToggleTheme />
              </div>
            </div>
            <Separator className="dark:bg-zinc-700" />
            <ResizablePanelGroup
              direction="horizontal"
              style={{ height: '80vh' }}
              className="max-w-vw h-[] rounded-lg border dark:border-zinc-700"
            >
              <ResizablePanel defaultSize={70} className="dark:bg-zinc-800">
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={85} className="dark:bg-zinc-800">
                    <IDE />
                  </ResizablePanel>
                  <ResizableHandle className="dark:bg-zinc-700 dark:hover:bg-zinc-600" />
                  <ResizablePanel className="dark:bg-zinc-800">
                    <Output />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>

              <ResizableHandle className="dark:bg-zinc-700 dark:hover:bg-zinc-600" />

              <ResizablePanel defaultSize={30} className="dark:bg-zinc-800">
                <Chat />
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>
        </Tabs>
      </div>
    </ThemeProvider>
  )
}
