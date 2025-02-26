'use client'
import { algos } from '@/data/models'
import { useStore } from '@/lib/store'
import { useState } from 'react'

export default function PerfTable() {
  const metrics = useStore((state) => state.metrics)
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null)

  if (metrics.length === 0) {
    return null
  }

  const handleMouseEnter = (rowIndex: number) => {
    setHighlightedRow(rowIndex)
  }

  const handleMouseLeave = () => {
    setHighlightedRow(null)
  }

  const firstAlgo = {
    info: algos.filter((algo) => algo.id === metrics[0].kind)[0],
    average: Number(
      metrics[0].metrics
        .map((metric) => metric.time)
        .reduce((acc, time) => acc + time) / metrics[0].metrics.length
    ).toFixed(3),
  }
  const secondAlgo = {
    info: algos.filter((algo) => algo.id === metrics[1].kind)[0],
    average: Number(
      metrics[1].metrics
        .map((metric) => metric.time)
        .reduce((acc, time) => acc + time) / metrics[0].metrics.length
    ).toFixed(3),
  }
  return (
    <div className="col-span-6 lg:col-span-2 text-md mt-12 space-y-4">
      <div>
        <p className="font-bold">{firstAlgo.info.name}</p>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                metric: 'Average Execution Time',
                value: `${firstAlgo.average} ms`,
              },
              { metric: 'Best Case', value: firstAlgo.info.complexity.best },
              { metric: 'Worst Case', value: firstAlgo.info.complexity.worst },
              {
                metric: 'Average Case',
                value: firstAlgo.info.complexity.average,
              },
            ].map((item, index) => (
              <tr
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`cursor-default transition-colors duration-300 ${
                  highlightedRow === index ? 'bg-blue-100 dark:bg-blue-900' : ''
                }`}
              >
                <td className="border-b border-gray-300 dark:border-gray-600">
                  {item.metric}
                </td>
                <td className="border-b border-gray-300 dark:border-gray-600">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <p className="font-bold">{secondAlgo.info.name}</p>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                metric: 'Average Execution Time',
                value: `${secondAlgo.average} ms`,
              },
              { metric: 'Best Case', value: secondAlgo.info.complexity.best },
              { metric: 'Worst Case', value: secondAlgo.info.complexity.worst },
              {
                metric: 'Average Case',
                value: secondAlgo.info.complexity.average,
              },
            ].map((item, index) => (
              <tr
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`cursor-default transition-colors duration-300 ${
                  highlightedRow === index ? 'bg-blue-100 dark:bg-blue-900' : ''
                }`}
              >
                <td className="border-b border-gray-300 dark:border-gray-600">
                  {item.metric}
                </td>
                <td className="border-b border-gray-300 dark:border-gray-600">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
