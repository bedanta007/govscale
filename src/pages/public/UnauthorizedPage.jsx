import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function UnauthorizedPage() {
  const { currentUser, loginAs, demoUsers } = useAuth();

  return (
    <div className="card-gov p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 bg-white border border-slate-200">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-slate-900 font-display">Access Restricted</h2>
      <p className="text-xs text-slate-500 leading-relaxed">
        Your current role (<strong className="text-slate-800">{currentUser?.role || 'Guest'}</strong>) does not have statutory authorization to access this procurement module.
      </p>

      {/* Switch role helper */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left space-y-2">
        <span className="text-[10px] uppercase font-bold text-slate-400 block">Switch to authorized demo role:</span>
        <div className="grid grid-cols-2 gap-1.5">
          {demoUsers.map(u => (
            <button
              key={u.role}
              onClick={() => loginAs(u.role)}
              className="px-2 py-1.5 rounded-md bg-white border border-slate-200 hover:border-blue-400 text-left text-xs font-semibold text-slate-700 truncate"
            >
              {u.role}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <Link 
          to="/dashboard" 
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-colors"
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Return to My Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
