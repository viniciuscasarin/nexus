"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeJob, JobAnalysisResult } from "@/app/actions/analyze";
import { generateTailoredResume, TailoredResume } from "@/app/actions/generate";
import { toast } from "sonner";
import { createJobApplication } from "@/app/actions/job-application";

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
  const [result, setResult] = useState<JobAnalysisResult | null>(null);
  const [tailoredResume, setTailoredResume] = useState<TailoredResume | null>(null);
  
  const [isGenerationModalOpen, setIsGenerationModalOpen] = useState(false);
  const [generationLanguage, setGenerationLanguage] = useState("English");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [isGeneratingAdhoc, setIsGeneratingAdhoc] = useState(false);
  const [isGeneratingAndSaving, setIsGeneratingAndSaving] = useState(false);

  useEffect(() => {
    async function fetchModels() {
      try {
        const availableModels = await getAvailableModels();
        setModels(availableModels);
        if (availableModels.length > 0) {
          const defaultModel = availableModels.find(m => m.id.includes('gemini-3')) || availableModels[0];
          setModelId(defaultModel.id);
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
    setResult(null);
    setTailoredResume(null);
    try {
      const analysisResult = await analyzeJob(jobDescription, modelId);
      setResult(analysisResult);
    } catch (err: any) {
      if (err.message?.includes("AI_MODEL_OVERLOADED")) {
        toast.error("The AI model is currently overloaded.", {
          action: {
            label: "Retry",
            onClick: () => handleAnalyze()
          }
        });
      } else {
        toast.error(err.message || "An error occurred during analysis.");
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateAdhoc = async () => {
    if (!modelId) return;
    setIsGeneratingAdhoc(true);
    try {
      const resumeResult = await generateTailoredResume({ 
        jobDescription, 
        modelId, 
        language: generationLanguage 
      });
      setTailoredResume(resumeResult as any);
      setIsGenerationModalOpen(false);
      toast.success("Resume generated successfully!");
    } catch (err: any) {
      if (err.message?.includes("AI_MODEL_OVERLOADED")) {
        toast.error("The AI model is currently overloaded.", {
          action: {
            label: "Retry",
            onClick: () => handleGenerateAdhoc()
          }
        });
      } else {
        toast.error(err.message || "An error occurred during generation.");
      }
    } finally {
      setIsGeneratingAdhoc(false);
    }
  };

  const handleGenerateAndSave = async () => {
    if (!modelId || !jobTitle || !company) return;
    setIsGeneratingAndSaving(true);
    try {
      const jobApp = await createJobApplication({
        title: jobTitle,
        company: company,
        description: jobDescription,
      });

      const resumeResult = await generateTailoredResume({ 
        jobApplicationId: jobApp.id,
        modelId, 
        language: generationLanguage 
      });
      setTailoredResume(resumeResult as any);
      setIsGenerationModalOpen(false);
      toast.success("Job saved and resume generated successfully!");
    } catch (err: any) {
      if (err.message?.includes("AI_MODEL_OVERLOADED")) {
        toast.error("The AI model is currently overloaded.", {
          action: {
            label: "Retry",
            onClick: () => handleGenerateAndSave()
          }
        });
      } else {
        toast.error(err.message || "An error occurred during generation and saving.");
      }
    } finally {
      setIsGeneratingAndSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Column: Input Form */}
      <Card className="print:hidden flex flex-col h-full lg:min-h-[calc(100vh-250px)]">
        <CardHeader className="shrink-0">
          <CardTitle>Job Description Analysis</CardTitle>
          <CardDescription>Paste the job description below to analyze compatibility with your master resume.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col">
          <div className="flex flex-col space-y-1.5 shrink-0">
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
            className="flex-1 min-h-[250px] lg:h-[calc(100vh-350px)] resize-none overflow-y-auto"
          />
          
          <div className="pt-2 shrink-0">
            <Button onClick={handleAnalyze} className="w-full" disabled={!jobDescription.trim() || !modelId || isAnalyzing || isGeneratingAdhoc || isGeneratingAndSaving}>
              {isAnalyzing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze Compatibility
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Right Column: Analysis Results & Resume Actions */}
      <div className="space-y-6">
        {result ? (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              
              <div className="pt-4 border-t flex flex-col gap-4">
                <Dialog open={isGenerationModalOpen} onOpenChange={setIsGenerationModalOpen}>
                  <DialogTrigger asChild>
                    <Button disabled={isGeneratingAdhoc || isGeneratingAndSaving} className="w-full">
                      {(isGeneratingAdhoc || isGeneratingAndSaving) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Generate Tailored Resume
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Generate Tailored Resume</DialogTitle>
                      <DialogDescription>
                        Configure your resume generation. You can generate it ad-hoc or save the job to your board.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="language" className="text-right">
                          Language
                        </Label>
                        <Select value={generationLanguage} onValueChange={(val) => val && setGenerationLanguage(val)}>
                          <SelectTrigger id="language" className="col-span-3">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Portuguese">Portuguese</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4 mt-2">
                        <div className="col-span-4 text-sm text-gray-500 mb-2">Optional: Save job to Kanban board</div>
                        <Label htmlFor="title" className="text-right">
                          Job Title
                        </Label>
                        <Input
                          id="title"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                          className="col-span-3"
                          placeholder="e.g. Software Engineer"
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
                          placeholder="e.g. Acme Corp"
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        onClick={handleGenerateAdhoc} 
                        disabled={isGeneratingAdhoc || isGeneratingAndSaving}
                      >
                        {isGeneratingAdhoc && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Generate without saving
                      </Button>
                      <Button 
                        onClick={handleGenerateAndSave} 
                        disabled={!jobTitle || !company || isGeneratingAdhoc || isGeneratingAndSaving}
                      >
                        {isGeneratingAndSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Generate and save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {tailoredResume && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="w-full">
                        View Generated Resume
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Tailored Resume</DialogTitle>
                      </DialogHeader>
                      <TailoredResumeView resume={tailoredResume} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="h-[250px] flex items-center justify-center text-muted-foreground border-dashed">
            <p>Analysis results will appear here</p>
          </Card>
        )}
      </div>
    </div>
  );
}
