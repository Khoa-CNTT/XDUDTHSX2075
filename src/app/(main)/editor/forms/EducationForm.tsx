import { FormField, FormItem, FormControl, FormLabel, Form } from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { educationSchema, EducationValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function EducationForm({resumeData, setResumeData}: EditorFormProps) {
    const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
        defaultValues: {
            educations: resumeData.educations || []
        }
    })

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "educations",
    })

    return <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
            <h2 className="text-2xl font-semibold">Kinh nghiệm làm việc</h2>
            <p className="text-sm text-muted-foreground">
                Thêm thông tin về học vấn của bạn để nhà tuyển dụng hiểu rõ hơn về bạn.
            </p>
        </div>
        <Form {...form}>
            <form className="space-y-3">
                {fields.map((field, index) => (
                    <EducationItem 
                    key={field.id}
                    index={index}
                    form={form}
                    remove={remove}
                    />
                ))}
                <div className="flex justify-center">
                    <Button type="button" onClick={() => append({
                        degree: "",
                        school: "",
                        startDate: "",
                        endDate: "",
                    })}>
                        Thêm kinh nghiệm làm việc
                    </Button>
                </div>
            </form>
        </Form>
    </div>
}

interface EducaionItemProps {
    form: UseFormReturn<EducationValues>;
    index: number;
    remove: (index: number) => void;
}

function EducationItem({form, index, remove}: EducaionItemProps) {
    return <div className="space-y-3 border rounded-md bg-background">
        <div className="flex justify-between gap-2">
            <span className="font-semibold">Học vấn {index + 1}</span>
            <GripHorizontal className="size-5 cursor-grab text-muted-foreground" />
        </div>
        <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({field}) => (
            <FormItem>
                <FormLabel>Bằng cấp</FormLabel>
                <FormControl>
                    <Input {...field} autoFocus />
                </FormControl>
            </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({field}) => (
            <FormItem>
                <FormLabel>Trường học</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
            </FormItem>
        )}
        />
        <div className="grid grid-cols-2 gap-3">
        <FormField 
            control={form.control}
            name={`educations.${index}.startDate`}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Ngày bắt đầu</FormLabel>
                    <FormControl>
                        <Input {...field}
                        type="date"
                        value={field.value?.slice(0, 10)}
                        />
                    </FormControl>
                </FormItem>
            )}
            />
            <FormField 
            control={form.control}
            name={`educations.${index}.endDate`}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Ngày kết thúc</FormLabel>
                    <FormControl>
                        <Input {...field}
                        type="date"
                        value={field.value?.slice(0, 10)}
                        />
                    </FormControl>
                </FormItem>
            )}
            />
        </div>
        <Button type="button" variant="destructive" onClick={() => remove(index)} className="w-full">
            Xóa
        </Button>
    </div>
}