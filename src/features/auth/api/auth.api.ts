import { apiClient } from "@/lib/api/api-client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { SignUpFormData } from "../types/auth.types";

class AuthApi {
  async signup(userData: SignUpFormData) {
    const { data } = await apiClient.post(API_ENDPOINTS.auth.signup, userData);
    return data;
  }
}

export const authApi = new AuthApi();
