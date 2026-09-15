import { JobAnalysis } from "@/components/job-analysis";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";

export default function AnalysisPage() {
  return (
    <PageContainer variant="full" className="max-w-7xl space-y-8 mt-8">
      <PageHeader title="Job Analysis" />
      <JobAnalysis />
    </PageContainer>
  );
}
