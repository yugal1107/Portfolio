/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { resolveImageUrl } from "@/lib/cloudinary";
import type { HomePayload, StoryCard } from "@/types/content";

import { ContactForm } from "./contact-form";

type HomePageProps = {
  homeData: HomePayload;
  stories: StoryCard[];
};

export function HomePage({ homeData, stories }: HomePageProps) {
  const featuredProjects = [...homeData.projects].sort((a, b) => a.orderIndex - b.orderIndex).slice(0, 6);
  const featuredStories = [...stories].sort((a, b) => a.orderIndex - b.orderIndex).slice(0, 3);

  return (
    <main className="bg-black text-zinc-100">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-14 md:py-20">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Portfolio</p>
        <h1 className="text-4xl font-semibold md:text-6xl">{homeData.settings?.fullName || "Yugal Burde"}</h1>
        <p className="max-w-3xl text-lg text-zinc-300">{homeData.settings?.bio || "Software developer and builder."}</p>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-300">
          {homeData.settings?.githubUrl ? (
            <a className="rounded border border-zinc-700 px-4 py-2 hover:border-zinc-500" href={homeData.settings.githubUrl} target="_blank" rel="noreferrer noopener">
              GitHub
            </a>
          ) : null}
          {homeData.settings?.linkedinUrl ? (
            <a className="rounded border border-zinc-700 px-4 py-2 hover:border-zinc-500" href={homeData.settings.linkedinUrl} target="_blank" rel="noreferrer noopener">
              LinkedIn
            </a>
          ) : null}
          <Link href="/stories" className="rounded border border-zinc-700 px-4 py-2 hover:border-zinc-500">
            Read stories
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Projects</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <article key={project.id} className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
              {resolveImageUrl(project.imageUrl, project.imagePublicId, "projectCard") ? (
                <img
                  src={resolveImageUrl(project.imageUrl, project.imagePublicId, "projectCard")}
                  alt={project.title}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
              ) : null}
              <div className="space-y-3 p-5">
                <h3 className="text-xl font-medium text-white">{project.title}</h3>
                <p className="text-sm text-zinc-300">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                  {project.techStack.map((tech) => (
                    <span key={`${project.id}-${tech}`} className="rounded-full border border-zinc-700 px-2 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm text-zinc-300">
                  {project.liveUrl ? (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" className="hover:text-white">
                      Live
                    </a>
                  ) : null}
                  {project.githubUrl ? (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer noopener" className="hover:text-white">
                      GitHub
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Stories</h2>
          <Link href="/stories" className="text-sm text-zinc-300 hover:text-white">
            View all
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredStories.map((story) => (
            <Link
              key={story.slug}
              href={`/story/${story.slug}`}
              className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition hover:-translate-y-0.5 hover:border-zinc-700"
            >
              {resolveImageUrl(story.cardImageUrl, story.cardImagePublicId, "storyCard") ? (
                <img
                  src={resolveImageUrl(story.cardImageUrl, story.cardImagePublicId, "storyCard")}
                  alt={story.title}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              ) : null}
              <div className="space-y-2 p-4">
                <h3 className="text-lg font-medium text-white">{story.title}</h3>
                <p className="text-sm text-zinc-400">{story.dateText || ""}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
