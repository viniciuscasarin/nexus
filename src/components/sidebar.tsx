"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Activity, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Resume Data", href: "/resume", icon: FileText },
  { name: "Job Analysis", href: "/analysis", icon: Activity },
  { name: "Applications", href: "/applications", icon: Briefcase },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800",
              isActive
                ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
