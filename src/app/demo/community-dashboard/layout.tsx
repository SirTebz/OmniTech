import { Metadata } from "next";
import { DemoNavbar } from "@/components/demo/nexushub/demo-navbar";
import { DemoFooter } from "@/components/demo/nexushub/demo-footer";

export const metadata: Metadata = {
  title: "NexusHub Community Engine | OmniTech Demo",
  description:
    "Interactive cohort community platform with multi-channel code teardowns, interactive snippets, live events calendar, and audit controls.",
};

export default function NexusHubDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-violet-500/20 selection:text-violet-700 dark:selection:text-violet-300">
      <DemoNavbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <DemoFooter />
    </div>
  );
}
