import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const { userId, sessionClaims } = auth();

        if (!userId || sessionClaims?.role !== "ADMIN") {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true
            }
        });

        return NextResponse.json(users);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}