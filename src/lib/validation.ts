import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
    title: optionalString,
    descrtipon: optionalString,
})

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
    photo: z.custom<File | undefined>()
    .refine(
        (file) => !file || (file instanceof File && file.type.startsWith("image/")),
        "Tệp phải là hình ảnh"
    )
    .refine(file => !file || file.size <= 4 * 1024 * 1024, "Kích thước tệp phải nhỏ hơn 4MB"),
    firstName: optionalString,
    lastName: optionalString,
    jobTitle: optionalString,
    city: optionalString,
    country: optionalString,
    phone: optionalString,
    email: optionalString,
})

export type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;