import React from 'react';

export default function StatusBadge({ status, size = 'sm' }) {
  if (!status) return null;

  const normalized = status.toLowerCase();

  let style = 'bg-slate-100 text-slate-700 border-slate-200';

  if (normalized.includes('awarded') || normalized.includes('verified') || normalized.includes('approved') || normalized.includes('active') || normalized.includes('shortlisted')) {
    style = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (normalized.includes('pilot') || normalized.includes('running') || normalized.includes('review') || normalized.includes('pending')) {
    style = 'bg-amber-50 text-amber-800 border-amber-200';
  } else if (normalized.includes('rfp') || normalized.includes('open') || normalized.includes('submitted') || normalized.includes('match')) {
    style = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (normalized.includes('draft')) {
    style = 'bg-slate-100 text-slate-600 border-slate-300';
  } else if (normalized.includes('rejected') || normalized.includes('failed')) {
    style = 'bg-red-50 text-red-700 border-red-200';
  }

  const sizeClass = size === 'xs' 
    ? 'text-[10px] px-2 py-0.5' 
    : size === 'md' 
    ? 'text-xs px-3 py-1' 
    : 'text-[11px] px-2.5 py-0.5';

  return (
    <span className={`inline-flex items-center gap-1 font-semibold rounded-full border ${style} ${sizeClass} tracking-wide`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      <span>{status}</span>
    </span>
  );
}
