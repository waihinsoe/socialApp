interface Config {
  apiBaseUrl: string;
}

export const config: Config = {
  apiBaseUrl: import.meta.env.API_BASE_URL || "",
};
