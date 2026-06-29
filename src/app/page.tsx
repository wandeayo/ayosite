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
        description="I work with a handful of teams each year. If you're building something with AI in it and you want a designer who'll obsess over the details, let's talk."
        primary={{ label: "Start a conversation", href: "/about" }}
      />
    </div>
  );
}
