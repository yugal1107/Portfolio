/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { resolveImageUrl } from "@/lib/cloudinary";
import type { StoryDetail } from "@/types/content";

type StoryDetailPageProps = {
  story: StoryDetail;
};

export function StoryDetailPage({ story }: StoryDetailPageProps) {
  const markdownParagraphs = story.contentMarkdown
    ? story.contentMarkdown.split(/\n\n+/).filter(Boolean)
    : [];

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-zinc-100">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-semibold text-white">{story.title}</h1>
          <p className="text-zinc-400">{story.dateText || ""}</p>
        </div>

        {story.images?.[0] ? (
          <img
            src={resolveImageUrl(story.images[0], story.imagePublicIds?.[0] || story.cardImagePublicId, "storyHero")}
            alt={story.title}
            className="w-full rounded-xl object-cover"
          />
        ) : null}

        {story.images?.length > 1 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {story.images.slice(1).map((image, index) => (
              <img
                key={`${story.slug}-img-${image}-${index}`}
                src={resolveImageUrl(image, story.imagePublicIds?.[index + 1], "storyGallery")}
                alt={`${story.title} visual ${index + 2}`}
                className="h-56 w-full rounded-xl object-cover"
                loading="lazy"
              />
            ))}
          </div>
        ) : null}

        <div className="space-y-4 text-lg leading-relaxed text-zinc-300">
          {markdownParagraphs.map((paragraph, index) => (
            <p key={`${story.slug}-paragraph-${index + 1}`}>{paragraph}</p>
          ))}
        </div>

        <div>
          <Link href="/stories" className="text-zinc-300 underline hover:text-white">
            Back to stories
          </Link>
        </div>
      </div>
    </main>
  );
}
