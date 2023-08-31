import prisma from "../../../lib/prisma";

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await prisma.users.findMany({
  })
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(request: Request) {
  const {
    name,
    email,
    password,
  } = await request.json();

  const checkUrl = await prisma.users.findFirst({
    where: {
      email: email as string
    }
  });

  if (checkUrl) {
    return NextResponse.json({ error: "Email Has Been Used" }, { status: 404 });
  }

  const newUser = await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });

  return NextResponse.json({ newUser }, { status: 201 });
}