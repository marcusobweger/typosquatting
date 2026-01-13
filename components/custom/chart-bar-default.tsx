'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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
import { ChartData } from '@/lib/types';

const chartConfig = {
    score: {
        label: 'Score',
    },
} satisfies ChartConfig;

export function ChartBarDefault({ chartData, color }: { chartData: ChartData[]; color: string }) {
    return (
        <Card>
            <CardHeader className="items-center pb-4 text-lg">
                <CardTitle>Categories</CardTitle>
                <CardDescription>URL manipulation categories and their impact</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        {...{
                            overflow: 'visible',
                        }}
                        className="text-sm"
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="score" fill={`var(${color})`} radius={8} />
                    </BarChart>
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
