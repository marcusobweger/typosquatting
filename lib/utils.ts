import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function parseUrl(url: string | null) {
    if (!url || url === '') return;

    if (!url.includes('.')) return;

    try {
        const parsedUrl = new URL(url);
        if (!parsedUrl) return;

        return parsedUrl;
    } catch (e) {
        return;
    }
}

// check URL

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
    if (name.length >= 15) return { score: name.length };
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
