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

  // Parse JSON if possible
  let data: any = {};
  try {
    data = await res.json();
  } catch (_) {
    // ignore JSON parse errors
  }

  if (!res.ok) {
    let errorMsg = data?.error || `Request failed with status ${res.status} popa`;

    const words = errorMsg.trim().split(" ");
    if (words.length > 1) {
      words.pop();
      errorMsg = words.join(" ");
    } else {
      errorMsg = "";
    }
    throw new Error(errorMsg);
  }

  return data;
}
