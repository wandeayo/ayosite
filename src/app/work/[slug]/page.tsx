import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CASE_STUDIES } from "@/components/case-study/registry";
import { CaseInProgress } from "@/components/case-study/case-in-progress";
import { CaseNext } from "@/components/case-study/case-next";
import { PROJECTS, getAdjacentProjects, getProjectBySlug } from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const CaseStudy = CASE_STUDIES[slug];
  const adjacent = getAdjacentProjects(slug);

  return (
    <article className="page-anim">
      {CaseStudy ? <CaseStudy /> : <CaseInProgress project={project} />}
      {adjacent && <CaseNext prev={adjacent.prev} next={adjacent.next} />}
    </article>
  );
}
