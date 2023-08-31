import prisma from '../../../lib/prisma';
import { links } from '@prisma/client';
import { NextResponse } from 'next/server'


export async function POST(
    request: Request,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug
    const { pass } = await request.json()


    const getLinks = await prisma.links.findFirst({
        where: {
            short_url: {
                endsWith: slug,
            }
        },
        select: {
            long_url: true,
            password: true,
        },
    }) as { long_url: string, password: string } | null;

    if (getLinks && getLinks.password === null) {
        return NextResponse.json({ long_url: getLinks.long_url, password: getLinks.password }, { status: 200 });
    }
    if (getLinks && getLinks.password === pass) {
        return NextResponse.json({ long_url: getLinks.long_url }, { status: 200 });
    } else {
        // Handle the case where the link is not found
        return NextResponse.json({ error: 'Data not found or password incorrect' }, { status: 404 });
    }
}