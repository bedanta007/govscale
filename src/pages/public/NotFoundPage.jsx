import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LayoutDashboard, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="card-gov p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 bg-white border border-slate-200">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold font-mono">
        404
      </div>
      <h2 className="text-xl font-bold text-slate-900 font-display">Page Not Found</h2>
      <p className="text-xs text-slate-500 leading-relaxed">
        The requested procurement page or document could not be located. It may have been moved or archived.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
        <Link 
          to="/" 
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <Link 
          to="/dashboard" 
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
