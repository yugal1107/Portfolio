export type AppEnv = {
  nodeEnv: "development" | "test" | "production";
  port: number;
  dbPath: string;
  frontendOrigin: string;
  adminUsername: string;
  adminPasswordHash: string;
  jwtSecret: string;
  authCookieName: string;
  cloudinaryCloudName: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
};
