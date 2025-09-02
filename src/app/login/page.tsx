// admin-web/src/app/login/page.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage(){
  const [email,setEmail] = useState("admin@example.com");
  const [password,setPassword] = useState("password");
  const [err,setErr] = useState<string>();
  const router = useRouter();
  const next = useSearchParams().get("next") || "/";

  async function submit(e: React.FormEvent){
    e.preventDefault(); setErr(undefined);

    // 1) Login (sets cookies)
    const api = process.env.NEXT_PUBLIC_API_BASE_URL!;
    const r = await fetch(`${api}/auth/login`, {
      method:'POST',
      credentials:'include',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!r.ok) { setErr(`Login failed (${r.status})`); return; }

    // 2) Immediately verify cookies are present on a new request
    const me = await fetch(`${api}/auth/me`, { credentials:'include', cache:'no-store' });
    if (!me.ok) {
      const text = await me.text().catch(()=> '');
      setErr([
        'Logged in but cookies not available on next request.',
        'Check that: API CORS includes this origin, SameSite/secure/domain attrs are correct,',
        'and the hostnames match exactly (localhost vs 127.0.0.1).',
        `Status: ${me.status} ${text}`].join(' ')
      );
      return;
    }

    // 3) Hard navigate so the next request includes cookies for sure
    window.location.assign(next);
  }

  return (
    <div className="mx-auto max-w-md p-8">
      <h1 className="mb-4 text-2xl font-semibold">Admin sign in</h1>
      <form className="space-y-3" onSubmit={submit}>
        <input className="w-full rounded-md border px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <input className="w-full rounded-md border px-3 py-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
        {err && <p className="text-sm text-rose-600 whitespace-pre-wrap">{err}</p>}
        <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white">Login</button>
      </form>
    </div>
  );
}
