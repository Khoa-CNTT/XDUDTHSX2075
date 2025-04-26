import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/lib/types";
import { skillsSchema, SkillsValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SkillsForm({
    resumeData,
    setResumeData,
  }: EditorFormProps) {
    const form = useForm<SkillsValues>({
      resolver: zodResolver(skillsSchema),
      defaultValues: {
        skills: resumeData.skills || [],
      },
    });
  
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <div className="space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold">Kỹ năng</h2>
          <p className="text-sm text-muted-foreground">Điểm mạnh của bạn là gì ?</p>
        </div>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Kỹ năng</FormLabel>
                  <FormControl>
                    <Textarea 
                    {...field} 
                    value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                    placeholder="vd: reactJS, nodeJS, computer science,..."
                    onChange={(e) => {
                      const skills = e.target.value.split(",").map(s => s.trim());
                      field.onChange(skills);
                    }} 
                    />
                  </FormControl>
                  <FormDescription>
                    Nhập kỹ năng của bạn, cách nhau bằng dấu phẩy. Ví dụ: reactJS, nodeJS, computer science,...
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  }