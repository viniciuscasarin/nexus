"use server";

import { prisma } from "@/lib/prisma";
import { masterResumeSchema, MasterResumeFormValues } from "@/lib/validations/resume";
import { revalidatePath } from "next/cache";

export async function loadMasterResume(): Promise<MasterResumeFormValues | null> {
  const personalInfo = await prisma.personalInfo.findFirst();
  const experiences = await prisma.experience.findMany();
  const educations = await prisma.education.findMany();
  const skills = await prisma.skill.findMany();

  if (!personalInfo) {
    return null;
  }

  return {
    personalInfo: {
      fullName: personalInfo.fullName,
      email: personalInfo.email,
      phone: personalInfo.phone || "",
      location: personalInfo.location || "",
      summary: personalInfo.summary || "",
    },
    experiences: experiences.map(e => ({
      ...e,
      startDate: e.startDate || "",
      endDate: e.endDate || "",
    })),
    educations: educations.map(e => ({
      ...e,
      fieldOfStudy: e.fieldOfStudy || "",
      startDate: e.startDate || "",
      endDate: e.endDate || "",
    })),
    skills: skills.map(s => ({
      ...s,
      level: s.level || "",
    })),
  };
}

export async function saveMasterResume(data: MasterResumeFormValues) {
  const parsed = masterResumeSchema.parse(data);

  await prisma.$transaction(async (tx) => {
    // Upsert personal info (assuming one record, ID 1)
    const existingPersonal = await tx.personalInfo.findFirst();
    if (existingPersonal) {
      await tx.personalInfo.update({
        where: { id: existingPersonal.id },
        data: parsed.personalInfo,
      });
    } else {
      await tx.personalInfo.create({
        data: parsed.personalInfo,
      });
    }

    // Replace experiences
    await tx.experience.deleteMany();
    if (parsed.experiences.length > 0) {
      await tx.experience.createMany({
        data: parsed.experiences.map(e => ({
          ...e,
          // Since the schema has current, we must provide it. Zod should ensure it's there.
        })),
      });
    }

    // Replace educations
    await tx.education.deleteMany();
    if (parsed.educations.length > 0) {
      await tx.education.createMany({
        data: parsed.educations,
      });
    }

    // Replace skills
    await tx.skill.deleteMany();
    if (parsed.skills.length > 0) {
      await tx.skill.createMany({
        data: parsed.skills,
      });
    }
  });

  revalidatePath("/");
  return { success: true };
}
