// src/lib/constants.ts

// Environment literal object + type
export const Environment = {
  Local: "local",
  Staging: "staging",
  Production: "production",
} as const;

export type EnvironmentType = (typeof Environment)[keyof typeof Environment];

// Read current environment, default to Local
const CURRENT_ENV =
  (process.env.NEXT_ENV as EnvironmentType) ?? Environment.Local;
export const ENV = CURRENT_ENV;

// App metadata
export const APP_NAME = process.env.APP_NAME || "AI Learn Companion";
export const APP_DESCRIPTION =
  process.env.APP_DESCRIPTION ||
  "Frontend for AI Learn Companion built with Next.js + Tailwind";

// API URLs per environment
const API_BASE_URLS: Record<EnvironmentType, string> = {
  [Environment.Local]:
    process.env.NEXT_PUBLIC_API_URL_LOCAL || "http://localhost:5000",
  [Environment.Staging]:
    process.env.NEXT_PUBLIC_API_URL_STAGING ||
    "https://staging.api.ailearncompanion.com",
  [Environment.Production]:
    process.env.NEXT_PUBLIC_API_URL_PRODUCTION ||
    "https://api.ailearncompanion.com",
};

// Function to get correct URL
function getApiUrl(env: EnvironmentType): string {
  const url = API_BASE_URLS[env];
  if (!url) {
    throw new Error(`API base URL not defined for environment: ${env}`);
  }
  return url;
}

// Export the base url based on the current environment
export const API_BASE_URL = getApiUrl(ENV);
