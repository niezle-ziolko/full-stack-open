import { z } from "zod";

export const newPatientSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  dateOfBirth: z
    .string({ required_error: "Date of birth is required" })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format"
    }),
  ssn: z.string({ required_error: "SSN is required" }),
  gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
  occupation: z.string({ required_error: "Occupation is required" })
});

export type NewPatientZod = z.infer<typeof newPatientSchema>;