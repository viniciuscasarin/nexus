import { MasterForm } from "@/components/master-form";
import { JobAnalysis } from "@/components/job-analysis";
import { loadMasterResume } from "@/app/actions/resume";

export default async function Home() {
  const initialData = await loadMasterResume();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Resume Master Data</h1>
        <MasterForm initialData={initialData} />
        <JobAnalysis />
      </main>
    </div>
  );
}
