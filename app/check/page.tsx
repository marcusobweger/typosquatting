'use server';
import { redirect } from 'next/navigation';
import CheckClient from './client';
import { parseUrl } from '@/lib/utils';
import { checkUrl } from '@/lib/server-utils';

export default async function Check({ searchParams }: { searchParams: Promise<{ url?: string }> }) {
    const { url } = await searchParams;
    if (!url) redirect('/');

    const parsedUrl = parseUrl(url);

    if (!parsedUrl) return;

    const result = checkUrl(parsedUrl);

    return <CheckClient url={url} result={result} />;
}
