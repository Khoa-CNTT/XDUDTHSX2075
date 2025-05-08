import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId, sessionClaims } = auth();
    
    // Kiểm tra quyền admin
    if (!userId || sessionClaims?.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const resume = await prisma.resume.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!resume) {
      return new NextResponse("Resume not found", { status: 404 });
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error("[RESUME_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}