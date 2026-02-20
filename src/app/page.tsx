import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { PricingSection } from "@/components/PricingSection";
import { Steps } from "@/components/Steps";
import { EntertainmentMarquee } from "@/components/EntertainmentMarquee";
import { StressFreeSection } from "@/components/StressFreeSection";

import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero - Full screen intro with rotating disciplines */}
      <Hero />
      {/* Services - 4 core engineering disciplines */}
      <HowItWorks />
      {/* Why Choose Us - Value proposition on dark navy */}
      <PricingSection />
      {/* Project Process - Interactive step-by-step */}
      <Steps />
      {/* Sectors We Serve - Scrolling marquee */}
      <EntertainmentMarquee />
      {/* Testimonials & Benefits */}
      <StressFreeSection />

      {/* Contact Form */}
      <ContactSection />
    </div>
  );
}
