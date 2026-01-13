import { DOMAINS } from './domains';
import { PHISHING_KEYWORDS } from './keywords';
import { ChartData, CheckResult, Verdict } from './types';
import { distance } from 'fastest-levenshtein';

function checkProtocol(url: URL) {
    const protocol = url.protocol;
    if (protocol === 'http:') return { score: 16, verdict: 'Using an insecure protocol' };
    if (protocol !== 'https:') return { score: 6 };
    return { score: 0 };
}

function checkLength(url: URL) {
    const name = url.hostname;
    if (name.length >= 30) return { score: 20, verdict: 'URL is unusually long' };
    if (name.length >= 20) return { score: 15, verdict: 'URL is unusually long' };
    if (name.length >= 12) return { score: name.length - 5 };
    if (name.length >= 10) return { score: 4 };
    return { score: 0 };
}

function checkSubdomains(url: URL) {
    const parts = url.hostname.split('.');
    if (parts.length >= 8) return { score: 25, verdict: 'Contains a large amount of subdomains' };
    if (parts.length >= 6) return { score: 18, verdict: 'Contains a large amount of subdomains' };
    if (parts.length >= 5) return { score: 12 };
    return { score: 0 };
}

function checkCharacters(url: URL) {
    const hostname = url.hostname;
    if (hostname.startsWith('xn--'))
        return { score: 32, verdict: 'URL uses unusual characters not found in ASCII' };
    return { score: 0 };
}

function checkRandomness(url: URL) {
    const hostname = url.hostname.split('.');
    hostname.pop();
    const domain = hostname.toString();

    if (domain.length > 12 && !/[aeiou]/i.test(domain))
        return { score: 22, verdict: 'Domain looks unhuman or machine generated' };
    if (!/[aeiou]/i.test(domain)) return { score: 13 };
    return { score: 0 };
}

function checkHyphens(url: URL) {
    const hostname = url.hostname;

    const count = (hostname.match(/-/g) || []).length;

    if (count >= 4) return { score: 26, verdict: 'Suspicious amounts of "-" are included' };
    if (count >= 3) return { score: 21, verdict: 'Suspicious amounts of "-" are included' };
    if (count >= 2) return { score: 11 };
    return { score: 0 };
}

function checkKeywords(url: URL) {
    const hostname = url.hostname;
    const keywords: string[] = [];

    PHISHING_KEYWORDS.forEach((keyword) => {
        if (hostname.includes(`-${keyword}`) || hostname.includes(`${keyword}-`)) {
            keywords.push(keyword);
        }
    });

    if (keywords.length >= 2)
        return {
            score: 22,
            verdict: `Suspicious keywords found: ${keywords.join(', ')}`,
        };

    if (keywords.length >= 1)
        return {
            score: 16,
            verdict: `Suspicious keyword found: ${keywords[0]}`,
        };

    return { score: 0 };
}

function checkLevenshtein(url: URL) {
    const hostname = url.hostname;

    const cleanFirst = hostname.replace(/^www\./, '');

    const parts = cleanFirst.split('.');
    const clean = parts.length > 2 ? parts.slice(-2).join('.') : hostname;

    let minDist = 4;
    let similarDomain;
    let containsDomain;
    let contains = false;

    for (const domain of DOMAINS) {
        if (clean === domain) return { score: 0 };

        const dist = distance(clean, domain);

        if (dist < minDist) {
            minDist = dist;
            similarDomain = domain;
        }

        const domainName = domain.split('.')[0];
        if (domainName.length >= 2 && cleanFirst.includes(domainName)) {
            contains = true;
            containsDomain = domainName;
        }
    }

    if (minDist === 1) return { score: 64, verdict: `Extremely similar to: ${similarDomain}` };
    if (minDist === 2) return { score: 54, verdict: `Extremely similar to: ${similarDomain}` };
    if (minDist === 3) return { score: 27 };

    if (contains) return { score: 20, verdict: `URL contains: ${containsDomain}` };

    return { score: 0 };
}

export function checkUrl(url: URL) {
    const chartData: ChartData[] = [];
    const verdict: Verdict = [];
    let score: number = 0;
    const cleanChartData: ChartData[] = [];

    const randomness: CheckResult = checkRandomness(url);
    score += randomness.score;
    chartData.push({ category: 'Randomness', score: randomness.score });
    if (randomness.score !== 0)
        cleanChartData.push({ category: 'Randomness', score: randomness.score });
    if (randomness.verdict) verdict.push(randomness.verdict);

    const protocol: CheckResult = checkProtocol(url);
    score += protocol.score;
    chartData.push({ category: 'Protocol', score: protocol.score });
    if (protocol.score !== 0) cleanChartData.push({ category: 'Protocol', score: protocol.score });

    if (protocol.verdict) verdict.push(protocol.verdict);

    const length: CheckResult = checkLength(url);
    score += length.score;
    chartData.push({ category: 'Length', score: length.score });
    if (length.score !== 0) cleanChartData.push({ category: 'Length', score: length.score });
    if (length.verdict) verdict.push(length.verdict);

    const keyword: CheckResult = checkKeywords(url);
    score += keyword.score;
    chartData.push({ category: 'Keywords', score: keyword.score });
    if (keyword.score !== 0) cleanChartData.push({ category: 'Keywords', score: keyword.score });
    if (keyword.verdict) verdict.push(keyword.verdict);

    const subdomain: CheckResult = checkSubdomains(url);
    score += subdomain.score;
    chartData.push({ category: 'Subdomains', score: subdomain.score });
    if (subdomain.score !== 0)
        cleanChartData.push({ category: 'Subdomains', score: subdomain.score });
    if (subdomain.verdict) verdict.push(subdomain.verdict);

    const character: CheckResult = checkCharacters(url);
    score += character.score;
    chartData.push({ category: 'Characters', score: character.score });
    if (character.score !== 0)
        cleanChartData.push({ category: 'Characters', score: character.score });
    if (character.verdict) verdict.push(character.verdict);

    const hyphen: CheckResult = checkHyphens(url);
    score += hyphen.score;
    chartData.push({ category: 'Hyphens', score: hyphen.score });
    if (hyphen.score !== 0) cleanChartData.push({ category: 'Hyphens', score: hyphen.score });

    if (hyphen.verdict) verdict.push(hyphen.verdict);

    const levenshtein: CheckResult = checkLevenshtein(url);
    score += levenshtein.score;
    chartData.push({ category: 'Distance', score: levenshtein.score });
    if (levenshtein.score !== 0)
        cleanChartData.push({ category: 'Distance', score: levenshtein.score });
    if (levenshtein.verdict) verdict.push(levenshtein.verdict);

    let color = '--score-unsafe';

    if (score <= 35) color = '--score-safe';
    if (score > 35 && score <= 55) color = '--score-medium';

    return { score: score >= 100 ? 100 : score, chartData, verdict, color, cleanChartData };
}
