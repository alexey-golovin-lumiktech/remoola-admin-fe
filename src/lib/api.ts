export const API = process.env.NEXT_PUBLIC_API_BASE_URL!;

async function doFetch(path: string, init?: RequestInit) {
  return fetch(API + path, {
    credentials: `include`,
    ...init,
    headers: { "Content-Type": `application/json`, ...(init?.headers || {}) }
  });
}

export async function raw(path: string, init?: RequestInit) {
  let res = await doFetch(path, init);
  if (res.status === 401) {
    const rr = await doFetch(`/auth/refresh`, { method: `POST` });
    if (rr.ok) res = await doFetch(path, init);
  }
  if (!res.ok) throw new Error(await res.text());
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
export const getJson = <T,>(p: string) => raw(p) as Promise<T>;
export const postJson = <T,>(p: string, body: unknown) => raw(p, { method: `POST`, body: JSON.stringify(body) }) as Promise<T>;
export const patchJson = <T,>(p: string, body: unknown) => raw(p, { method: `PATCH`, body: JSON.stringify(body) }) as Promise<T>;
export const putJson = <T,>(p: string, body: unknown) => raw(p, { method: `PUT`, body: JSON.stringify(body) }) as Promise<T>;
export const delJson = <T,>(p: string) => raw(p, { method: `DELETE` }) as Promise<T>;
