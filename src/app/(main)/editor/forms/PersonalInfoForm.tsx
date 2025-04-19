import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { personalInfoSchema, PersonalInfoSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export default function PersonalInfoForm() {
    const form = useForm<PersonalInfoSchema>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            jobTitle: "",
            city: "",
            country: "",
            phone: "",
            email: "",
        }
    })

    useEffect(() => {
        const { unsubscribe } = form.watch(async () => {
          const isValid = await form.trigger();
          if (!isValid) return;
        });
        return unsubscribe;
      }, [form]);

    return <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
            <h2 className="text-2xl font-semibold">Thông tin cá nhân</h2>
            <p className="text-sm text-muted-foreground">Giới thiệu bản thân bạn.</p>
        </div>
        <Form {...form}>
            <form className="space-y-3">
                <FormField
                    control={form.control}
                    name="photo"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: {value, ...fieldValues} }) => (
                        <FormItem>
                            <FormLabel>Ảnh đại diện</FormLabel>
                            <FormControl>
                                <Input
                                    {...fieldValues}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            const reader = new FileReader()
                                            reader.onloadend = () => {
                                                fieldValues.onChange(reader.result)
                                            }
                                            reader.readAsDataURL(file)
                                        } else {
                                            fieldValues.onChange(null)
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nguyễn" {...field} autoFocus/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    </div>
}