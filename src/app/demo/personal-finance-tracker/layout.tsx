import type { Metadata } from "next";
import { DemoNavbar } from "@/components/demo/apexwealth/demo-navbar";
import { DemoFooter } from "@/components/demo/apexwealth/demo-footer";

export const metadata: Metadata = {
  title: "ApexWealth Financial Intelligence | OmniTech Demo",
  description: "Next-generation personal finance tracking and wealth management dashboard.",
};

export default function PersonalFinanceTrackerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <DemoNavbar />
      <main className="flex-1">
        {children}
      </main>
      <DemoFooter />
    </div>
  );
}
