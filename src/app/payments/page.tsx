"use client";
import { useEffect, useState } from "react";
import { Card, DataTable, Badge } from '@remoola/ui';
import { getJson, delJson } from "../../lib/api";

type Pay = { id:string; amountCents:number; status:`Pending`|`Completed`|`Failed`; contract?:{ contractor?:{ name:string } } };

export default function PaymentsPage(){
  const [rows,setRows]=useState<Pay[]>([]);
  const load = async () => setRows(await getJson<Pay[]>(`/admin/payments`));
  useEffect(()=>{ load(); },[]);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
      <p className="mt-1 text-sm text-gray-600">Track batches and handle exceptions.</p>

      <section className="mt-4">
        <Card>
          <DataTable<Pay>
            rows={rows}
            rowKey={(r)=>r.id}
            columns={[
              { key: `id`, header: `ID`, render:(p)=>p.id.slice(0,8) },
              { key: `contractor`, header: `Contractor`, render:(p)=>p.contract?.contractor?.name || `—` },
              { key: `amount`, header: `Amount`, render:(p)=>`$${(p.amountCents/100).toFixed(2)}` },
              { key: `status`, header: `Status`, render:(p)=>(
                <Badge label={p.status} tone={p.status===`Completed`?`green`:p.status===`Pending`?`blue`:`red`} />
              )},
              { key: `actions`, header: `Actions`, render:(p)=>(
                <button className="rounded border px-2 py-1 text-xs" onClick={()=>delJson(`/admin/payments/${p.id}`).then(load)}>Delete</button>
              )},
            ]}
          />
        </Card>
      </section>
    </>
  );
}
