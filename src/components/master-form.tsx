"use client";

import { useState, useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { masterResumeSchema, MasterResumeFormValues } from "@/lib/validations/resume";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { saveMasterResume } from "@/app/actions/resume";

export function MasterForm({ initialData }: { initialData?: MasterResumeFormValues | null }) {
  const [isPending, startTransition] = useTransition();
  const [showPersonalInfo, setShowPersonalInfo] = useState(true);
  const [showExperience, setShowExperience] = useState(true);
  const [showEducation, setShowEducation] = useState(true);
  const [showSkills, setShowSkills] = useState(true);

  const form = useForm<z.infer<typeof masterResumeSchema>>({
    resolver: zodResolver(masterResumeSchema),
    defaultValues: initialData || {
      personalInfo: { fullName: "", email: "", phone: "", location: "", summary: "" },
      experiences: [],
      educations: [],
      skills: [],
    },
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const onSubmit = (data: z.infer<typeof masterResumeSchema>) => {
    startTransition(async () => {
      try {
        await saveMasterResume(data);
        alert("Resume data saved successfully!");
      } catch (error) {
        console.error("Failed to save resume", error);
        alert("Failed to save resume data. See console for details.");
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowPersonalInfo(!showPersonalInfo)}>
            <CardTitle>Personal Information</CardTitle>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
              {showPersonalInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardHeader>
        {showPersonalInfo && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...form.register("personalInfo.fullName")} />
              {form.formState.errors.personalInfo?.fullName && (
                <p className="text-sm text-red-500">{form.formState.errors.personalInfo.fullName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("personalInfo.email")} />
              {form.formState.errors.personalInfo?.email && (
                <p className="text-sm text-red-500">{form.formState.errors.personalInfo.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...form.register("personalInfo.phone")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("personalInfo.location")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea id="summary" className="resize-y" {...form.register("personalInfo.summary")} />
          </div>
        </CardContent>
        )}
      </Card>

      {/* Experience Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowExperience(!showExperience)}>
            <CardTitle>Experience</CardTitle>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
              {showExperience ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => appendExp({ company: "", position: "", current: false, description: "" })}>
            <Plus className="w-4 h-4 mr-2" /> Add Experience
          </Button>
        </CardHeader>
        {showExperience && (
        <CardContent className="space-y-6">
          {expFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
              <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => removeExp(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input {...form.register(`experiences.${index}.company`)} />
                  {form.formState.errors.experiences?.[index]?.company && (
                    <p className="text-sm text-red-500">{form.formState.errors.experiences[index]?.company?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input {...form.register(`experiences.${index}.position`)} />
                  {form.formState.errors.experiences?.[index]?.position && (
                    <p className="text-sm text-red-500">{form.formState.errors.experiences[index]?.position?.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" {...form.register(`experiences.${index}.startDate`)} />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" {...form.register(`experiences.${index}.endDate`)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea className="resize-y" {...form.register(`experiences.${index}.description`)} />
                {form.formState.errors.experiences?.[index]?.description && (
                  <p className="text-sm text-red-500">{form.formState.errors.experiences[index]?.description?.message}</p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
        )}
      </Card>

      {/* Education Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowEducation(!showEducation)}>
            <CardTitle>Education</CardTitle>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
              {showEducation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => appendEdu({ institution: "", degree: "" })}>
            <Plus className="w-4 h-4 mr-2" /> Add Education
          </Button>
        </CardHeader>
        {showEducation && (
        <CardContent className="space-y-6">
          {eduFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
              <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-red-500" onClick={() => removeEdu(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input {...form.register(`educations.${index}.institution`)} />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input {...form.register(`educations.${index}.degree`)} />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input {...form.register(`educations.${index}.fieldOfStudy`)} />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        )}
      </Card>

      {/* Skills Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowSkills(!showSkills)}>
            <CardTitle>Skills</CardTitle>
            <Button type="button" variant="ghost" size="sm" className="h-8 w-8 p-0">
              {showSkills ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => appendSkill({ name: "" })}>
            <Plus className="w-4 h-4 mr-2" /> Add Skill
          </Button>
        </CardHeader>
        {showSkills && (
        <CardContent className="space-y-6">
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-end relative">
              <div className="flex-1 space-y-2">
                <Label>Skill Name</Label>
                <Input {...form.register(`skills.${index}.name`)} />
              </div>
              <div className="w-1/3 space-y-2">
                <Label>Level (Optional)</Label>
                <Input {...form.register(`skills.${index}.level`)} />
              </div>
              <Button type="button" variant="ghost" size="icon" className="text-red-500 mb-1" onClick={() => removeSkill(index)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
        )}
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Resume Data"}
        </Button>
      </div>
    </form>
  );
}
