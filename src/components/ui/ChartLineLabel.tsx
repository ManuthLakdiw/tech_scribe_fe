"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A line chart showing posts for the full year"

const chartData = [
    { month: "January", posts: 45 },
    { month: "February", posts: 72 },
    { month: "March", posts: 110 },
    { month: "April", posts: 95 },
    { month: "May", posts: 150 },
    { month: "June", posts: 180 },
    { month: "July", posts: 210 },
    { month: "August", posts: 195 },
    { month: "September", posts: 240 },
    { month: "October", posts: 300 },
    { month: "November", posts: 280 },
    { month: "December", posts: 350 },
]

const chartConfig = {
    posts: {
        label: "Total Posts",
        color: "var(--chart-4)",
    },
} satisfies ChartConfig

export function ChartLineLabel() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Annual Post Activity</CardTitle>
                <CardDescription>January - December 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="posts"
                            type="natural"
                            stroke="var(--color-posts)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-posts)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 12% this year <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total posts for the last 12 months
                </div>
            </CardFooter>
        </Card>
    )
}