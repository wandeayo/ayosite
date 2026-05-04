import { Capabilities } from "@/components/home/capabilities";
import { CTAStrip } from "@/components/home/cta-strip";
import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { Testimonials } from "@/components/home/testimonials";

export default function HomePage() {
  return (
    <div className="page-anim">
      <Hero />
      <SelectedWork />
      <Capabilities />
      <Testimonials />
      <CTAStrip
        lead={<>Have a problem</>}
        emphasis="worth thinking about?"
        description="I take on a small number of senior product engagements each year. If you are building something with AI at its core, let's talk."
        primary={{ label: "Start a conversation", href: "/about" }}
      />
    </div>
  );
}
