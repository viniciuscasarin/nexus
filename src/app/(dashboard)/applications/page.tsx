import { getJobApplications } from "@/app/actions/job-application";
import { NewApplicationModal } from "@/components/new-application-modal";
import { KanbanBoard } from "@/components/kanban-board";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";

export default async function ApplicationsPage() {
  const applications = await getJobApplications();

  return (
    <PageContainer variant="full" className="h-full flex flex-col">
      <PageHeader
        title="Applications"
        description="Track and manage your job applications."
        actions={<NewApplicationModal />}
      />

      <div className="flex-1 overflow-hidden">
        <KanbanBoard initialApplications={applications} />
      </div>
    </PageContainer>
  );
}
