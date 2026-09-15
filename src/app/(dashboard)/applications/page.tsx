import { getJobApplications } from "@/app/actions/job-application";
import { NewApplicationModal } from "@/components/new-application-modal";
import { KanbanBoard } from "@/components/kanban-board";

export default async function ApplicationsPage() {
  const applications = await getJobApplications();

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your job applications.
          </p>
        </div>
        <NewApplicationModal />
      </div>

      <div className="flex-1 mt-8 overflow-hidden">
        <KanbanBoard initialApplications={applications} />
      </div>
    </div>
  );
}
