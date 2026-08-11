import Image from "next/image";
import type { Project } from "../data/projects";
import { Tag } from "./Tag";

type ProjectPreviewCardProps = { project: Project; index: number };

export function ProjectPreviewCard({ project, index }: ProjectPreviewCardProps) {
  return <article className={`project-card project-tone-${(index % 3) + 1}`} data-component="ProjectPreviewCard"><a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel={project.href.startsWith("http") ? "noreferrer" : undefined} aria-label={`View case study: ${project.title}`}><div className="project-media"><Image unoptimized src={project.image} alt={project.alt} width={900} height={620} className="project-image" /><span className="project-number" aria-hidden="true">0{index + 1}</span></div><div className="project-content"><p className="project-date">{project.date}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="tag-list" aria-label="Project categories">{project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div><span className="project-link">View case study <span aria-hidden="true">↗</span></span></div></a></article>;
}
