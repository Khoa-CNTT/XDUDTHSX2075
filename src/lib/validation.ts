import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
    title: optionalString,
    descrtipon: optionalString,
})

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

