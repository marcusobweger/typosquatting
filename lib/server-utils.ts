// check URL

import { ChartData, CheckResult, Verdict } from './types';

export function checkProtocol(url: URL) {
    const protocol = url.protocol;
    if (protocol === 'http:') return { score: 16, verdict: 'Using an insecure protocol' };
    if (protocol !== 'https:') return { score: 6 };
    return { score: 0 };
}

export function checkLength(url: URL) {
    const name = url.hostname;
    if (name.length >= 30) return { score: 20, verdict: 'URL is unusually long' };
    if (name.length >= 20) return { score: 15, verdict: 'URL is unusually long' };
    if (name.length >= 12) return { score: name.length - 5 };
    if (name.length >= 10) return { score: 4 };
    return { score: 0 };
}

export function checkSubdomains(url: URL) {
    const parts = url.hostname.split('.');
    if (parts.length >= 8) return { score: 25, verdict: 'Contains a large amount of subdomains' };
    if (parts.length >= 6) return { score: 18, verdict: 'Contains a large amount of subdomains' };
    if (parts.length >= 5) return { score: 12 };
    return { score: 0 };
}

export function checkCharacters(url: URL) {
    const hostname = url.hostname;
    if (hostname.startsWith('xn--'))
        return { score: 32, verdict: 'URL uses unusual characters not found in ASCII' };
    return { score: 0 };
}

export function checkRandomness(url: URL) {
    const hostname = url.hostname.split('.');
    hostname.pop();
    const domain = hostname.toString();

    if (domain.length > 12 && !/[aeiou]/i.test(domain))
        return { score: 12, verdict: 'Domain looks unhuman or machine generated' };
    if (!/[aeiou]/i.test(domain)) return { score: 7 };
    return { score: 0 };
}

export async function checkUrl(url: URL) {
    const chartData: ChartData[] = [];
    const verdict: Verdict = [];
    let score: number = 0;

    //
    // setTimeout(() => {}, 3000);

    const protocol: CheckResult = checkProtocol(url);
    score += protocol.score;
    chartData.push({ category: 'Protocol', score: protocol.score });
    if (protocol.verdict) verdict.push(protocol.verdict);

    const length: CheckResult = checkLength(url);
    score += length.score;
    chartData.push({ category: 'Length', score: length.score });
    if (length.verdict) verdict.push(length.verdict);

    const subdomain: CheckResult = checkSubdomains(url);
    score += subdomain.score;
    chartData.push({ category: 'Subdomains', score: subdomain.score });
    if (subdomain.verdict) verdict.push(subdomain.verdict);

    const character: CheckResult = checkCharacters(url);
    score += character.score;
    chartData.push({ category: 'Characters', score: character.score });
    if (character.verdict) verdict.push(character.verdict);

    const randomness: CheckResult = checkRandomness(url);
    score += randomness.score;
    chartData.push({ category: 'Randomness', score: randomness.score });
    if (randomness.verdict) verdict.push(randomness.verdict);

    return { score, chartData, verdict };
}
