'use client';
import { ChartBarDefault } from '@/components/custom/chart-bar-default';
import { ChartRadialText } from '@/components/custom/chart-radial-text';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Result } from '@/lib/types';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { ChartRadarDefault } from '@/components/custom/chart-radar-default';
function VerdictContent({ verdict }: { verdict: string[] }) {
    if (!verdict || verdict.length === 0) {
        return <div className="text-lg">No apparent issues were found</div>;
    }

    return verdict.map((verdict, index) => (
        <div key={index} className="text-lg pb-1">
            {verdict}
        </div>
    ));
}
export default function CheckClient({ url, result }: { url: string; result: Result }) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-col pt-17 pb-4 px-4 min-h-screen gap-4">
                <div className="flex w-full gap-4">
                    <Card className="flex-1">
                        <CardContent>
                            <CardTitle className="text-4xl font-normal">{url}</CardTitle>
                        </CardContent>
                    </Card>
                    <Link href="/" className="flex w-22">
                        <Button
                            variant="default"
                            aria-label="New"
                            className="flex w-full h-full justify-center items-center rounded-xl"
                        >
                            <Home />
                        </Button>
                    </Link>
                </div>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                    <ChartRadialText score={result.score} color={result.color} />
                    <ChartRadarDefault chartData={result.cleanChartData} color={result.color} />
                    <Card>
                        <CardHeader className="items-center pb-0 text-lg">
                            <CardTitle>Verdict</CardTitle>
                            <CardDescription>
                                Reasons for the score and further guide
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-full">
                            <VerdictContent verdict={result.verdict} />
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="text-muted-foreground text-center text-pretty">
                                The verdict should be taken with a grain of salt
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <ChartBarDefault chartData={result.chartData} color={result.color} />
            </main>
        </div>
    );
}
