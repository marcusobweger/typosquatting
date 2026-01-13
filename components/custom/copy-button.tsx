'use client';

import { copyToClipboard } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Check, Copy } from 'lucide-react';

export function CopyButton() {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    async function handleCopy() {
        const success = await copyToClipboard(window.location.href);

        if (success) {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            setCopied(true);
            timerRef.current = setTimeout(() => {
                setCopied(false);
                timerRef.current = null;
            }, 2000);
        }
    }
    return (
        <Popover open={copied}>
            <PopoverTrigger asChild>
                <div className="w-22 shrink-0">
                    <Button
                        variant="default"
                        aria-label="Copy"
                        className="flex w-full h-full justify-center items-center rounded-xl"
                        onClick={handleCopy}
                    >
                        {copied ? <Check /> : <Copy />}
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-full bg-primary text-primary-foreground overflow-x-scroll">
                <p>Copied!</p>
            </PopoverContent>
        </Popover>
    );
}
