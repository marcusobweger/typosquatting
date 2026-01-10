'use client';
import { ChartRadarDefault } from '@/components/custom/chart-radar-default';
import { ChartRadialText } from '@/components/custom/chart-radial-text';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams } from 'next/navigation';
export default function Check() {
    const searchParams = useSearchParams();
    const url = searchParams.get('url');

    const chartData = [
        { category: 'Letter', score: 186 },
        { category: 'Test', score: 305 },
        { category: 'March', score: 237 },
        { category: '', score: 273 },
        { category: 'May', score: 209 },
        { category: 'June', score: 214 },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-col pt-17 px-4 min-h-screen gap-4">
                <Card>
                    <CardContent>
                        <CardTitle className="text-4xl font-normal">{url}</CardTitle>
                    </CardContent>
                </Card>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                    <ChartRadialText score={100} color="--primary" />
                    <ChartRadarDefault chartData={chartData} color="--primary" />
                    <Card>
                        <CardHeader className="items-center pb-0 text-lg">
                            <CardTitle>Verdict</CardTitle>
                            <CardDescription>
                                Reasons for the score and further guide
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </main>
        </div>
    );
}
