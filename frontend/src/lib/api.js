const API_BASE_URL = "http://127.0.0.1:8000";

export function createApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

export async function parseJsonResponse(response) {
  const text = await response.text();

  if (!text) return {};

  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export function extractErrorMessage(payload, fallback) {
  const detail = payload?.detail ?? payload?.message ?? payload;

  if (!detail) return fallback;
  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    const firstMessage = detail.find(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof (item.msg ?? item.message) === "string"
    );

    if (firstMessage) {
      return firstMessage.msg ?? firstMessage.message;
    }

    return fallback;
  }

  if (typeof detail === "object") {
    if (typeof detail.msg === "string") return detail.msg;
    if (typeof detail.message === "string") return detail.message;
  }

  return fallback;
}

export function createAuthHeaders(token, extraHeaders = {}) {
  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

