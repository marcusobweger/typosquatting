import { ModeToggle } from '@/components/custom/mode-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Search, Github } from 'lucide-react';
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen justify-center bg-white font-sans dark:bg-zinc-950">
            <header className="flex bg-background fixed top-0 h-14 z-50 w-full items-center justify-end px-6">
                <div className="flex h-5 items-center space-x-4">
                    <Button variant="ghost" size="icon" aria-label="GitHub">
                        <Github />
                    </Button>
                    <Separator orientation="vertical" />
                    <ModeToggle />
                </div>
            </header>
            <main className="flex flex-1 justify-center">
                <div className="flex relative w-full max-w-5/12 items-center gap-2">
                    <Input
                        type="url"
                        placeholder="https://example.com"
                        className="h-16 rounded-full pr-16 pl-6 text-lg! font-light"
                        aria-label="Input URL"
                    />
                    <Button
                        variant="default"
                        aria-label="Check"
                        className="rounded-full h-12 w-12 absolute right-2 top-1/2 -translate-y-1/2"
                    >
                        <Search />
                    </Button>
                </div>
            </main>
        </div>
    );
}
