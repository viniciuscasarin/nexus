import { MasterForm } from "@/components/master-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Resume Master Data</h1>
        <MasterForm />
      </main>
    </div>
  );
}
