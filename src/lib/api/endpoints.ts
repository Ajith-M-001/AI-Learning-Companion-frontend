// src/lib/api/endpoints.ts
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    refresh: "/auth/refresh",
    profile: "/auth/profile",
    logout: "/auth/logout",
    changePassword: "/auth/change-password",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyToken: "/auth/verify-token",
  },
  dashboard: {
    overview: "/dashboard",
    profile: "/dashboard/profile",
    analytics: "/dashboard/analytics",
    settings: "/dashboard/settings",
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
