'use client';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ChartContainer, type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
    score: {
        label: 'Score',
    },
} satisfies ChartConfig;

export function ChartRadialText({ score, color }: { score: number; color: string }) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0 text-lg">
                <CardTitle>Risk-Score</CardTitle>
                <CardDescription>
                    A higher score means the URL is likely a phishing link
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={[{ score: score }]}
                        startAngle={0}
                        endAngle={score <= 4 ? 9 : 3.6 * score}
                        innerRadius={80}
                        outerRadius={110}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar
                            dataKey="score"
                            background
                            cornerRadius={10}
                            fill={`var(${color})`}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-5xl font-normal"
                                                >
                                                    {score.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 32}
                                                    className="fill-muted-foreground text-sm"
                                                >
                                                    Score
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="text-muted-foreground text-center text-pretty">
                    This score should only serve as a guideline
                </div>
            </CardFooter>
        </Card>
    );
}
