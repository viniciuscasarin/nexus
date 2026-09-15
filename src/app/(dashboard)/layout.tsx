import { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4">
        <h2 className="text-xl font-bold mb-4">Nexus</h2>
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
