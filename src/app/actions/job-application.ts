"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createJobApplication(data: {
  title: string;
  company: string;
  link?: string;
  description: string;
  status?: string;
}) {
  const application = await prisma.jobApplication.create({
    data: {
      ...data,
      status: data.status || "INTERESTED",
    },
  });

  revalidatePath("/");
  return application;
}

export async function getJobApplications() {
  const applications = await prisma.jobApplication.findMany({
    include: {
      comments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return applications;
}

export async function updateJobApplicationStatus(id: number, status: string) {
  const application = await prisma.jobApplication.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/");
  return application;
}

export async function addComment(jobApplicationId: number, content: string) {
  const comment = await prisma.comment.create({
    data: {
      content,
      jobApplicationId,
    },
  });

  revalidatePath("/");
  return comment;
}
