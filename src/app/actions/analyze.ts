"use server";

import { GoogleGenAI } from "@google/genai";
import { loadMasterResume } from "./resume";

const ai = new GoogleGenAI({});

export interface JobAnalysisResult {
  score: number;
  missingSkills: string[];
  reasoning: string;
}

export async function analyzeJob(jobDescription: string): Promise<JobAnalysisResult> {
  const masterData = await loadMasterResume();
  if (!masterData) {
    throw new Error("No master resume data found. Please complete your master resume first.");
  }

  const prompt = `
You are an expert technical recruiter and ATS (Applicant Tracking System) optimizer.
I am providing you with my master resume data and a job description. 
Compare my resume against the job description and evaluate my compatibility.

Output a structured JSON object with the following schema:
{
  "score": number, // 0-100 indicating how well the resume matches the job
  "missingSkills": string[], // a list of key skills required by the job that are missing or poorly represented in the resume
  "reasoning": string // a brief explanation of the score and missing skills
}

Master Resume:
${JSON.stringify(masterData, null, 2)}

Job Description:
${jobDescription}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Failed to generate analysis.");
    }
    
    const parsed = JSON.parse(text) as JobAnalysisResult;
    return parsed;
  } catch (error) {
    console.error("AI Analysis failed:", error);
    throw new Error("Failed to analyze job description.");
  }
}
