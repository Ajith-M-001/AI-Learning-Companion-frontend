// src/providers/query-provider.tsx
"use client";
import type { ReactNode } from "react";
import type { DehydratedState } from "@tanstack/react-query";

import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/lib/api/query-client";

interface Props {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

export function QueryProvider({ children, dehydratedState }: Props) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
        <ReactQueryDevtools />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
