export type Verdict = string[];
export type ChartData = { category: string; score: number };

export type Result = {
    score: number;
    chartData: ChartData[];
    verdict: Verdict;
};
export type CheckResult = { score: number; verdict?: string };
