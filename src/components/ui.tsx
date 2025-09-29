/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React from "react";
import { cn } from "../lib/utils";

/* ---------- Card ---------- */
export function Card({ title, actions, children, className }:{
  title?: React.ReactNode; actions?: React.ReactNode; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn(`admin-card`, className)}>
      {(title || actions) && (
        <div className="card-head flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-gray-900">{title}</div>
          {actions}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
}


/* ---------- Badge ---------- */
export function Badge({ label, tone = `gray` }: { label: string; tone?: `green`|`blue`|`gray`|`red`|`amber` }) {
  const palette: Record<string, string> = {
    green: `bg-emerald-100 text-emerald-700 ring-emerald-600/20`,
    blue: `bg-blue-100 text-blue-700 ring-blue-600/20`,
    gray: `bg-gray-100 text-gray-700 ring-gray-600/20`,
    red: `bg-rose-100 text-rose-700 ring-rose-600/20`,
    amber: `bg-amber-100 text-amber-800 ring-amber-700/20`,
  };
  return <span className={cn(`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset`, palette[tone])}>{label}</span>;
}

/* ---------- Progress ---------- */
export const Progress = ({ value }: { value: number }) => (
  <div className="h-2 w-full rounded-full bg-gray-100">
    <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${value}%` }} />
  </div>
);

/* ---------- Sidebar link ---------- */
export function SidebarLink({ href, active, children }:{
  href: string; active?: boolean; children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition`,
        active ? `bg-white/10 text-white` : `text-blue-100 hover:bg-white/10 hover:text-white`
      )}
    >
      <span className="grid h-5 w-5 place-items-center rounded-md bg-white/20">•</span>
      {children}
    </Link>
  );
}

/* ---------- Table ---------- */
export function DataTable<T>({
  columns, rows, rowKey,
}: {
  columns: { key: keyof T | string; header: string; render?: (row: T) => React.ReactNode }[];
  rows: T[]; rowKey: (row: T) => string;
}) {
  return (
    <div className="table-wrap">
      <table className="table text-left text-sm">
        <thead>
          <tr className="text-gray-500">
            {columns.map(c => <th key={String(c.key)} className="px-3 py-2">{c.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={rowKey(r)} className="border-t border-gray-100">
              {columns.map(c => (
                <td key={String(c.key)} className="px-3 py-3">
                  {c.render ? c.render(r) : (r as any)[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
