import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { url } = await req.json();

    return NextResponse.json({ data: 'Test' }, { status: 200 });
    if (!url) {
        return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
    }
}
