import type { Metadata } from "next";

import { PostRow } from "@/components/writing/post-row";
import { SubscribeBlock } from "@/components/writing/subscribe";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/site/reveal";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Short essays on AI interfaces, the craft of design systems, and the small details that quietly earn user trust.",
};

export default function WritingPage() {
  return (
    <div className="page-anim">
      <Container as="section" className="pt-20 pb-15">
        <Eyebrow className="mb-8">Writing · Field notes</Eyebrow>
        <h1 className="font-serif text-[clamp(56px,9vw,144px)] font-normal leading-[0.92] tracking-[-0.03em]">
          Notes from
          <br />
          <span className="accent-it">the studio.</span>
        </h1>
        <p className="mt-8 max-w-[55ch] text-[18px] text-ink-dim">
          Things that bothered me enough at work to write about. Mostly AI interfaces, design
          systems, and the decisions that seem small until they&apos;re not.
        </p>
      </Container>

      <Container as="section" className="py-15">
        {POSTS.map((post) => (
          <Reveal key={post.slug}>
            <PostRow post={post} />
          </Reveal>
        ))}
      </Container>

      <SubscribeBlock />
    </div>
  );
}
