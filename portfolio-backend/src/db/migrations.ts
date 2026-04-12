export const migrations: Array<{ id: string; sql: string }> = [
  {
    id: "001_init_schema",
    sql: `
      CREATE TABLE IF NOT EXISTS migrations (
        id TEXT PRIMARY KEY,
        executed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS site_settings (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        full_name TEXT NOT NULL,
        title TEXT NOT NULL,
        bio TEXT NOT NULL,
        location TEXT,
        email TEXT,
        github_url TEXT,
        linkedin_url TEXT,
        twitter_url TEXT,
        instagram_url TEXT,
        resume_url TEXT,
        profile_image_url TEXT,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        live_url TEXT,
        github_url TEXT,
        image_url TEXT,
        tech_stack_json TEXT NOT NULL DEFAULT '[]',
        featured INTEGER NOT NULL DEFAULT 0,
        order_index INTEGER NOT NULL DEFAULT 0,
        is_published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_projects_order
      ON projects (order_index ASC, id ASC);

      CREATE TABLE IF NOT EXISTS skill_groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        order_index INTEGER NOT NULL DEFAULT 0,
        is_published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS skills (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        skill_group_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        icon_key TEXT,
        order_index INTEGER NOT NULL DEFAULT 0,
        is_published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (skill_group_id) REFERENCES skill_groups(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_skills_group_order
      ON skills (skill_group_id ASC, order_index ASC, id ASC);

      CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        date_text TEXT,
        location TEXT,
        status TEXT,
        card_image_url TEXT,
        images_json TEXT NOT NULL DEFAULT '[]',
        description_json TEXT NOT NULL DEFAULT '[]',
        project_json TEXT,
        outcomes_json TEXT NOT NULL DEFAULT '[]',
        team_json TEXT,
        order_index INTEGER NOT NULL DEFAULT 0,
        is_published INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_stories_order
      ON stories (order_index ASC, id ASC);
    `,
  },
  {
    id: "002_add_cloudinary_public_ids",
    sql: `
      ALTER TABLE site_settings
      ADD COLUMN profile_image_public_id TEXT;

      ALTER TABLE projects
      ADD COLUMN image_public_id TEXT;

      ALTER TABLE stories
      ADD COLUMN card_image_public_id TEXT;
    `,
  },
  {
    id: "003_add_story_gallery_public_ids",
    sql: `
      ALTER TABLE stories
      ADD COLUMN images_public_ids_json TEXT NOT NULL DEFAULT '[]';
    `,
  },
  {
    id: "004_add_contact_messages",
    sql: `
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at
      ON contact_messages (created_at DESC, id DESC);

      CREATE INDEX IF NOT EXISTS idx_contact_messages_status
      ON contact_messages (status);
    `,
  },
];
