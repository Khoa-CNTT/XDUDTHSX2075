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
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                    <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Chức danh công việc</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Thành phố</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quốc gia</FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input {...field} type="tel"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
            </form>
        </Form>
    </div>
}