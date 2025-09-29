import { cookies as nextCookies } from 'next/headers';

export async function getMeSSR() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const cookieStore = await nextCookies();
  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join(`; `);

  const res = await fetch(`${base}/auth/me`, {
    headers: { cookie: cookieHeader },
    cache: `no-store`,
  });

  if (!res.ok) return null;
  return (await res.json()) as {
    id: string;
    email: string;
    role: `client` | `admin` | `superadmin`;
  };
}
