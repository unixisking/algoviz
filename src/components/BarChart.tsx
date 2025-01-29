"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart as BarNativeChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { IBenchmark } from "@/lib/store/perf-slice"

const chartData = [
    { alphabetSize: "January", time: 186 },
    { alphabetSize: "February", time: 305 },
    { alphabetSize: "March", time: 237 },
    { alphabetSize: "April", time: 73 },
    { alphabetSize: "May", time: 209 },
    { alphabetSize: "June", time: 214 },
]

const chartConfig = {
    time: {
        label: "Time",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

interface IChartData {
    name: string,
    description: string
    data: IBenchmark[]
}

export function BarChart({ name, description, data }: IChartData) {
    return (
        <Card
            className="w-[70%] border-0 shadow-none">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarNativeChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="alphabetSize"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="time" fill="var(--color-time)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarNativeChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this alphabetSize <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 alphabetSizes
                </div>
            </CardFooter>
        </Card>
    )
}
