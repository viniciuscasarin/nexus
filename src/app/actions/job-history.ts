"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveJob(data: {
  title: string;
  company: string;
  description: string;
  analysisResult: string;
}) {
  const savedJob = await prisma.savedJob.create({
    data,
  });

  revalidatePath("/history");
  return savedJob;
}

export async function getSavedJobs() {
  const jobs = await prisma.savedJob.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return jobs;
}
