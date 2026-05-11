import { getAnonymousKey } from "@apps-in-toss/web-framework";
import { apiPost } from "../lib/apiClient";
import type { AuthResponse } from "../types/api";

export async function requestAnonymousAuth(): Promise<AuthResponse> {
  const anonymousKey = await getAnonymousKey();
  return apiPost<AuthResponse, { anonymousKey: string }>(
    "/api/v1/auth/anonymous",
    { anonymousKey }
  );
}
