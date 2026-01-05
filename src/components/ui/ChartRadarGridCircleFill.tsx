"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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

export const description = "A radar chart showing post statistics"

const chartData = [
    { status: "Published", count: 150 },
    { status: "Featured", count: 45 },
    { status: "Blocked", count: 12 },
    { status: "Draft", count: 68 },
    { status: "Popular", count: 95 },
]

const chartConfig = {
    count: {
        label: "Posts",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig

export function ChartRadarGridCircleFill() {
    return (
        <Card>
            <CardHeader className="items-center pb-4">
                <CardTitle>Post Analytics</CardTitle>
                <CardDescription>
                    Distribution by post status
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                        <PolarGrid
                            className="fill-[--color-count] opacity-50"
                            gridType="circle"
                            stroke="white"
                            strokeOpacity={0.3}
                        />

                        <PolarAngleAxis dataKey="status" />

                        <Radar
                            dataKey="count"
                            fill="var(--color-count)"
                            fillOpacity={0.5}
                            dot={{
                                r: 4,
                                fillOpacity: 1,
                            }}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Published posts are trending <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                    Based on total content data
                </div>
            </CardFooter>
        </Card>
    )
}