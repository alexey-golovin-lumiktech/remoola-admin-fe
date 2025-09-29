"use client";
import { useEffect, useState } from "react";
import { Card, DataTable } from '@remoola/ui';
import { getJson, patchJson } from "../../lib/api";

type User = { id: string; email: string; name: string; role: `client`|`admin`|`superadmin` };

export default function UsersPage() {
  const [rows, setRows] = useState<User[]>([]);
  const [q, setQ] = useState(``);
  async function load() {
    const data = await getJson<User[]>(`/admin/users${q ? `?q=${encodeURIComponent(q)}` : ``}`);
    setRows(data);
  }
  useEffect(() => { load(); }, [q]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <p className="mt-1 text-sm text-gray-600">Promote admins, manage access.</p>

      <section className="mt-4">
        <Card actions={<input className="w-64 rounded-lg border px-3 py-2 text-sm" placeholder="Search email or name" value={q} onChange={e=>setQ(e.target.value)} />}>
          <DataTable<User>
            rows={rows}
            rowKey={(r)=>r.id}
            columns={[
              { key: `email`, header: `Email` },
              { key: `name`,  header: `Name` },
              { key: `role`,  header: `Role`, render: (u) => (
                <select className="rounded border px-2 py-1 text-sm" value={u.role}
                        onChange={(e)=>patchJson(`/admin/users/${u.id}/role`, { role: e.target.value }).then(load)}>
                  <option value="client">client</option>
                  <option value="admin">admin</option>
                  <option value="superadmin">superadmin</option>
                </select>
              )},
            ]}
          />
        </Card>
      </section>
    </>
  );
}
