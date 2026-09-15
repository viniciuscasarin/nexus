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
      status: data.status || "INTERESSADO",
    },
  });

  revalidatePath("/");
  return application;
}

export async function getJobApplications() {
  const applications = await prisma.jobApplication.findMany({
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
