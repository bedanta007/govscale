import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Simple Banner */}
      <header className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              G
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 font-display">GovScale</span>
              <span className="text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.2 rounded ml-2">
                SIH26136
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-3 text-xs font-semibold">
            <Link to="/" className="text-slate-600 hover:text-slate-900">
              Home
            </Link>
            <Link to="/tenders" className="text-slate-600 hover:text-slate-900">
              Tenders
            </Link>
            <Link to="/login" className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-400 text-xs py-5 px-6 border-t border-slate-200 text-center">
        Government of Maharashtra • Smart Public Procurement for Startup Innovation • SIH26136
      </footer>
    </div>
  );
}
