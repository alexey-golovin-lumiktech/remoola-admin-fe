"use client";
import { useEffect, useState } from "react";
import { Card, DataTable, Badge } from '@remoola/ui';
import { getJson, patchJson, delJson } from "../../lib/api";

type Contract = { id:string; rateCents:number; rateUnit:`hour`|`fixed`; status:string; client?:{email:string}; contractor?:{name:string} };

export default function ContractsPage(){
  const [rows,setRows]=useState<Contract[]>([]);
  const load = async () => setRows(await getJson<Contract[]>(`/admin/contracts`));
  useEffect(()=>{ load(); },[]);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Contracts</h1>
      <p className="mt-1 text-sm text-gray-600">Audit and manage all contracts.</p>

      <section className="mt-4">
        <Card>
          <DataTable<Contract>
            rows={rows}
            rowKey={(r)=>r.id}
            columns={[
              { key: `contractor`, header: `Contractor`, render:(r)=>r.contractor?.name || `—` },
              { key: `client`,     header: `Client`,     render:(r)=>r.client?.email || `—` },
              { key: `rate`,       header: `Rate`,       render:(r)=>`$${(r.rateCents/100).toFixed(2)}/${r.rateUnit===`hour`?`hr`:`fixed`}` },
              { key: `status`,     header: `Status`,     render:(r)=> <Badge label={r.status} tone={r.status===`active`?`green`:r.status===`signature`?`blue`:r.status===`archived`?`gray`:`amber`} /> },
              { key: `actions`,    header: `Actions`,    render:(r)=>(
                <div className="flex items-center gap-2">
                  <select className="rounded border px-2 py-1 text-xs" defaultValue={r.status}
                          onChange={(e)=>patchJson(`/admin/contracts/${r.id}`, { status: e.target.value }).then(load)}>
                    <option value="draft">draft</option>
                    <option value="signature">signature</option>
                    <option value="active">active</option>
                    <option value="archived">archived</option>
                  </select>
                  <button className="rounded border px-2 py-1 text-xs" onClick={()=>delJson(`/admin/contracts/${r.id}`).then(load)}>Delete</button>
                </div>
              )},
            ]}
          />
        </Card>
      </section>
    </>
  );
}
