"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import UserDialog from "./UserDialog";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Không thể tải danh sách người dùng",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

        try {
            await fetch(`/api/users/${id}`, { method: "DELETE" });
            toast({ description: "Xóa người dùng thành công" });
            fetchUsers();
        } catch (error) {
            toast({
                variant: "destructive",
                description: "Không thể xóa người dùng",
            });
        }
    };

    if (loading) return <div>Đang tải...</div>;

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Số điện thoại</TableHead>
                        <TableHead>Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    onClick={() => setSelectedUser(user)}
                                >
                                    Sửa
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Xóa
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <UserDialog
                user={selectedUser}
                open={!!selectedUser}
                onOpenChange={(open) => !open && setSelectedUser(null)}
                onSuccess={fetchUsers}
            />
        </div>
    );
}