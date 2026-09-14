"use server";

import { GoogleGenAI } from "@google/genai";
import { loadMasterResume } from "./resume";

const ai = new GoogleGenAI({});

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

export async function generateTailoredResume(jobDescription: string): Promise<TailoredResume> {
  const masterData = await loadMasterResume();
  if (!masterData) {
    throw new Error("No master resume data found. Please complete your master resume first.");
  }

  const prompt = `
You are an expert technical resume writer.
I am providing you with my master resume data and a job description. 
Generate a highly tailored and optimized resume for this specific job description, using ONLY the facts and experiences provided in the master resume. 

Rules:
1. DO NOT invent any new experiences, jobs, degrees, or skills that are not present in the master resume.
2. Select and highlight the most relevant experiences and skills for the job description.
3. You may rephrase bullet points to emphasize impact and relevance to the job description, but do not exaggerate or lie.
4. Output the tailored resume as a structured JSON object matching the provided schema.

Output Schema:
{
  "personalInfo": {
    "name": string,
    "email": string,
    "phone": string,
    "location": string,
    "title": string, // Tailor this title to match the job, if appropriate based on experience
    "summary": string, // A short, impactful summary tailored to the job
    "linkedin": string,
    "github": string,
    "website": string
  },
  "experience": [
    {
      "company": string,
      "position": string,
      "startDate": string,
      "endDate": string,
      "location": string,
      "description": string[] // 3-5 high-impact bullet points relevant to the job
    }
  ],
  "education": [
    {
      "institution": string,
      "degree": string,
      "field": string,
      "startDate": string,
      "endDate": string
    }
  ],
  "skills": [
    {
      "name": string,
      "category": string
    }
  ]
}

Master Resume:
${JSON.stringify(masterData, null, 2)}

Job Description:
${jobDescription}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Failed to generate resume.");
    }
    
    const parsed = JSON.parse(text) as TailoredResume;
    return parsed;
  } catch (error) {
    console.error("AI Generation failed:", error);
    throw new Error("Failed to generate tailored resume.");
  }
}
