interface Config {
  apiBaseUrl: string;
  jwtSecret: string;
}

export const config: Config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "",
  jwtSecret: import.meta.env.VITE_JWT_SECRET || "",
};
