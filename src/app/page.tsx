import { Hero } from "@/components/sections/hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { FeaturedWork } from "@/components/sections/featured-work";
import { TechnologySection } from "@/components/sections/technology-section";
import { WhyOmniTech } from "@/components/sections/why-omnitech";
import { CTASection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesSection />
      <ProcessSection />
      <FeaturedWork />
      <TechnologySection />
      <WhyOmniTech />
      <CTASection />
    </>
  );
}
