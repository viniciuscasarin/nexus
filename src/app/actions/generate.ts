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
  voluntaryExperience: {
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
    description: string;
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
  voluntaryExperience: z.array(z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    location: z.string(),
    description: z.array(z.string()),
  })).default([]),
  education: z.array(z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  })),
  skills: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })),
});

export async function generateTailoredResume({
  jobApplicationId,
  jobDescription,
  modelId,
  language,
}: {
  jobApplicationId?: number;
  jobDescription?: string;
  modelId: string;
  language?: string;
}) {
  const masterData = await loadMasterResume();
  if (!masterData) {
    throw new Error("No master resume data found. Please complete your master resume first.");
  }

  let finalJobDescription = jobDescription;

  if (jobApplicationId) {
    const jobApplication = await prisma.jobApplication.findUnique({
      where: { id: jobApplicationId }
    });

    if (!jobApplication) {
      throw new Error("Job application not found.");
    }
    finalJobDescription = jobApplication.description || jobDescription;
  }

  if (!finalJobDescription) {
    throw new Error("A job description must be provided either directly or via a job application.");
  }

  const languageInstruction = language 
    ? `\n4. IMPORTANT: Keep all JSON keys exactly as defined in the schema (in English), but translate all the string values into ${language}. The final resume content MUST be written entirely in ${language}.`
    : '';

  const prompt = `
You are an expert technical resume writer.
I am providing you with my master resume data and a job description. 
Generate a highly tailored and optimized resume for this specific job description, using ONLY the facts and experiences provided in the master resume. 

Rules:
1. DO NOT invent any new experiences, jobs, degrees, or skills that are not present in the master resume.
2. Select and highlight the most relevant experiences and skills for the job description.
3. For each skill, use the provided description in the master resume to understand exactly how the candidate used it, and synthesize a concise, tailored description of the skill for the generated resume that emphasizes its relevance to the job.
4. If there are voluntary experiences in the master resume that are relevant to the job description, select and include them in \`voluntaryExperience\`. Otherwise, leave it as an empty array.
5. You may rephrase bullet points to emphasize impact and relevance to the job description, but do not exaggerate or lie.\${languageInstruction}

Master Resume:
${JSON.stringify(masterData, null, 2)}

Job Description:
${finalJobDescription}
`;

  try {
    const model = await getModel(modelId);
    const { object } = await generateObject({
      model,
      schema: TailoredResumeSchema,
      prompt,
    });

    if (jobApplicationId) {
      const tailoredResume = await prisma.tailoredResume.create({
        data: {
          content: JSON.stringify(object),
        }
      });

      await prisma.jobApplication.update({
        where: { id: jobApplicationId },
        data: { tailoredResumeId: tailoredResume.id }
      });
    }

    return object;
  } catch (error: any) {
    console.error("AI Generation failed:", error);
    if (error?.message?.includes('503')) {
      throw new Error("AI_MODEL_OVERLOADED");
    }
    throw new Error("Failed to generate tailored resume.");
  }
}
