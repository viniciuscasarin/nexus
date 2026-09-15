"use server";

import { generateObject } from 'ai';
import { z } from 'zod';
import { loadMasterResume } from './resume';
import { getModel } from './models';

export interface JobAnalysisResult {
  score: number;
  missingSkills: string[];
  reasoning: string;
}

const JobAnalysisSchema = z.object({
  score: z.number(),
  missingSkills: z.array(z.string()),
  reasoning: z.string(),
});

export async function analyzeJob(jobDescription: string, modelId: string): Promise<JobAnalysisResult> {
  const masterData = await loadMasterResume();
  if (!masterData) {
    throw new Error("No master resume data found. Please complete your master resume first.");
  }

  const prompt = `
You are an expert technical recruiter and ATS (Applicant Tracking System) optimizer.
I am providing you with my master resume data and a job description. 
Compare my resume against the job description and evaluate my compatibility.

Master Resume:
${JSON.stringify(masterData, null, 2)}

Job Description:
${jobDescription}
`;

  try {
    const model = await getModel(modelId);
    const { object } = await generateObject({
      model,
      schema: JobAnalysisSchema,
      prompt,
    });

    return object;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw new Error("Failed to analyze job description.");
  }
}
