import { MasterForm } from "@/components/master-form";
import { loadMasterResume } from "@/app/actions/resume";

export default async function ResumePage() {
  const initialData = await loadMasterResume();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold mb-8">Resume Master Data</h1>
      <MasterForm initialData={initialData} />
    </div>
  );
}
