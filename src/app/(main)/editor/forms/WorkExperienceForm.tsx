import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { workExperienceSchema, WorkExperienceValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal } from "lucide-react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function WorkExperienceForm({resumeData, setResumeData}: EditorFormProps) {
    const form = useForm<WorkExperienceValues>({
        resolver: zodResolver(workExperienceSchema),
        defaultValues: {
            workExperiences: resumeData.workExperiences || [],
        }
    })

    const {fields, append, remove} = useFieldArray({
        control: form.control,
        name: "workExperiences",
    })

    return <div className="max-w-xl mx-auto space-y-6">
        <div className="space-y-1.5 text-center">
            <h2 className="text-2xl font-semibold">Kinh nghiệm làm việc</h2>
            <p className="text-sm text-muted-foreground">
                Thêm thông tin về kinh nghiệm làm việc của bạn để nhà tuyển dụng hiểu rõ hơn về bạn.
            </p>
        </div>
        <Form {...form}>
            <form className="space-y-3">
                {fields.map((field, index) => (
                    <WorkExperienceItem 
                    key={field.id}
                    index={index}
                    form={form}
                    remove={remove}
                    />
                ))}
                <div className="flex justify-center">
                    <Button type="button" onClick={() => append({
                        position: "",
                        company: "",
                        startDate: "",
                        endDate: "",
                        description: "",
                    })}>
                        Thêm kinh nghiệm làm việc
                    </Button>
                </div>
            </form>
        </Form>
    </div>
}

interface WorkExperienceItemProps {
    form: UseFormReturn<WorkExperienceValues>;
    index: number;
    remove: (index: number) => void;
}

function WorkExperienceItem({form, index, remove}: WorkExperienceItemProps) {
    return <div className="space-y-3 border rounded-md bg-background">
        <div className="flex justify-between gap-2">
            <span className="font-semibold">Kinh nghiệm công việc {index + 1}</span>
            <GripHorizontal className="size-5 cursor-grab text-muted-foreground" />
        </div>
        <FormField 
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({field}) => (
            <FormItem>
                <FormLabel>Chức vụ công việc</FormLabel>
                <FormControl>
                    <Input {...field} autoFocus />
                </FormControl>
            </FormItem>
        )}
        />
        <FormField 
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({field}) => (
            <FormItem>
                <FormLabel>Tên công ty</FormLabel>
                <FormControl>
                    <Input {...field}/>
                </FormControl>
            </FormItem>
        )}
        />
        <div className="grid grid-cols-2 gap-3">
            <FormField 
            control={form.control}
            name={`workExperiences.${index}.startDate`}
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
            name={`workExperiences.${index}.endDate`}
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
        <FormField 
            control={form.control}
            name={`workExperiences.${index}.description`}
            render={({field}) => (
                <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                        <Textarea {...field}/>
                    </FormControl>
                </FormItem>
            )}
            />
        <Button type="button" variant="destructive" onClick={() => remove(index)} className="w-full">
        </Button>
    </div>
}