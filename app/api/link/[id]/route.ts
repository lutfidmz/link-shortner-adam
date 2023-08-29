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
    const { title,
        long_url,
        short_url,
        password,
        oldpassword,
        newpassword,
        access,
        expired_at,
        owner_id, } = await request.json();

    // validasi untuk password
    if (newpassword) {
        if (oldpassword !== password)
            return NextResponse.json({ message: "Password invalid" }, { status: 422 }) //422 unprocessed request
        await prisma.links.update({
            where: {
                id: id,
            },
            data: {
                title,
                long_url,
                short_url,
                password: newpassword,
                access,
                expired_at,
                owner_id,
            },
        })
        return NextResponse.json({ status: 200 });
    } else {
        await prisma.links.update({
            where: {
                id: id,
            },
            data: {
                title,
                long_url,
                short_url,
                access,
                expired_at,
                owner_id,
            },
        })
        return NextResponse.json({ status: 200 });
    }
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