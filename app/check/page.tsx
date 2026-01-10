'use client';
import { ChartBarDefault } from '@/components/custom/chart-bar-default';
import { ChartRadarDefault } from '@/components/custom/chart-radar-default';
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
import {
    checkCharacters,
    checkLength,
    checkProtocol,
    checkRandomness,
    checkSubdomains,
    parseUrl,
} from '@/lib/utils';
import { RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

function VerdictContent({ verdict }: { verdict: string[] }) {
    if (!verdict || verdict.length === 0) {
        return <div>No apparent issues were found</div>;
    }

    return verdict.map((verdict, index) => <div key={index}>{verdict}</div>);
}

export default function Check() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const url = searchParams.get('url');
    useEffect(() => {
        if (!url) {
            router.replace('/');
            return;
        }
    }, [url, router]);

    const parsedUrl = parseUrl(url);

    if (!parsedUrl) return;

    const chartData: unknown[] = [];
    const verdict: string[] = [];
    let score = 0;
    const protocol = checkProtocol(parsedUrl);
    score += protocol.score;
    chartData.push({ category: 'Protocol', score: protocol.score });
    if (protocol.verdict) verdict.push(protocol.verdict);

    const length = checkLength(parsedUrl);
    score += length.score;
    chartData.push({ category: 'Length', score: length.score });
    if (length.verdict) verdict.push(length.verdict);

    const subdomain = checkSubdomains(parsedUrl);
    score += subdomain.score;
    chartData.push({ category: 'Subdomains', score: subdomain.score });
    if (subdomain.verdict) verdict.push(subdomain.verdict);

    const character = checkCharacters(parsedUrl);
    score += character.score;
    chartData.push({ category: 'Characters', score: character.score });
    if (character.verdict) verdict.push(character.verdict);

    const randomness = checkRandomness(parsedUrl);
    score += randomness.score;
    chartData.push({ category: 'Randomness', score: randomness.score });
    if (randomness.verdict) verdict.push(randomness.verdict);

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
                            className="flex w-full h-full justify-center items-center rounded-full"
                        >
                            <RotateCcw />
                        </Button>
                    </Link>
                </div>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                    <ChartRadialText score={score} color="--primary" />
                    <ChartRadarDefault chartData={chartData} color="--primary" />
                    <Card>
                        <CardHeader className="items-center pb-0 text-lg">
                            <CardTitle>Verdict</CardTitle>
                            <CardDescription>
                                Reasons for the score and further guide
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-full">
                            <VerdictContent verdict={verdict} />
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="text-muted-foreground text-center text-pretty">
                                The verdict should be taken with a grain of salt
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <ChartBarDefault chartData={chartData} color="--primary" />
            </main>
        </div>
    );
}
