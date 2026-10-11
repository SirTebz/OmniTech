import Link from "next/link";
import { Plane } from "lucide-react";

export function DemoFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-sky-500" />
            <span className="font-bold text-lg text-sky-500">AeroReserve</span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            This is an interactive demo built by <Link href="/" className="text-foreground hover:text-sky-500 transition-colors font-medium">OmniTech Digital</Link>.
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {currentYear} OmniTech Digital
          </div>
        </div>
      </div>
    </footer>
  );
}
