import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ customCrumbs }) {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const pathnames = location.pathname.split('/').filter(x => x);

  const formatSegment = (str) => {
    if (str.startsWith('chg_') || str.startsWith('bid_') || str.startsWith('cnt_') || str.startsWith('plt_')) {
      return str.toUpperCase();
    }
    return str
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  const crumbs = customCrumbs || pathnames.map((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
    return {
      label: formatSegment(value),
      to: index === pathnames.length - 1 ? null : to
    };
  });

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-slate-500 py-2.5 px-4 sm:px-8 bg-slate-50/80 border-b border-slate-200 overflow-x-auto whitespace-nowrap">
      <Link to="/" className="hover:text-blue-600 flex items-center gap-1 transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {crumbs.map((crumb, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {crumb.to ? (
            <Link to={crumb.to} className="hover:text-blue-600 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="font-semibold text-slate-800">{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
