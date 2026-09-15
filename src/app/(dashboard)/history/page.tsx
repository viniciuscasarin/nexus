import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "History",
};

export default function HistoryPage() {
  return (
    <PageContainer variant="default">
      <PageHeader 
        title="History" 
        description="View your past activities."
      />
      <div>History content goes here.</div>
    </PageContainer>
  );
}
