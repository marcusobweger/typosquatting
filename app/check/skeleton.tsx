import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function CheckSkeleton() {
    const array = [1, 2, 3];
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-col pt-17 pb-4 px-4 min-h-screen gap-4">
                <div className="flex gap-4 max-w-full">
                    <Skeleton className="w-full h-[90]" />
                </div>
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                    {array.map((value) => (
                        <Skeleton key={value} className="h-[430]" />
                    ))}
                </div>
                <Skeleton className="w-full h-[984.38]" />
            </main>
        </div>
    );
}
