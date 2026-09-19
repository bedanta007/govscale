import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Key, Mail, Sparkles, Building2, User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAs, demoUsers } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const res = login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.error);
    }
  };

  const handleQuickLogin = (role) => {
    loginAs(role);
    navigate(from, { replace: true });
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="card-gov p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-5">
        
        {/* Heading */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
            G
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display pt-2">Sign in to GovScale</h1>
          <p className="text-xs text-slate-500">Smart Public Procurement Portal • Government of Maharashtra</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Official Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="email" 
                placeholder="e.g. vikram@healthai.tech"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white text-xs"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 text-[11px] font-medium">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white text-xs"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center space-x-1.5 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </form>

        {/* 1-Click Demo Login Box */}
        <div className="pt-2 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Instant Demo 1-Click Logins</span>
            <span className="text-[10px] text-slate-400">SIH 2026</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickLogin('Startup')}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-left transition-all group"
            >
              <span className="font-bold text-slate-900 block group-hover:text-emerald-700">🚀 Startup</span>
              <span className="text-[10px] text-slate-500 block truncate">HealthAI (DPIIT)</span>
            </button>

            <button
              onClick={() => handleQuickLogin('Procurement Officer')}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-left transition-all group"
            >
              <span className="font-bold text-slate-900 block group-hover:text-blue-700">🏛️ Dept Officer</span>
              <span className="text-[10px] text-slate-500 block truncate">Public Health IAS</span>
            </button>

            <button
              onClick={() => handleQuickLogin('Evaluator')}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/40 text-left transition-all group"
            >
              <span className="font-bold text-slate-900 block group-hover:text-purple-700">⚖️ Evaluator</span>
              <span className="text-[10px] text-slate-500 block truncate">IIT Bombay Panel</span>
            </button>

            <button
              onClick={() => handleQuickLogin('Admin')}
              className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all group"
            >
              <span className="font-bold text-slate-900 block group-hover:text-amber-700">🛡️ State Admin</span>
              <span className="text-[10px] text-slate-500 block truncate">MSInS Mantralaya</span>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 pt-1">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
            Register your Startup / Department
          </Link>
        </div>

      </div>
    </div>
  );
}
