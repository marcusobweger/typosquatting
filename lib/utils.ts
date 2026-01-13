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

export async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (e) {
        return false;
    }
}
