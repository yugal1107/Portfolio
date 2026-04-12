import { Router } from "express";
import { z } from "zod";

import { db } from "../db/index.js";

const adminContentRouter = Router();

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const contactMessageStatusSchema = z.object({
  status: z.enum(["new", "read", "archived"]),
});

const projectSchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().min(1),
  liveUrl: z.string().trim().url().nullable().optional(),
  githubUrl: z.string().trim().url().nullable().optional(),
  imageUrl: z.string().trim().min(1).nullable().optional(),
  imagePublicId: z.string().trim().min(1).nullable().optional(),
  techStack: z.array(z.string().trim().min(1)).default([]),
  featured: z.boolean().default(false),
  orderIndex: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

const settingsSchema = z
  .object({
    fullName: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().trim().min(1).optional(),
    ),
    title: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().trim().min(1).optional(),
    ),
    bio: z.preprocess(
      (value) => (value === "" ? undefined : value),
      z.string().trim().min(1).optional(),
    ),
    location: z.preprocess(
      (value) => (value === "" ? null : value),
      z.string().trim().nullable().optional(),
    ),
    email: z.preprocess(
      (value) => (value === "" ? null : value),
      z.string().trim().email().nullable().optional(),
    ),
    githubUrl: z.preprocess(
      (value) => (value === "" ? null : value),
      z.string().trim().url().nullable().optional(),
    ),
    linkedinUrl: z.preprocess(
      (value) => (value === "" ? null : value),
      z.string().trim().url().nullable().optional(),
    ),
    twitterUrl: z.preprocess(
      (value) => (value === "" ? null : value),
      z.string().trim().url().nullable().optional(),
    ),
    instagramUrl: z.preprocess(
      (value) => (value === "" ? null : value),
      z.string().trim().url().nullable().optional(),
    ),
    resumeUrl: z.preprocess(
      (value) => (value === "" ? null : value),
      z.string().trim().url().nullable().optional(),
    ),
    profileImageUrl: z.preprocess(
      (value) => (value === "" ? null : value),
      z.string().trim().min(1).nullable().optional(),
    ),
    profileImagePublicId: z.preprocess(
      (value) => (value === "" ? null : value),
      z.string().trim().min(1).nullable().optional(),
    ),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required",
  });

const skillGroupSchema = z.object({
  name: z.string().trim().min(1),
  orderIndex: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

const skillSchema = z.object({
  skillGroupId: z.number().int().positive(),
  name: z.string().trim().min(1),
  iconKey: z.string().trim().min(1).nullable().optional(),
  orderIndex: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

const storySchema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  dateText: z.string().trim().nullable().optional(),
  location: z.string().trim().nullable().optional(),
  status: z.string().trim().nullable().optional(),
  cardImageUrl: z.string().trim().min(1).nullable().optional(),
  cardImagePublicId: z.string().trim().min(1).nullable().optional(),
  images: z.array(z.string().trim().min(1)).default([]),
  imagePublicIds: z.array(z.string().trim().min(1)).default([]),
  contentMarkdown: z.string().default(""),
  project: z.record(z.any()).nullable().optional(),
  outcomes: z.array(z.string().trim().min(1)).default([]),
  team: z.record(z.any()).nullable().optional(),
  orderIndex: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

const toDbBool = (value: boolean) => (value ? 1 : 0);

const parseJsonArray = <T>(value: string): T[] => {
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
};

const parseJsonObject = (value: string | null): Record<string, unknown> | null => {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
};

const markdownToParagraphs = (markdown: string): string[] => {
  return markdown
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
};

const paragraphsToMarkdown = (paragraphs: string[]): string => {
  return paragraphs
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join("\n\n");
};

adminContentRouter.get("/settings", (_req, res, next) => {
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
            profile_image_public_id,
            updated_at
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
          updated_at: string;
        }
      | undefined;

    if (!settings) {
      return res.status(404).json({ success: false, message: "Settings not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
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
        updatedAt: settings.updated_at,
      },
    });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.patch("/settings", (req, res, next) => {
  try {
    const parsed = settingsSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid settings payload" });
    }

    const columnMap: Record<string, string> = {
      fullName: "full_name",
      title: "title",
      bio: "bio",
      location: "location",
      email: "email",
      githubUrl: "github_url",
      linkedinUrl: "linkedin_url",
      twitterUrl: "twitter_url",
      instagramUrl: "instagram_url",
      resumeUrl: "resume_url",
      profileImageUrl: "profile_image_url",
      profileImagePublicId: "profile_image_public_id",
    };

    const updates: string[] = [];
    const values: unknown[] = [];

    for (const [key, value] of Object.entries(parsed.data)) {
      if (value === undefined) {
        continue;
      }
      const column = columnMap[key];
      if (!column) {
        continue;
      }
      updates.push(`${column} = ?`);
      values.push(value);
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: "No valid fields to update" });
    }

    values.push(1);

    const result = db
      .prepare(
        `
          UPDATE site_settings
          SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `,
      )
      .run(...values);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Settings not found" });
    }

    return res.status(200).json({ success: true, message: "Settings updated" });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.get("/projects", (_req, res, next) => {
  try {
    const rows = db
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
            order_index,
            is_published,
            created_at,
            updated_at
          FROM projects
          ORDER BY order_index ASC, updated_at DESC
        `,
      )
      .all() as Array<{
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
      is_published: number;
      created_at: string;
      updated_at: string;
    }>;

    return res.status(200).json({
      success: true,
      data: rows.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        description: row.description,
        liveUrl: row.live_url,
        githubUrl: row.github_url,
        imageUrl: row.image_url,
        imagePublicId: row.image_public_id,
        techStack: parseJsonArray<string>(row.tech_stack_json),
        featured: Boolean(row.featured),
        orderIndex: row.order_index,
        isPublished: Boolean(row.is_published),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      })),
    });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.post("/projects", (req, res, next) => {
  try {
    const parsed = projectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid project payload" });
    }

    const payload = parsed.data;

    const result = db
      .prepare(
        `
          INSERT INTO projects (
            title,
            slug,
            description,
            live_url,
            github_url,
            image_url,
            image_public_id,
            tech_stack_json,
            featured,
            order_index,
            is_published,
            updated_at
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `,
      )
      .run(
        payload.title,
        payload.slug,
        payload.description,
        payload.liveUrl ?? null,
        payload.githubUrl ?? null,
        payload.imageUrl ?? null,
        payload.imagePublicId ?? null,
        JSON.stringify(payload.techStack),
        toDbBool(payload.featured),
        payload.orderIndex,
        toDbBool(payload.isPublished),
      );

    return res.status(201).json({
      success: true,
      data: { id: Number(result.lastInsertRowid) },
    });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.put("/projects/:id", (req, res, next) => {
  try {
    const parsedId = idParamSchema.safeParse(req.params);
    const parsedBody = projectSchema.safeParse(req.body);

    if (!parsedId.success) {
      return res.status(400).json({ success: false, message: "Invalid project id" });
    }
    if (!parsedBody.success) {
      return res.status(400).json({ success: false, message: "Invalid project payload" });
    }

    const payload = parsedBody.data;

    const result = db
      .prepare(
        `
          UPDATE projects
          SET
            title = ?,
            slug = ?,
            description = ?,
            live_url = ?,
            github_url = ?,
            image_url = ?,
            image_public_id = ?,
            tech_stack_json = ?,
            featured = ?,
            order_index = ?,
            is_published = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `,
      )
      .run(
        payload.title,
        payload.slug,
        payload.description,
        payload.liveUrl ?? null,
        payload.githubUrl ?? null,
        payload.imageUrl ?? null,
        payload.imagePublicId ?? null,
        JSON.stringify(payload.techStack),
        toDbBool(payload.featured),
        payload.orderIndex,
        toDbBool(payload.isPublished),
        parsedId.data.id,
      );

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, message: "Project updated" });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.delete("/projects/:id", (req, res, next) => {
  try {
    const parsed = idParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid project id" });
    }

    const result = db
      .prepare("DELETE FROM projects WHERE id = ?")
      .run(parsed.data.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, message: "Project deleted" });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.get("/skill-groups", (_req, res, next) => {
  try {
    const groups = db
      .prepare(
        `
          SELECT id, name, order_index, is_published, created_at, updated_at
          FROM skill_groups
          ORDER BY order_index ASC, updated_at DESC
        `,
      )
      .all() as Array<{
      id: number;
      name: string;
      order_index: number;
      is_published: number;
      created_at: string;
      updated_at: string;
    }>;

    const skills = db
      .prepare(
        `
          SELECT id, skill_group_id, name, icon_key, order_index, is_published, created_at, updated_at
          FROM skills
          ORDER BY order_index ASC, updated_at DESC
        `,
      )
      .all() as Array<{
      id: number;
      skill_group_id: number;
      name: string;
      icon_key: string | null;
      order_index: number;
      is_published: number;
      created_at: string;
      updated_at: string;
    }>;

    const skillsByGroup = new Map<number, typeof skills>();
    for (const skill of skills) {
      const existing = skillsByGroup.get(skill.skill_group_id) ?? [];
      existing.push(skill);
      skillsByGroup.set(skill.skill_group_id, existing);
    }

    return res.status(200).json({
      success: true,
      data: groups.map((group) => ({
        id: group.id,
        name: group.name,
        orderIndex: group.order_index,
        isPublished: Boolean(group.is_published),
        createdAt: group.created_at,
        updatedAt: group.updated_at,
        skills: (skillsByGroup.get(group.id) ?? []).map((skill) => ({
          id: skill.id,
          skillGroupId: skill.skill_group_id,
          name: skill.name,
          iconKey: skill.icon_key,
          orderIndex: skill.order_index,
          isPublished: Boolean(skill.is_published),
          createdAt: skill.created_at,
          updatedAt: skill.updated_at,
        })),
      })),
    });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.post("/skill-groups", (req, res, next) => {
  try {
    const parsed = skillGroupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid skill group payload" });
    }

    const result = db
      .prepare(
        `
          INSERT INTO skill_groups (name, order_index, is_published, updated_at)
          VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        `,
      )
      .run(parsed.data.name, parsed.data.orderIndex, toDbBool(parsed.data.isPublished));

    return res.status(201).json({
      success: true,
      data: { id: Number(result.lastInsertRowid) },
    });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.put("/skill-groups/:id", (req, res, next) => {
  try {
    const parsedId = idParamSchema.safeParse(req.params);
    const parsedBody = skillGroupSchema.safeParse(req.body);

    if (!parsedId.success) {
      return res.status(400).json({ success: false, message: "Invalid skill group id" });
    }
    if (!parsedBody.success) {
      return res.status(400).json({ success: false, message: "Invalid skill group payload" });
    }

    const result = db
      .prepare(
        `
          UPDATE skill_groups
          SET name = ?, order_index = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `,
      )
      .run(
        parsedBody.data.name,
        parsedBody.data.orderIndex,
        toDbBool(parsedBody.data.isPublished),
        parsedId.data.id,
      );

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Skill group not found" });
    }

    return res.status(200).json({ success: true, message: "Skill group updated" });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.delete("/skill-groups/:id", (req, res, next) => {
  try {
    const parsed = idParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid skill group id" });
    }

    const result = db
      .prepare("DELETE FROM skill_groups WHERE id = ?")
      .run(parsed.data.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Skill group not found" });
    }

    return res.status(200).json({ success: true, message: "Skill group deleted" });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.post("/skills", (req, res, next) => {
  try {
    const parsed = skillSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid skill payload" });
    }

    const groupExists = db
      .prepare("SELECT 1 FROM skill_groups WHERE id = ? LIMIT 1")
      .get(parsed.data.skillGroupId);

    if (!groupExists) {
      return res.status(404).json({ success: false, message: "Skill group not found" });
    }

    const result = db
      .prepare(
        `
          INSERT INTO skills (skill_group_id, name, icon_key, order_index, is_published, updated_at)
          VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `,
      )
      .run(
        parsed.data.skillGroupId,
        parsed.data.name,
        parsed.data.iconKey ?? null,
        parsed.data.orderIndex,
        toDbBool(parsed.data.isPublished),
      );

    return res.status(201).json({
      success: true,
      data: { id: Number(result.lastInsertRowid) },
    });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.put("/skills/:id", (req, res, next) => {
  try {
    const parsedId = idParamSchema.safeParse(req.params);
    const parsedBody = skillSchema.safeParse(req.body);

    if (!parsedId.success) {
      return res.status(400).json({ success: false, message: "Invalid skill id" });
    }
    if (!parsedBody.success) {
      return res.status(400).json({ success: false, message: "Invalid skill payload" });
    }

    const groupExists = db
      .prepare("SELECT 1 FROM skill_groups WHERE id = ? LIMIT 1")
      .get(parsedBody.data.skillGroupId);

    if (!groupExists) {
      return res.status(404).json({ success: false, message: "Skill group not found" });
    }

    const result = db
      .prepare(
        `
          UPDATE skills
          SET
            skill_group_id = ?,
            name = ?,
            icon_key = ?,
            order_index = ?,
            is_published = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `,
      )
      .run(
        parsedBody.data.skillGroupId,
        parsedBody.data.name,
        parsedBody.data.iconKey ?? null,
        parsedBody.data.orderIndex,
        toDbBool(parsedBody.data.isPublished),
        parsedId.data.id,
      );

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    return res.status(200).json({ success: true, message: "Skill updated" });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.delete("/skills/:id", (req, res, next) => {
  try {
    const parsed = idParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid skill id" });
    }

    const result = db.prepare("DELETE FROM skills WHERE id = ?").run(parsed.data.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Skill not found" });
    }

    return res.status(200).json({ success: true, message: "Skill deleted" });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.get("/stories", (_req, res, next) => {
  try {
    const rows = db
      .prepare(
        `
          SELECT
            id,
            title,
            slug,
            date_text,
            location,
            status,
            card_image_url,
            card_image_public_id,
            order_index,
            is_published,
            created_at,
            updated_at
          FROM stories
          ORDER BY order_index ASC, updated_at DESC
        `,
      )
      .all() as Array<{
      id: number;
      title: string;
      slug: string;
      date_text: string | null;
      location: string | null;
      status: string | null;
      card_image_url: string | null;
      card_image_public_id: string | null;
      order_index: number;
      is_published: number;
      created_at: string;
      updated_at: string;
    }>;

    return res.status(200).json({
      success: true,
      data: rows.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        dateText: row.date_text,
        location: row.location,
        status: row.status,
        cardImageUrl: row.card_image_url,
        cardImagePublicId: row.card_image_public_id,
        orderIndex: row.order_index,
        isPublished: Boolean(row.is_published),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      })),
    });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.get("/stories/:id", (req, res, next) => {
  try {
    const parsed = idParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid story id" });
    }

    const row = db
      .prepare(
        `
          SELECT
            id,
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
            team_json,
            order_index,
            is_published,
            created_at,
            updated_at
          FROM stories
          WHERE id = ?
          LIMIT 1
        `,
      )
      .get(parsed.data.id) as
      | {
          id: number;
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
          order_index: number;
          is_published: number;
          created_at: string;
          updated_at: string;
        }
      | undefined;

    if (!row) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: row.id,
        title: row.title,
        slug: row.slug,
        dateText: row.date_text,
        location: row.location,
        status: row.status,
        cardImageUrl: row.card_image_url,
        cardImagePublicId: row.card_image_public_id,
        images: parseJsonArray<string>(row.images_json),
        imagePublicIds: parseJsonArray<string>(row.images_public_ids_json),
        contentMarkdown: paragraphsToMarkdown(parseJsonArray<string>(row.description_json)),
        project: parseJsonObject(row.project_json),
        outcomes: parseJsonArray<string>(row.outcomes_json),
        team: parseJsonObject(row.team_json),
        orderIndex: row.order_index,
        isPublished: Boolean(row.is_published),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
    });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.post("/stories", (req, res, next) => {
  try {
    const parsed = storySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid story payload" });
    }

    const payload = parsed.data;

    const result = db
      .prepare(
        `
          INSERT INTO stories (
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
            team_json,
            order_index,
            is_published,
            updated_at
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `,
      )
      .run(
        payload.title,
        payload.slug,
        payload.dateText ?? null,
        payload.location ?? null,
        payload.status ?? null,
        payload.cardImageUrl ?? null,
        payload.cardImagePublicId ?? null,
        JSON.stringify(payload.images),
        JSON.stringify(payload.imagePublicIds),
        JSON.stringify(markdownToParagraphs(payload.contentMarkdown)),
        payload.project ? JSON.stringify(payload.project) : null,
        JSON.stringify(payload.outcomes),
        payload.team ? JSON.stringify(payload.team) : null,
        payload.orderIndex,
        toDbBool(payload.isPublished),
      );

    return res.status(201).json({
      success: true,
      data: { id: Number(result.lastInsertRowid) },
    });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.put("/stories/:id", (req, res, next) => {
  try {
    const parsedId = idParamSchema.safeParse(req.params);
    const parsedBody = storySchema.safeParse(req.body);

    if (!parsedId.success) {
      return res.status(400).json({ success: false, message: "Invalid story id" });
    }
    if (!parsedBody.success) {
      return res.status(400).json({ success: false, message: "Invalid story payload" });
    }

    const payload = parsedBody.data;

    const result = db
      .prepare(
        `
          UPDATE stories
          SET
            title = ?,
            slug = ?,
            date_text = ?,
            location = ?,
            status = ?,
            card_image_url = ?,
            card_image_public_id = ?,
            images_json = ?,
            images_public_ids_json = ?,
            description_json = ?,
            project_json = ?,
            outcomes_json = ?,
            team_json = ?,
            order_index = ?,
            is_published = ?,
            updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `,
      )
      .run(
        payload.title,
        payload.slug,
        payload.dateText ?? null,
        payload.location ?? null,
        payload.status ?? null,
        payload.cardImageUrl ?? null,
        payload.cardImagePublicId ?? null,
        JSON.stringify(payload.images),
        JSON.stringify(payload.imagePublicIds),
        JSON.stringify(markdownToParagraphs(payload.contentMarkdown)),
        payload.project ? JSON.stringify(payload.project) : null,
        JSON.stringify(payload.outcomes),
        payload.team ? JSON.stringify(payload.team) : null,
        payload.orderIndex,
        toDbBool(payload.isPublished),
        parsedId.data.id,
      );

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    return res.status(200).json({ success: true, message: "Story updated" });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.delete("/stories/:id", (req, res, next) => {
  try {
    const parsed = idParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid story id" });
    }

    const result = db.prepare("DELETE FROM stories WHERE id = ?").run(parsed.data.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Story not found" });
    }

    return res.status(200).json({ success: true, message: "Story deleted" });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.get("/contact-messages", (_req, res, next) => {
  try {
    const rows = db
      .prepare(
        `
          SELECT id, name, email, message, status, created_at
          FROM contact_messages
          ORDER BY created_at DESC, id DESC
        `,
      )
      .all() as Array<{
      id: number;
      name: string;
      email: string;
      message: string;
      status: string;
      created_at: string;
    }>;

    return res.status(200).json({
      success: true,
      data: rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        message: row.message,
        status: row.status,
        createdAt: row.created_at,
      })),
    });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.put("/contact-messages/:id/status", (req, res, next) => {
  try {
    const parsedId = idParamSchema.safeParse(req.params);
    const parsedBody = contactMessageStatusSchema.safeParse(req.body);

    if (!parsedId.success) {
      return res.status(400).json({ success: false, message: "Invalid contact message id" });
    }

    if (!parsedBody.success) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid contact message status payload" });
    }

    const result = db
      .prepare(
        `
          UPDATE contact_messages
          SET status = ?
          WHERE id = ?
        `,
      )
      .run(parsedBody.data.status, parsedId.data.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Contact message not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: `Message marked as ${parsedBody.data.status}` });
  } catch (error) {
    return next(error);
  }
});

adminContentRouter.delete("/contact-messages/:id", (req, res, next) => {
  try {
    const parsed = idParamSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: "Invalid contact message id" });
    }

    const result = db
      .prepare("DELETE FROM contact_messages WHERE id = ?")
      .run(parsed.data.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: "Contact message not found" });
    }

    return res.status(200).json({ success: true, message: "Contact message deleted" });
  } catch (error) {
    return next(error);
  }
});

export default adminContentRouter;
