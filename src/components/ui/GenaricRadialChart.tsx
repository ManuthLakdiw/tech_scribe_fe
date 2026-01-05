import { TrendingUp } from "lucide-react"
import { LabelList, RadialBar, RadialBarChart } from "recharts"

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

interface GenericRadialChartProps {
    title: string;
    description: string;
    data: any[];
    config: ChartConfig;
    valueKey: string;
    labelKey: string;
    footerText?: string;
    trendText?: string;
}

export function GenericRadialChart({
                                       title,
                                       description,
                                       data,
                                       config,
                                       valueKey,
                                       labelKey,
                                       footerText,
                                       trendText
                                   }: GenericRadialChartProps) {

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={config}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={data}
                        startAngle={-90}
                        endAngle={380}
                        innerRadius={30}
                        outerRadius={110}
                    >
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent hideLabel nameKey={labelKey} />}
                        />

                        <RadialBar dataKey={valueKey} background>
                            <LabelList
                                position="insideStart"
                                dataKey={labelKey}
                                className="fill-white capitalize mix-blend-luminosity"
                                fontSize={11}
                            />
                        </RadialBar>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {trendText && (
                    <div className="flex items-center gap-2 leading-none font-medium">
                        {trendText} <TrendingUp className="h-4 w-4" />
                    </div>
                )}
                {footerText && (
                    <div className="text-muted-foreground leading-none">
                        {footerText}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}