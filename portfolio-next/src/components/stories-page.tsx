/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { resolveImageUrl } from "@/lib/cloudinary";
import type { StoryCard } from "@/types/content";

type StoriesPageProps = {
  stories: StoryCard[];
};

export function StoriesPage({ stories }: StoriesPageProps) {
  const sortedStories = [...stories].sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-semibold">Stories</h1>
        <p className="mt-2 text-zinc-300">A timeline of experiences, learnings, and projects.</p>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-14 md:grid-cols-2 lg:grid-cols-3">
        {sortedStories.map((story) => (
          <Link
            key={story.slug}
            href={`/story/${story.slug}`}
            className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition hover:-translate-y-0.5 hover:border-zinc-700"
          >
            {resolveImageUrl(story.cardImageUrl, story.cardImagePublicId, "storyCard") ? (
              <img
                src={resolveImageUrl(story.cardImageUrl, story.cardImagePublicId, "storyCard")}
                alt={story.title}
                className="h-44 w-full object-cover"
                loading="lazy"
              />
            ) : null}
            <div className="space-y-2 p-4">
              <h2 className="text-xl font-medium text-white">{story.title}</h2>
              <p className="text-sm text-zinc-400">{story.dateText || ""}</p>
              {story.location ? <p className="text-sm text-zinc-400">{story.location}</p> : null}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
