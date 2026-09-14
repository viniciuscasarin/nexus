"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function JobAnalysis() {
  const [jobDescription, setJobDescription] = useState("");

  const handleAnalyze = () => {
    // For now, just log to verify state is captured as required by task 3.1
    console.log("Captured Job Description:", jobDescription);
  };

  return (
    <Card className="mt-8">
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
        <Button onClick={handleAnalyze} disabled={!jobDescription.trim()}>
          Analyze Compatibility
        </Button>
      </CardContent>
    </Card>
  );
}
