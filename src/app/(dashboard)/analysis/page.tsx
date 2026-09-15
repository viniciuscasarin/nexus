import { JobAnalysis } from "@/components/job-analysis";

export default function AnalysisPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold mb-8">Job Analysis</h1>
      <JobAnalysis />
    </div>
  );
}
