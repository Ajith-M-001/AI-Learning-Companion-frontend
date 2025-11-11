//src\features\auth\hooks\auth.hooks.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { toast } from "sonner";

const AUTH_QUERY_KEYS = {
  ALL: ["auth"] as const,
  GET_PROFILE: () => [...AUTH_QUERY_KEYS.ALL, "profile"] as const,
};

export const useSignUp = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.ALL });
      toast.success(response.message || "Signed up successfully");
    },
    onError: (error) => {
      console.log(error);
      // toast.error(error.response?.data.detail || "Sign up failed");
    },
    ...options,
  });
};

export const useSignIn = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.signIp,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.ALL });
      toast.success(response.message || "Signed in successfully");
    },
    onError: (error) => {
      console.log(error);
      // toast.error(error.response?.data.detail || "Sign in failed");
    },
    ...options,
  });
};
