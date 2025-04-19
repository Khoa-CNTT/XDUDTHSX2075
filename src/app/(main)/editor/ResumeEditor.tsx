"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import GeneralInfoForm from "./forms/GeneralInfoForm"

export default function ResumeEditor() {
    return <div className="flex grow flex-col">
        <header className="space-y-1.5 border-b px-3 py-5 text-center">
            <h1 className="text-2xl font-bold">Thiết kế hồ sơ của bạn</h1>
            <p className="text-sm text-muted-foreground">Thực hiện theo các bước dưới đây</p>
        </header>
        <main className="relative grow">
            <div className="absolute bottom-0 top-0 flex w-full">
                <div className="w-full md:w-1/2 p-3">
                    <GeneralInfoForm />
                </div>
                <div className="grow md:border-r"/>
                <div className="hidden w-1/2 md:flex">
                    
                </div>
            </div>
        </main>
        <footer className="w-full border-t px-3 py-5">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Button variant="secondary">Trước</Button>
                    <Button>Sau</Button>
                </div>
                <div className="flex items-start gap-3">
                    <Button variant="secondary" asChild>
                        <Link href="/resumes">Đóng</Link>
                    </Button>
                    <p className="text-muted-foreground opacity-0">Lưu...</p>
                </div>
            </div>
        </footer>
    </div>
}