import { db } from "./client.js";

export const ensureDbConnection = () => {
  db.prepare("SELECT 1 AS ok").get();
};

export { db };
