import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = {
    title: "Trang chỉnh sửa hồ sơ lý lịch",
    description: "CV Editor page",
}

export default function Page() {
    return <ResumeEditor />
}