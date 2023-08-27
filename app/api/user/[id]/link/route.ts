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