'use client'

import { CartesianGrid, AreaChart, Area, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { IBenchmark } from '@/lib/store/perf-slice'

interface IChartData {
  name: string
  description: string
  data: { kind: string; metrics: IBenchmark[] }[]
}

const chartConfig = {
  time: {
    label: 'Time',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function AreaChartComponent({ name, description, data }: IChartData) {
  return (
    <Card className="w-full border-0 shadow-none dark:text-white">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data.flatMap((item) =>
              item.metrics.map((metric) => ({ ...metric, kind: item.kind }))
            )}
            margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="alphabetSize"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              allowDuplicatedCategory={false}
              label={{
                value: 'Alphabet Size',
                position: 'insideBottomRight',
                dy: 20,
                style: { fill: 'var(--foreground)', fontSize: 12 },
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={['auto', 'auto']}
              interval="preserveStartEnd"
              label={{
                value: 'Time (ms)',
                angle: -90,
                position: 'insideLeft',
                offset: -5,
                style: { fill: 'var(--foreground)', fontSize: 12 },
              }}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {data.map((item, index) => (
              <Area
                key={`${item.kind}-${index}`}
                dataKey="time"
                data={item.metrics}
                name={item.kind}
                type="monotone"
                stroke={`hsl(var(--chart-${index + 1}))`}
                fill={`hsl(var(--chart-${index + 1}) / 0.3)`} // Add fill with opacity
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }} // Highlight active data points
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
