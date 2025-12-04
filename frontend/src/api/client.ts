export async function api(path: string, options: RequestInit = {}) {
  const res = await fetch(`/api${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API ${res.status} ${txt}`);
  }
  return res.json();
}
