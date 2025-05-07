import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserList from "./components/UserList";

export default async function UsersPage() {
    const { userId, sessionClaims } = auth();

    if (!userId || sessionClaims?.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>
            <UserList />
        </div>
    );
}