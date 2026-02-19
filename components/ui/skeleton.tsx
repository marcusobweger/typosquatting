import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="skeleton"
            className={cn(
                'bg-accent flex animate-pulse border border-accent rounded-xl',
                className,
            )}
            {...props}
        />
    );
}

export { Skeleton };
