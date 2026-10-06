import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-16 bg-background">
      <Container size="small" className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-xs font-mono text-muted-foreground uppercase font-bold">
          <Terminal className="w-3.5 h-3.5" />
          <span>HTTP 404 • Resource Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground font-mono">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          This page went offline or never existed.
        </h2>

        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          The URL you requested could not be resolved on our server. Please check the spelling or return to the main homepage.
        </p>

        <div className="pt-4">
          <Button href="/" size="md">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Return to Safety (Home)</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}
