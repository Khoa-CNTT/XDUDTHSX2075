import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId, sessionClaims } = auth();

        if (!userId || sessionClaims?.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const user = await prisma.user.findUnique({
            where: { id: params.id }
        });

        if (!user) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId, sessionClaims } = auth();

        if (!userId || sessionClaims?.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const body = await req.json();
        const { name, email, phone } = body;

        const user = await prisma.user.update({
            where: { id: params.id },
            data: { name, email, phone }
        });

        return NextResponse.json(user);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId, sessionClaims } = auth();

        if (!userId || sessionClaims?.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        await prisma.user.delete({
            where: { id: params.id }
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}