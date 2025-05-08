import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResumePageProps {
  params: {
    id: string;
  };
}

const ResumePage = async ({ params }: ResumePageProps) => {
  const { userId, sessionClaims } = auth();

  // Kiểm tra quyền admin
  if (!userId || sessionClaims?.role !== "ADMIN") {
    redirect("/");
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
    return <div>Không tìm thấy CV</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Chi tiết CV</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Tiêu đề CV</h3>
              <p>{resume.title}</p>
            </div>
            
            <div>
              <h3 className="font-semibold">Mô tả</h3>
              <p>{resume.description}</p>
            </div>

            <div>
              <h3 className="font-semibold">Ngày tạo</h3>
              <p>{format(new Date(resume.createdAt), "dd/MM/yyyy HH:mm")}</p>
            </div>

            <div>
              <h3 className="font-semibold">Thông tin người dùng</h3>
              <p>ID: {resume.user.id}</p>
              <p>Tên: {resume.user.firstName} {resume.user.lastName}</p>
              <p>Email: {resume.user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumePage;