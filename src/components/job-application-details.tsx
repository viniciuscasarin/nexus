"use client";

import React, { useState } from "react";
import { JobApplication, Comment } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, FileText, Wand2, ExternalLink, Send } from "lucide-react";
import { generateTailoredResume } from "@/app/actions/generate";
import { addComment } from "@/app/actions/job-application";
import { TailoredResumeView } from "./tailored-resume";

export function JobApplicationDetails({
  job,
  isOpen,
  onClose,
}: {
  job: (JobApplication & { comments: Comment[] }) | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // In a real app we'd fetch the TailoredResume if job.tailoredResumeId is present.
  // For the sake of the task, we allow generation.

  if (!job) return null;

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);
    try {
      const { getAvailableModels } = await import("@/app/actions/models");
      const models = await getAvailableModels();
      if (!models || models.length === 0) {
        throw new Error("No AI models available. Please check your API keys.");
      }
      
      const firstModel = models[0].id;
      await generateTailoredResume(job!.id, firstModel);
      // Ideally we would update the job state to show the resume, but a refresh works too
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to generate resume");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSubmitComment() {
    if (!newComment.trim() || !job) return;
    setIsSubmittingComment(true);
    try {
      await addComment(job.id, newComment);
      setNewComment("");
    } catch (err: any) {
      console.error("Failed to add comment:", err);
    } finally {
      setIsSubmittingComment(false);
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

          <div className="space-y-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <h4 className="font-semibold text-lg">Comments</h4>
            <div className="max-h-48 overflow-y-auto space-y-3 pr-2">
              {job.comments.length === 0 ? (
                <p className="text-sm text-zinc-500">No comments yet.</p>
              ) : (
                job.comments.map((comment) => (
                  <div key={comment.id} className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-md">
                    <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                    <div className="text-[10px] text-zinc-400 mt-2">
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="flex gap-2 items-start mt-4">
              <Textarea
                placeholder="Add a comment or note..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="resize-none h-20"
              />
              <Button 
                onClick={handleSubmitComment} 
                disabled={!newComment.trim() || isSubmittingComment}
                className="mt-1"
              >
                {isSubmittingComment ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
