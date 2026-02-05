'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoaderCircle, Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { parseUrl } from '@/lib/utils';

export default function Home() {
    const [url, setUrl] = useState('');
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const parsedUrl = parseUrl(url);
        if (!parsedUrl) return;
        setIsSubmitted(true);

        router.push(`/check?url=${parsedUrl.origin}`);
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
            <main className="flex relative w-full px-4 lg:max-w-1/2 items-center justify-center">
                <div className="absolute -translate-y-32 flex text-7xl lg:text-8xl font-light text-center">
                    Check URL
                </div>
                <form className="w-full" onSubmit={onSubmit}>
                    <Input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com"
                        className="h-16 rounded-full pr-16 pl-6 text-lg!"
                        aria-label="Input URL"
                    />
                    <Button
                        type="submit"
                        variant="default"
                        aria-label="Check"
                        className="rounded-full h-12 w-12 absolute right-6 top-1/2 -translate-y-1/2"
                    >
                        {isSubmitted ? <LoaderCircle className="animate-spin" /> : <Search />}
                    </Button>
                </form>
            </main>
        </div>
    );
}
