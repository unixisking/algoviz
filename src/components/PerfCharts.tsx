// PerfCharts Component

'use client'

import React, { useState } from 'react'
// import { LineChart } from './AreaChart'
import { useStore } from '@/lib/store'
import { AreaChartComponent } from './AreaChart'
import { Button } from './ui/button'
import { InputAI } from './InputAI'
import { genReport } from '@/app/actions'

export default function PerfCharts() {
  const metrics = useStore((state) => state.metrics)
  const [report, setReport] = React.useState<string | null>(null)
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null)

  const handleMouseEnter = (rowIndex: number) => {
    setHighlightedRow(rowIndex)
  }

  const handleMouseLeave = () => {
    setHighlightedRow(null)
  }

  console.log('report', report)

  return (
    <div>
      <div className="grid grid-cols-6 w-full space-y-4 ">
        <div className="col-span-4">
          <AreaChartComponent
            name="Performance Benchmarks"
            description="Comparison of different pattern lengths"
            data={metrics}
          />
          <Button
            onClick={async () => {
              const report = await genReport(
                'Teach me Morris Pratt pattern matching algorithm ?'
              )
              setReport(report)
            }}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <MagicIcon />
            <span
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgb(175, 82, 222), rgb(0, 122, 255))',
                WebkitTextFillColor: 'transparent',
              }}
              className="font-bold bg-clip-text"
            >
              Generate an analysis report with AI
            </span>
          </Button>

          {report && (
            <div className="mt-3">
              <InputAI text={report} />
            </div>
          )}
        </div>
        <div className="col-span-2 text-md">
          <div>
            <p className="font-bold">Morris Pratt</p>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Average Execution Time', value: '1.4ms' },
                  { metric: 'Complexity', value: '' },
                  { metric: 'Best Case', value: 'O(m)' },
                  { metric: 'Worst Case', value: 'O(m+n)' },
                  { metric: 'Average Case', value: 'O(m+n)' },
                ].map((item, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className={`cursor-default transition-colors duration-300 ${
                      highlightedRow === index ? 'bg-blue-100' : ''
                    }`}
                  >
                    <td className="border-b border-gray-300">{item.metric}</td>
                    <td className="border-b border-gray-300">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-1">
            <p className="font-bold">Boyer Mooore</p>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Average Execution Time', value: '1.4ms' },
                  { metric: 'Complexity', value: '' },
                  { metric: 'Best Case', value: 'O(m)' },
                  { metric: 'Worst Case', value: 'O(m+n)' },
                  { metric: 'Average Case', value: 'O(m+n)' },
                ].map((item, index) => (
                  <tr
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className={`cursor-default transition-colors duration-300 ${
                      highlightedRow === index ? 'bg-blue-100' : ''
                    }`}
                  >
                    <td className="border-b border-gray-300">{item.metric}</td>
                    <td className="border-b border-gray-300">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PromptCards />
    </div>
  )
}

const MagicIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    preserveAspectRatio="xMidYMid meet"
    // style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"
    style={{
      transform: 'translate3d(0px, 0px, 0px)',
      contentVisibility: 'visible',
    }}
    {...props}
  >
    <defs>
      <clipPath id="__lottie_element_2">
        <rect width="16" height="16" x="0" y="0"></rect>
      </clipPath>
      <linearGradient
        id="__lottie_element_6"
        spreadMethod="pad"
        gradientUnits="userSpaceOnUse"
        x1="1.906248688697815"
        y1="10.399575233459473"
        x2="22.883432388305664"
        y2="-0.09716971963644028"
      >
        <stop offset="0%" stopColor="rgb(175,82,222)"></stop>
        <stop offset="100%" stopColor="rgb(0,122,255)"></stop>
      </linearGradient>
    </defs>
    <g clip-path="url(#__lottie_element_2)">
      <g
        style={{ display: 'block' }}
        transform="matrix(1,0,0,1,1.0999999046325684,1.0999999046325684)"
        opacity="1"
      >
        <path
          fill="url(#__lottie_element_6)"
          fillOpacity="1"
          d=" M3.140000104904175,7.53000020980835 C3.309999942779541,7.53000020980835 3.4600000381469727,7.610000133514404 3.549999952316284,7.75 C3.549999952316284,7.75 4.559999942779541,9.239999771118164 4.559999942779541,9.239999771118164 C4.559999942779541,9.239999771118164 6.050000190734863,10.25 6.050000190734863,10.25 C6.190000057220459,10.34000015258789 6.269999980926514,10.489999771118164 6.269999980926514,10.65999984741211 C6.269999980926514,10.829999923706055 6.190000057220459,10.989999771118164 6.050000190734863,11.079999923706055 C6.050000190734863,11.079999923706055 4.559999942779541,12.09000015258789 4.559999942779541,12.09000015258789 C4.559999942779541,12.09000015258789 3.549999952316284,13.579999923706055 3.549999952316284,13.579999923706055 C3.4600000381469727,13.720000267028809 3.309999942779541,13.800000190734863 3.140000104904175,13.800000190734863 C2.9700000286102295,13.800000190734863 2.809999942779541,13.720000267028809 2.7200000286102295,13.579999923706055 C2.7200000286102295,13.579999923706055 1.7100000381469727,12.09000015258789 1.7100000381469727,12.09000015258789 C1.7100000381469727,12.09000015258789 0.2199999988079071,11.079999923706055 0.2199999988079071,11.079999923706055 C0.07999999821186066,10.989999771118164 0,10.829999923706055 0,10.65999984741211 C0,10.489999771118164 0.07999999821186066,10.34000015258789 0.2199999988079071,10.25 C0.2199999988079071,10.25 1.7100000381469727,9.239999771118164 1.7100000381469727,9.239999771118164 C1.7100000381469727,9.239999771118164 2.7200000286102295,7.75 2.7200000286102295,7.75 C2.809999942779541,7.610000133514404 2.9700000286102295,7.53000020980835 3.140000104904175,7.53000020980835 C3.140000104904175,7.53000020980835 3.140000104904175,7.53000020980835 3.140000104904175,7.53000020980835z M8.779999732971191,0 C8.989999771118164,0 9.180000305175781,0.12999999523162842 9.25,0.33000001311302185 C9.25,0.33000001311302185 10.390000343322754,3.4100000858306885 10.390000343322754,3.4100000858306885 C10.390000343322754,3.4100000858306885 13.470000267028809,4.550000190734863 13.470000267028809,4.550000190734863 C13.670000076293945,4.619999885559082 13.800000190734863,4.809999942779541 13.800000190734863,5.019999980926514 C13.800000190734863,5.230000019073486 13.670000076293945,5.420000076293945 13.470000267028809,5.489999771118164 C13.470000267028809,5.489999771118164 10.390000343322754,6.630000114440918 10.390000343322754,6.630000114440918 C10.390000343322754,6.630000114440918 9.25,9.710000038146973 9.25,9.710000038146973 C9.180000305175781,9.90999984741211 8.989999771118164,10.039999961853027 8.779999732971191,10.039999961853027 C8.569999694824219,10.039999961853027 8.380000114440918,9.90999984741211 8.3100004196167,9.710000038146973 C8.3100004196167,9.710000038146973 7.170000076293945,6.630000114440918 7.170000076293945,6.630000114440918 C7.170000076293945,6.630000114440918 4.090000152587891,5.489999771118164 4.090000152587891,5.489999771118164 C3.890000104904175,5.420000076293945 3.759999990463257,5.230000019073486 3.759999990463257,5.019999980926514 C3.759999990463257,4.809999942779541 3.890000104904175,4.619999885559082 4.090000152587891,4.550000190734863 C4.090000152587891,4.550000190734863 7.170000076293945,3.4100000858306885 7.170000076293945,3.4100000858306885 C7.170000076293945,3.4100000858306885 8.3100004196167,0.33000001311302185 8.3100004196167,0.33000001311302185 C8.380000114440918,0.12999999523162842 8.569999694824219,0 8.779999732971191,0 C8.779999732971191,0 8.779999732971191,0 8.779999732971191,0z"
        ></path>
      </g>
    </g>
  </svg>
)

const PromptCards = () => {
  {
    /* Prompt cards */
  }
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 text-slate-900 dark:text-slate-200 sm:grid-cols-2 lg:grid-cols-3"
    >
      <li className="group col-span-1 rounded-lg bg-slate-50 shadow transition-colors duration-300 hover:bg-blue-600 dark:bg-slate-900 dark:hover:bg-blue-600">
        <a
          className="flex cursor-pointer items-center justify-between space-x-6 truncate p-6"
          href=""
        >
          <div className="flex flex-col items-center gap-y-1 rounded-lg text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M14 6l7 7l-4 4"></path>
              <path d="M5.828 18.172a2.828 2.828 0 0 0 4 0l10.586 -10.586a2 2 0 0 0 0 -2.829l-1.171 -1.171a2 2 0 0 0 -2.829 0l-10.586 10.586a2.828 2.828 0 0 0 0 4z"></path>
              <path d="M4 20l1.768 -1.768"></path>
            </svg>
          </div>
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="text-sm font-medium text-slate-900 transition-colors duration-300 group-hover:text-slate-50 dark:text-slate-200">
                Screenwriter
              </h3>
            </div>
            <p className="mt-1 truncate text-sm text-slate-500 transition-colors duration-300 group-hover:text-slate-300">
              I want you to act as a screenwriter. You will develop an engaging
              and creative script for either a feature length film or a Web
              Series that can captivate its viewers.
            </p>
          </div>
        </a>
      </li>

      <li className="group col-span-1 rounded-lg bg-slate-50 shadow transition-colors duration-300 hover:bg-blue-600 dark:bg-slate-900 dark:hover:bg-blue-600">
        <a
          className="flex cursor-pointer items-center justify-between space-x-6 truncate p-6"
          href=""
        >
          <div className="flex flex-col items-center gap-y-1 rounded-lg text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M14 6l7 7l-4 4"></path>
              <path d="M5.828 18.172a2.828 2.828 0 0 0 4 0l10.586 -10.586a2 2 0 0 0 0 -2.829l-1.171 -1.171a2 2 0 0 0 -2.829 0l-10.586 10.586a2.828 2.828 0 0 0 0 4z"></path>
              <path d="M4 20l1.768 -1.768"></path>
            </svg>
          </div>
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="text-sm font-medium text-slate-900 transition-colors duration-300 group-hover:text-slate-50 dark:text-slate-200">
                Debater
              </h3>
            </div>
            <p className="mt-1 truncate text-sm text-slate-500 transition-colors duration-300 group-hover:text-slate-300">
              I want you to act as a debater. I will provide you with some
              topics related to current events and your task is to research both
              sides of the debates.
            </p>
          </div>
        </a>
      </li>
    </ul>
  )
}
