"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeJob, JobAnalysisResult } from "@/app/actions/analyze";
import { generateTailoredResume, TailoredResume } from "@/app/actions/generate";

import { getAvailableModels, AvailableModel } from "@/app/actions/models";
import { Loader2 } from "lucide-react";
import { TailoredResumeView } from "./tailored-resume";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

export function JobAnalysis() {
  const [jobDescription, setJobDescription] = useState("");
  const [models, setModels] = useState<AvailableModel[]>([]);
  const [modelId, setModelId] = useState<string>("");
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<JobAnalysisResult | null>(null);
  const [tailoredResume, setTailoredResume] = useState<TailoredResume | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchModels() {
      try {
        const availableModels = await getAvailableModels();
        setModels(availableModels);
        if (availableModels.length > 0) {
          setModelId(availableModels[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch models", err);
      } finally {
        setIsLoadingModels(false);
      }
    }
    fetchModels();
  }, []);

  const handleAnalyze = async () => {
    if (!modelId) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setTailoredResume(null);
    try {
      const analysisResult = await analyzeJob(jobDescription, modelId);
      setResult(analysisResult);
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerate = async () => {
    if (!modelId) return;
    setIsGenerating(true);
    setError(null);
    try {
      const resumeResult = await generateTailoredResume(0, modelId);
      setTailoredResume(resumeResult as any);
    } catch (err: any) {
      setError(err.message || "An error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;
    setIsSaving(true);
    try {
    } catch (err: any) {
      setError(err.message || "Failed to save job.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="mt-8 print:hidden">
        <CardHeader>
          <CardTitle>Job Description Analysis</CardTitle>
          <CardDescription>Paste the job description below to analyze compatibility with your master resume.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="model">AI Model</Label>
            <Select value={modelId} onValueChange={(val) => val && setModelId(val)} disabled={isLoadingModels || models.length === 0}>
              <SelectTrigger id="model">
                <SelectValue placeholder={isLoadingModels ? "Loading models..." : "Select an AI model"} />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={10}
          />
          <Button onClick={handleAnalyze} disabled={!jobDescription.trim() || !modelId || isAnalyzing || isGenerating}>
            {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Analyze Compatibility
          </Button>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          {result && (
            <div className="mt-6 space-y-4 border-t pt-4">
              <div>
                <h3 className="font-semibold text-lg">Compatibility Score: <span className={result.score >= 70 ? "text-green-600" : "text-amber-600"}>{result.score}/100</span></h3>
              </div>
              <div>
                <h4 className="font-medium">Missing Skills:</h4>
                {result.missingSkills.length > 0 ? (
                  <ul className="list-disc pl-5 mt-1">
                    {result.missingSkills.map((skill, index) => (
                      <li key={index} className="text-sm">{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">None found! Great match.</p>
                )}
              </div>
              <div>
                <h4 className="font-medium">Reasoning:</h4>
                <p className="text-sm mt-1">{result.reasoning}</p>
              </div>
              
              <div className="pt-4 border-t flex gap-4">
                <Button onClick={handleGenerate} disabled={isGenerating}>
                  {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Tailored Resume
                </Button>

                <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                  <DialogTrigger render={<Button variant="outline" />}>
                    Save to History
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Save Job Analysis</DialogTitle>
                      <DialogDescription>
                        Save this job and its compatibility analysis for future reference.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Job Title
                        </Label>
                        <Input
                          id="title"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="company" className="text-right">
                          Company
                        </Label>
                        <Input
                          id="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSave} disabled={!jobTitle || !company || isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Job
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {tailoredResume && (
        <TailoredResumeView resume={tailoredResume} />
      )}
    </div>
  );
}
