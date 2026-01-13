export type Verdict = string[];
export type ChartData = { category: string; score: number };

export type Result = {
    score: number;
    chartData: ChartData[];
    verdict: Verdict;
    color: string;
    cleanChartData: ChartData[];
};
export type CheckResult = { score: number; verdict?: string };
