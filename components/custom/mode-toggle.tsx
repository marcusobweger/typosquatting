'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Skeleton } from '../ui/skeleton';

export function ModeToggle() {
    const [mounted, setMounted] = useState(false);

    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) return <Skeleton className="size-9" />;

    return (
        <Button
            variant="ghost"
            size="icon"
            aria-label="Theme"
            onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
            {resolvedTheme === 'light' ? <Sun /> : <Moon />}
        </Button>
    );
}
