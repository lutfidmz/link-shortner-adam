import prisma from '../../../lib/prisma';
import { links } from '@prisma/client';
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }) {

    const slug = params.slug
    const getLinks = await prisma.links.findFirst({
        where: {
            short_url: {
                endsWith: slug,
            },
        },
        select: {
            long_url: true,
        },
    }) as { long_url: string } | null;

    if (getLinks) {
        return NextResponse.json({ getLinks }, { status: 200 });
    } else {
        // Handle the case where the link is not found
        return NextResponse.json({ error: 'Data not found' }, { status: 404 });
    }
}