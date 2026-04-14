import { db } from "./client.js";
import { migrations } from "./migrations.js";

db.exec(`
  CREATE TABLE IF NOT EXISTS migrations (
    id TEXT PRIMARY KEY,
    executed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const hasMigrationRunStatement = db.prepare(
  "SELECT 1 FROM migrations WHERE id = ? LIMIT 1",
);
const recordMigrationStatement = db.prepare(
  "INSERT INTO migrations (id) VALUES (?)",
);

const run = () => {
  for (const migration of migrations) {
    const alreadyExecuted = hasMigrationRunStatement.get(migration.id);
    if (alreadyExecuted) {
      continue;
    }

    const transaction = db.transaction(() => {
      db.exec(migration.sql);
      recordMigrationStatement.run(migration.id);
    });

    transaction();
    console.log(`Applied migration: ${migration.id}`);
  }

  console.log("Migrations complete");
};

run();
