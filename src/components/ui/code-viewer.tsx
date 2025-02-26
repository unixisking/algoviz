'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { presets } from '@/data/presets'
import { useStore } from '@/lib/store'
import Highlight from 'react-highlight'
import { useTheme } from '../ThemeProvider'
import clsx from 'clsx'

export function CodeViewer() {
  const { appliedTheme } = useTheme()
  const currentFirstAlgo = useStore((state) => state.currentFirstAlgo)
  const currentSecondAlgo = useStore((state) => state.currentSecondAlgo)

  const firstAlgoCode = presets.filter((p) => p.id === currentFirstAlgo.id)[0]
    .code
  const secondAlgoCode = presets.filter((p) => p.id === currentSecondAlgo.id)[0]
    .code

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">View code</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Algorithm Code</DialogTitle>
          <DialogDescription>
            This is the code of the selected searching algorithm written in C
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="first" className="w-full">
          <TabsList>
            <TabsTrigger value="first">First Algorithm</TabsTrigger>
            <TabsTrigger value="second">Second Algorithm</TabsTrigger>
          </TabsList>
          <TabsContent value="first" className="max-h-80 overflow-auto">
            <Highlight
              className={clsx('c text-sm', {
                'hljs-dark': appliedTheme === 'dark',
                'hljs-light': appliedTheme === 'light',
              })}
            >
              {firstAlgoCode}
            </Highlight>
          </TabsContent>
          <TabsContent value="second" className="max-h-80 overflow-auto">
            <Highlight
              className={clsx('c text-sm', {
                'hljs-dark': appliedTheme === 'dark',
                'hljs-light': appliedTheme === 'light',
              })}
            >
              {secondAlgoCode}
            </Highlight>
          </TabsContent>
        </Tabs>
        <div>
          <p className="text-sm text-muted-foreground">
            To view the code of the project, please visit the{' '}
            <a
              className="underline"
              href="https://github.com/unixisking/pattern-matching-algorithms"
            >
              Github repository
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
