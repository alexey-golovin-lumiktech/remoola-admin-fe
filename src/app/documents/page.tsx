"use client";
import { useEffect, useState } from "react";
import { Card, DataTable } from '@remoola/ui';
import { getJson, delJson } from "../../lib/api";

type Doc = { id:string; name:string; type:string; sizeBytes?:number; updatedAt?:string; fileUrl?:string };

export default function DocumentsPage(){
  const [rows,setRows]=useState<Doc[]>([]);
  const load = async () => setRows(await getJson<Doc[]>(`/admin/documents`));
  useEffect(()=>{ load(); },[]);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
      <p className="mt-1 text-sm text-gray-600">Central view across all uploaded assets.</p>

      <section className="mt-4">
        <Card>
          <DataTable<Doc>
            rows={rows}
            rowKey={(r)=>r.id}
            columns={[
              { key: `name`, header: `Name`, render:(d)=>(<a className="hover:underline" href={d.fileUrl||`#`}>{d.name}</a>) },
              { key: `type`, header: `Type`, render:(d)=>d.type?.toUpperCase() || `—` },
              { key: `size`, header: `Size`, render:(d)=>d.sizeBytes ? `${(d.sizeBytes/1024).toFixed(0)} KB` : `—` },
              { key: `updated`, header: `Updated`, render:(d)=>d.updatedAt ? new Date(d.updatedAt).toLocaleString() : `—` },
              { key: `actions`, header: `Actions`, render:(d)=>(
                <button className="rounded border px-2 py-1 text-xs" onClick={()=>delJson(`/admin/documents/${d.id}`).then(load)}>Delete</button>
              )},
            ]}
          />
        </Card>
      </section>
    </>
  );
}
