"use client";

import React, { useState } from "react";
import { JobApplication } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Wand2, ExternalLink } from "lucide-react";
import { generateTailoredResume } from "@/app/actions/generate";
import { TailoredResumeView } from "./tailored-resume";

export function JobApplicationDetails({
  job,
  isOpen,
  onClose,
}: {
  job: JobApplication | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In a real app we'd fetch the TailoredResume if job.tailoredResumeId is present.
  // For the sake of the task, we allow generation.

  if (!job) return null;

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);
    try {
      // Hardcoded modelId for simplicity, or we could fetch available models
      await generateTailoredResume(job!.id, "google:gemini-3.1-pro");
      // Ideally we would update the job state to show the resume, but a refresh works too
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to generate resume");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{job.title}</DialogTitle>
          <DialogDescription className="text-base text-zinc-600 dark:text-zinc-400">
            {job.company}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {job.link && (
            <div>
              <a
                href={job.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm text-blue-600 hover:underline"
              >
                View Job Posting <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-semibold">Job Description</h4>
            <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-md text-sm whitespace-pre-wrap">
              {job.description}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Tailored Resume</h4>
              {!job.tailoredResumeId && (
                <Button onClick={handleGenerate} disabled={isGenerating}>
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Generate Resume
                </Button>
              )}
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {job.tailoredResumeId ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 p-4 rounded-md flex items-center">
                <FileText className="h-5 w-5 mr-3" />
                <span className="font-medium">Resume generated successfully. (Refresh page if not showing)</span>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                No resume generated for this job yet.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
