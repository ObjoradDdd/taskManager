export async function api(path: string, options: RequestInit = {}) {
  // attach access token from localStorage to all requests except login/register
  const accessToken = localStorage.getItem("accessToken");
  const isAuthExcluded = path.startsWith("/auth/login") || path.startsWith("/auth/register");

  const defaultHeaders: Record<string, string> = {};
  if (!(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  if (accessToken && !isAuthExcluded) {
    defaultHeaders["Authorization"] = `Bearer ${accessToken}`;
  }

  const fullUrl = `/api/v1${path}`;
  const requestInit = {
    headers: {
      ...defaultHeaders,
      ...(options.headers as Record<string, string> | undefined),
    },
    ...options,
  };

  const res = await fetch(fullUrl, requestInit);

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API ${res.status} ${txt}`);
  }

  // Try parse JSON, if it fails — return empty object
  try {
    return await res.json();
  } catch (_) {
    return {};
  }
}
