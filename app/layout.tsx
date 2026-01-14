import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/custom/theme-provider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Type } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/custom/mode-toggle';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Phishing Checker',
    description: 'URL checking to help avoid phishing links',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <header className="flex fixed top-0 h-17 z-50 w-full bg-white dark:bg-zinc-950 items-center justify-between px-4">
                        <div className="flex items-center">
                            <Link href="/">
                                <Button variant="ghost" size="icon" aria-label="Typosquatting">
                                    <Type />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex h-5 items-center space-x-4">
                            <Button variant="ghost" size="icon" aria-label="GitHub">
                                <Github />
                            </Button>
                            <Separator orientation="vertical" />
                            <ModeToggle />
                        </div>
                    </header>
                    {children}
                    <SpeedInsights />
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
