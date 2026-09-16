import * as z from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  summary: z.string().optional(),
});

export const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().min(1, "Description is required"),
});

export const educationSchema = z.object({
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  description: z.string().min(1, "Description is required"),
});

export const masterResumeSchema = z.object({
  personalInfo: personalInfoSchema,
  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
  skills: z.array(skillSchema),
});

export type MasterResumeFormValues = z.infer<typeof masterResumeSchema>;
