'use client';
import CheckClient from './client';
import { Suspense } from 'react';
import CheckSkeleton from './skeleton';

export default function Check() {
    return (
        <Suspense fallback={<CheckSkeleton />}>
            <CheckClient />
        </Suspense>
    );
}
