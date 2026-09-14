"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeJob, JobAnalysisResult } from "@/app/actions/analyze";
import { generateTailoredResume, TailoredResume } from "@/app/actions/generate";
import { Loader2 } from "lucide-react";
import { TailoredResumeView } from "./tailored-resume";

export function JobAnalysis() {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<JobAnalysisResult | null>(null);
  const [tailoredResume, setTailoredResume] = useState<TailoredResume | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setTailoredResume(null);
    try {
      const analysisResult = await analyzeJob(jobDescription);
      setResult(analysisResult);
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const resumeResult = await generateTailoredResume(jobDescription);
      setTailoredResume(resumeResult);
    } catch (err: any) {
      setError(err.message || "An error occurred during generation.");
    } finally {
      setIsGenerating(false);
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
          <Textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={10}
          />
          <Button onClick={handleAnalyze} disabled={!jobDescription.trim() || isAnalyzing || isGenerating}>
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
              
              <div className="pt-4 border-t">
                <Button onClick={handleGenerate} disabled={isGenerating}>
                  {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Tailored Resume
                </Button>
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
