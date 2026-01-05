"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer, ChartLegend, ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import CustomSelection from "@/components/CustomSelection.tsx";
import {ArrowDownNarrowWide} from "lucide-react";


const chartData = [
    { date: "2024-01-01", likes: 120, comments: 40 },
    { date: "2024-01-02", likes: 180, comments: 60 },
    { date: "2024-01-03", likes: 200, comments: 98 },
    { date: "2024-01-04", likes: 278, comments: 39 },
    { date: "2024-01-05", likes: 189, comments: 48 },
    { date: "2024-01-06", likes: 239, comments: 80 },
    { date: "2024-01-07", likes: 349, comments: 143 },
    { date: "2024-01-08", likes: 290, comments: 110 },
    { date: "2024-01-09", likes: 310, comments: 130 },
    { date: "2024-01-10", likes: 250, comments: 90 },
]

const chartConfig = {
    likes: {
        label: "Likes",
        color: "var(--chart-4)",
    },
    comments: {
        label: "Comments",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function AccountAreaChart() {
    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <CardTitle>Engagement Growth</CardTitle>
                    <CardDescription className={"mt-1"}>
                        Showing likes and comments trends
                    </CardDescription>
                </div>

                
                <CustomSelection
                    icon={ArrowDownNarrowWide}
                    options={["Last 7 days", "Last 3 Month", "Last month"]}>
                </CustomSelection>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={true}
                            axisLine={true}
                            tickMargin={8}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent indicator="dot" />}
                        />

                        <defs>
                            <linearGradient id="fillLikes" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-likes)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-likes)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillComments" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-comments)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-comments)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        <Area
                            dataKey="comments"
                            type="natural"
                            fill="url(#fillComments)"
                            fillOpacity={0.4}
                            stroke="var(--color-comments)"
                            stackId="a"
                        />

                        <Area
                            dataKey="likes"
                            type="natural"
                            fill="url(#fillLikes)"
                            fillOpacity={0.4}
                            stroke="var(--color-likes)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />

                    </AreaChart>

                </ChartContainer>
            </CardContent>
        </Card>
    )
}
