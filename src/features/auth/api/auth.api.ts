//src\features\auth\api\auth.api.ts
import { apiClient } from "@/lib/api/api-client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { SignInFormData, SignUpFormData } from "../types/auth.types";

class AuthApi {
  async signUp(userData: SignUpFormData) {
    const { data } = await apiClient.post(API_ENDPOINTS.auth.signup, userData);
    return data;
  }

  async signIp(formData: SignInFormData) {
    const { data } = await apiClient.post(API_ENDPOINTS.auth.login, formData);
    return data;
  }
}

export const authApi = new AuthApi();
