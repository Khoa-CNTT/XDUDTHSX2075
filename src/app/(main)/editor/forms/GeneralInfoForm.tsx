import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { generalInfoSchema, GeneralInfoValues } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function GeneralInfoForm() {
const form = useForm<GeneralInfoValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
        title: "",
        descrtipon: "",
    }
})
    return <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
            <h2 className="text-2xl font-semibold">Thông tin chung</h2>
            <p className="text-sm text-muted-foreground">Thông tin này sẽ không hiện trên hồ sơ việc làm của bạn</p>
        </div>
        <Form {...form}>
            <form className="space-y-3">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên CV</FormLabel>
                            <FormControl>
                                <Input placeholder="CV của tôi" {...field} autoFocus/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="descrtipon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô tả CV</FormLabel>
                            <FormControl>
                                <Input placeholder="CV cho công việc tiếp theo của tôi" {...field} autoFocus/>
                            </FormControl>
                            <FormDescription>
                                Mô tả ngắn gọn về CV của bạn.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    </div>
}