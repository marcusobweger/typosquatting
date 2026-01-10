'use client';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';

const chartConfig = {
    score: {
        label: 'Score',
    },
} satisfies ChartConfig;

export function ChartRadarDefault({ chartData, color }: { chartData: unknown[]; color: string }) {
    return (
        <Card>
            <CardHeader className="items-center pb-4 text-lg">
                <CardTitle>Categories</CardTitle>
                <CardDescription>URL manipulation categories and their impact</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadarChart data={chartData} className="text-sm">
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="category" />
                        <PolarGrid />
                        <Radar dataKey="score" fill={`var(${color})`} fillOpacity={0.6} />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground text-center text-pretty">
                    There are more categories than those listed here
                </div>
            </CardFooter>
        </Card>
    );
}
