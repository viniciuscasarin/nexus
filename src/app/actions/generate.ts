"use server";

import { generateObject } from 'ai';
import { z } from 'zod';
import { loadMasterResume } from './resume';
import { getModel } from './models';
import { prisma } from '@/lib/prisma';

export interface TailoredResume {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    summary: string;
    linkedin: string;
    github: string;
    website: string;
  };
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }[];
  skills: {
    name: string;
    category: string;
  }[];
}

const TailoredResumeSchema = z.object({
  personalInfo: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    title: z.string(),
    summary: z.string(),
    linkedin: z.string(),
    github: z.string(),
    website: z.string(),
  }),
  experience: z.array(z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string(),
    description: z.array(z.string()),
  })),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  })),
  skills: z.array(z.object({
    name: z.string(),
    category: z.string(),
  })),
});

export async function generateTailoredResume(jobApplicationId: number, modelId: string) {
  const masterData = await loadMasterResume();
  if (!masterData) {
    throw new Error("No master resume data found. Please complete your master resume first.");
  }

  const jobApplication = await prisma.jobApplication.findUnique({
    where: { id: jobApplicationId }
  });

  if (!jobApplication) {
    throw new Error("Job application not found.");
  }

  const prompt = `
You are an expert technical resume writer.
I am providing you with my master resume data and a job description. 
Generate a highly tailored and optimized resume for this specific job description, using ONLY the facts and experiences provided in the master resume. 

Rules:
1. DO NOT invent any new experiences, jobs, degrees, or skills that are not present in the master resume.
2. Select and highlight the most relevant experiences and skills for the job description.
3. You may rephrase bullet points to emphasize impact and relevance to the job description, but do not exaggerate or lie.

Master Resume:
${JSON.stringify(masterData, null, 2)}

Job Description:
${jobApplication.description}
`;

  try {
    const model = await getModel(modelId);
    const { object } = await generateObject({
      model,
      schema: TailoredResumeSchema,
      prompt,
    });

    const tailoredResume = await prisma.tailoredResume.create({
      data: {
        content: JSON.stringify(object),
      }
    });

    await prisma.jobApplication.update({
      where: { id: jobApplicationId },
      data: { tailoredResumeId: tailoredResume.id }
    });

    return object;
  } catch (error) {
    console.error("AI Generation failed:", error);
    throw new Error("Failed to generate tailored resume.");
  }
}
