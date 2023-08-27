import prisma from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { enumAccesses, links } from '@prisma/client';
import { NextResponse } from 'next/server'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }) {

    const id = params.id
    const getLinks: links | null = await prisma.links.findUnique({
        where: {
            id: id,
        },
    })

    return NextResponse.json({ getLinks }, { status: 200 });
}

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }) {
    const id = params.id
    const { title } = await request.json();
    const updateLinks = await prisma.links.update({
        where: {
            id: id,
        },
        data: {
            title: title,
        },
    })

    return NextResponse.json({ updateLinks }, { status: 200 });
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }) {
    const id = params.id
    const deleteLinks = await prisma.links.delete({
        where: {
            id: id,
        },
    })
    return NextResponse.json({ deleteLinks }, { status: 200 });
}