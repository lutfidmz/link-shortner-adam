import prisma from "../../../lib/prisma";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const data = await prisma.links.findMany({
    })
    return NextResponse.json({ data }, { status: 200 });
}

export async function POST(request: Request) {
    const {
        title,
        long_url,
        short_url,
        owner_id,
    } = await request.json();

    const checkUrl = await prisma.links.findFirst({
        where: {
            short_url: short_url as string
        }
    });

    if (checkUrl) {
        return NextResponse.json({ error: "Short Url Has Been Used" }, { status: 404 });
    }

    const newLink = await prisma.links.create({
        data: {
            title,
            long_url,
            short_url,
            owner_id,
        },
    });

    return NextResponse.json({ newLink }, { status: 201 });
}
