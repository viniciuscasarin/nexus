import { MasterForm } from "@/components/master-form";
import { loadMasterResume } from "@/app/actions/resume";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";

export default async function ResumePage() {
  const initialData = await loadMasterResume();

  return (
    <PageContainer variant="default">
      <PageHeader 
        title="Resume Master Data" 
        description="Manage your comprehensive professional history and skills."
      />
      <MasterForm initialData={initialData} />
    </PageContainer>
  );
}
