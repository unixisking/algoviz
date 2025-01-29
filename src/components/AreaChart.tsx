"use client"

// import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart as LineChartNativeComponent, XAxis, YAxis, AreaChart, Area } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    // CardFooter,
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
import { TrendingUp } from "lucide-react"

// const chartConfig = {
//     time: {
//         label: "Time(ms)",
//         color: "hsl(var(--chart-1))",
//     },
// } satisfies ChartConfig

interface IChartData {
    name: string,
    description: string
    data: IBenchmark[]
}

const chartData = [
    { alphabetSize: "January", time: 186, mobile: 80 },
    { alphabetSize: "February", time: 305, mobile: 200 },
    { alphabetSize: "March", time: 237, mobile: 120 },
    { alphabetSize: "April", time: 73, mobile: 190 },
    { alphabetSize: "May", time: 209, mobile: 130 },
    { alphabetSize: "June", time: 214, mobile: 140 },
]

const chartConfig = {
    time: {
        label: "Time",
        color: "hsl(var(--chart-1))",
    },
    // mobile: {
    //     label: "Mobile",
    //     color: "hsl(var(--chart-2))",
    // },
} satisfies ChartConfig

export function LineChart({ name, description, data }: IChartData) {
    // console.log("fro mline chart", data)
    return (
        <Card
            className="w-2/3 border-0 shadow-none">

            <CardHeader>
                <CardTitle>Area Chart - Gradient</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 alphabetSizes
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="alphabetSize"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        // tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-time)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-time)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            {/* <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient> */}
                        </defs>
                        {/* <Area
                            dataKey="mobile"
                            type="natural"
                            fill="url(#fillMobile)"
                            fillOpacity={0.4}
                            stroke="var(--color-mobile)"
                            stackId="a"
                        /> */}
                        <Area
                            dataKey="time"
                            type="natural"
                            fill="url(#fillDesktop)"
                            fillOpacity={0.4}
                            stroke="var(--color-time)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Trending up by 5.2% this alphabetSize <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>

        </Card >
    )
}
