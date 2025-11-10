// src/lib/api/query-client.ts
import type { DefaultOptions } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    gcTime: 1000 * 60 * 10, // garbage collect cache after 10 min
    networkMode: "online",
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status && status >= 400 && status < 500) return false; // no retry on client errors
        if (failureCount >= 2) return false; // max 2 retries
      }
      return true; // retry by default
    },
  },
  mutations: {
    networkMode: "online",
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status && status >= 400 && status < 500) return false; // no retry on client errors
        if (failureCount >= 1) return false; // max 1 retry for mutations
      }
      return true;
    },
  },
};

let browserQueryClient: QueryClient | undefined = undefined;

function createQueryClient() {
  return new QueryClient({
    defaultOptions: queryConfig,
  });
}

export function getQueryClient() {
  if (typeof window === "undefined") {
    // New QueryClient for SSR/SSG on server
    return createQueryClient();
  }
  // Singleton on client
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  return browserQueryClient;
}
