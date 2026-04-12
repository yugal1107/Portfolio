import { Router } from "express";
import { z } from "zod";

import { db } from "../db/index.js";
import { contactRateLimiter } from "../middleware/rate-limit.js";

const publicRouter = Router();

type ProjectRow = {
  id: number;
  title: string;
  slug: string;
  description: string;
  live_url: string | null;
  github_url: string | null;
  image_url: string | null;
  image_public_id: string | null;
  tech_stack_json: string;
  featured: number;
  order_index: number;
};

type SkillGroupRow = {
  id: number;
  name: string;
  order_index: number;
};

type SkillRow = {
  id: number;
  skill_group_id: number;
  name: string;
  icon_key: string | null;
  order_index: number;
};

type StoryCardRow = {
  title: string;
  slug: string;
  date_text: string | null;
  location: string | null;
  status: string | null;
  card_image_url: string | null;
  card_image_public_id: string | null;
  order_index: number;
};

type StoryDetailRow = {
  title: string;
  slug: string;
  date_text: string | null;
  location: string | null;
  status: string | null;
  card_image_url: string | null;
  card_image_public_id: string | null;
  images_json: string;
  images_public_ids_json: string;
  description_json: string;
  project_json: string | null;
  outcomes_json: string;
  team_json: string | null;
};

const slugParamSchema = z.object({
  slug: z.string().trim().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(4000),
  website: z.string().trim().max(0).optional(),
});

const parseJsonArray = <T>(value: string, fallback: T[] = []): T[] => {
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
};

const parseJsonObject = <T>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
      return null;
    }
    return parsed as T;
  } catch {
    return null;
  }
};

const paragraphsToMarkdown = (paragraphs: string[]): string =>
  paragraphs
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join("\n\n");

publicRouter.get("/home", (_req, res, next) => {
  try {
    const settings = db
      .prepare(
        `
          SELECT
            full_name,
            title,
            bio,
            location,
            email,
            github_url,
            linkedin_url,
            twitter_url,
            instagram_url,
            resume_url,
            profile_image_url,
            profile_image_public_id
          FROM site_settings
          WHERE id = 1
          LIMIT 1
        `,
      )
      .get() as
      | {
          full_name: string;
          title: string;
          bio: string;
          location: string | null;
          email: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          twitter_url: string | null;
          instagram_url: string | null;
          resume_url: string | null;
          profile_image_url: string | null;
          profile_image_public_id: string | null;
        }
      | undefined;

    const projectRows = db
      .prepare(
        `
          SELECT
            id,
            title,
            slug,
            description,
            live_url,
            github_url,
            image_url,
            image_public_id,
            tech_stack_json,
            featured,
            order_index
          FROM projects
          WHERE is_published = 1
          ORDER BY order_index ASC, updated_at DESC
        `,
      )
      .all() as ProjectRow[];

    const skillGroupRows = db
      .prepare(
        `
          SELECT id, name, order_index
          FROM skill_groups
          WHERE is_published = 1
          ORDER BY order_index ASC, updated_at DESC
        `,
      )
      .all() as SkillGroupRow[];

    const skillRows = db
      .prepare(
        `
          SELECT id, skill_group_id, name, icon_key, order_index
          FROM skills
          WHERE is_published = 1
          ORDER BY order_index ASC, updated_at DESC
        `,
      )
      .all() as SkillRow[];

    const skillsByGroup = new Map<number, SkillRow[]>();
    for (const skill of skillRows) {
      const existing = skillsByGroup.get(skill.skill_group_id) ?? [];
      existing.push(skill);
      skillsByGroup.set(skill.skill_group_id, existing);
    }

    res.json({
      success: true,
      data: {
        settings: settings
          ? {
              fullName: settings.full_name,
              title: settings.title,
              bio: settings.bio,
              location: settings.location,
              email: settings.email,
              githubUrl: settings.github_url,
              linkedinUrl: settings.linkedin_url,
              twitterUrl: settings.twitter_url,
              instagramUrl: settings.instagram_url,
              resumeUrl: settings.resume_url,
              profileImageUrl: settings.profile_image_url,
              profileImagePublicId: settings.profile_image_public_id,
            }
          : null,
        projects: projectRows.map((project) => ({
          id: project.id,
          title: project.title,
          slug: project.slug,
          description: project.description,
          liveUrl: project.live_url,
          githubUrl: project.github_url,
          imageUrl: project.image_url,
          imagePublicId: project.image_public_id,
          techStack: parseJsonArray<string>(project.tech_stack_json),
          featured: Boolean(project.featured),
          orderIndex: project.order_index,
        })),
        skillGroups: skillGroupRows.map((group) => ({
          id: group.id,
          name: group.name,
          orderIndex: group.order_index,
          skills: (skillsByGroup.get(group.id) ?? []).map((skill) => ({
            id: skill.id,
            name: skill.name,
            iconKey: skill.icon_key,
            orderIndex: skill.order_index,
          })),
        })),
      },
    });
  } catch (error) {
    next(error);
  }
});

publicRouter.get("/stories", (_req, res, next) => {
  try {
    const rows = db
      .prepare(
        `
          SELECT
            title,
            slug,
            date_text,
            location,
            status,
            card_image_url,
            card_image_public_id,
            order_index
          FROM stories
          WHERE is_published = 1
          ORDER BY order_index ASC, updated_at DESC
        `,
      )
      .all() as StoryCardRow[];

    res.json({
      success: true,
      data: rows.map((story) => ({
        title: story.title,
        slug: story.slug,
        dateText: story.date_text,
        location: story.location,
        status: story.status,
        cardImageUrl: story.card_image_url,
        cardImagePublicId: story.card_image_public_id,
        orderIndex: story.order_index,
      })),
    });
  } catch (error) {
    next(error);
  }
});

publicRouter.post("/contact", contactRateLimiter, (req, res, next) => {
  try {
    const parsed = contactMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact payload",
      });
    }

    if (parsed.data.website) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact payload",
      });
    }

    db.prepare(
      `
        INSERT INTO contact_messages (name, email, message, status)
        VALUES (?, ?, ?, 'new')
      `,
    ).run(parsed.data.name, parsed.data.email, parsed.data.message);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    return next(error);
  }
});

publicRouter.get("/stories/:slug", (req, res, next) => {
  try {
    const parsedSlug = slugParamSchema.safeParse(req.params);
    if (!parsedSlug.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid story slug",
      });
    }

    const story = db
      .prepare(
        `
          SELECT
            title,
            slug,
            date_text,
            location,
            status,
            card_image_url,
            card_image_public_id,
            images_json,
            images_public_ids_json,
            description_json,
            project_json,
            outcomes_json,
            team_json
          FROM stories
          WHERE slug = ? AND is_published = 1
          LIMIT 1
        `,
      )
      .get(parsedSlug.data.slug) as StoryDetailRow | undefined;

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    const descriptionParagraphs = parseJsonArray<string>(story.description_json);

    return res.json({
      success: true,
      data: {
        title: story.title,
        slug: story.slug,
        dateText: story.date_text,
        location: story.location,
        status: story.status,
        cardImageUrl: story.card_image_url,
        cardImagePublicId: story.card_image_public_id,
        images: parseJsonArray<string>(story.images_json),
        imagePublicIds: parseJsonArray<string>(story.images_public_ids_json),
        contentMarkdown: paragraphsToMarkdown(descriptionParagraphs),
        project: parseJsonObject<Record<string, unknown>>(story.project_json),
        outcomes: parseJsonArray<string>(story.outcomes_json),
        team: parseJsonObject<Record<string, unknown>>(story.team_json),
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default publicRouter;
