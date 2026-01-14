'use server';
import { redirect } from 'next/navigation';
import CheckClient from './client';
import { parseUrl } from '@/lib/utils';
import { checkUrl } from '@/lib/server-utils';
import { Metadata } from 'next';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ url?: string }>;
}): Promise<Metadata> {
    const { url } = await searchParams;

    if (!url) redirect('/');
    const parsedUrl = parseUrl(url);

    if (!parsedUrl) redirect('/');

    return {
        title: `Checking ${url} | Phishing Checker`,
    };
}

export default async function Check({ searchParams }: { searchParams: Promise<{ url?: string }> }) {
    const { url } = await searchParams;
    if (!url) redirect('/');

    const parsedUrl = parseUrl(url);

    if (!parsedUrl) redirect('/');

    const result = checkUrl(parsedUrl);

    return <CheckClient url={url} result={result} />;
}
