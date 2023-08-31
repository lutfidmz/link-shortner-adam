import prisma from '../../../../../lib/prisma';
import { links } from '@prisma/client';
import { NextResponse } from 'next/server'

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id


    const data = await prisma.links.findMany({
        where: {
            owner_id: id
        }
    });

    return NextResponse.json({ data }, { status: 200 });
}