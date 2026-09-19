import React, { useState } from 'react';
import { 
  User, Building2, ShieldCheck, Mail, Phone, MapPin, 
  Key, Save, CheckCircle2, Award, Briefcase, RefreshCw 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { currentUser, updateProfile, demoUsers, loginAs, notify } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    title: currentUser?.title || '',
    org: currentUser?.org || '',
    phone: currentUser?.phone || '+91 98230 11982',
    dpiitId: currentUser?.dpiitId || ''
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-5 animate-fade-in pb-12 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md ${currentUser?.color || 'bg-blue-600'}`}>
            {currentUser?.avatar || 'GS'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 font-display">{currentUser?.name}</h1>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                {currentUser?.role}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{currentUser?.title} • {currentUser?.org}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold">State Verified Persona</span>
        </div>
      </div>

      {/* Role Switcher Sandbox Toolbar */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-300">Hackathon Reviewer Demo Bar</p>
          <p className="text-[11px] text-slate-300 mt-0.5">Quickly toggle your authenticated role to preview different workflow permissions.</p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {demoUsers.map(u => (
            <button
              key={u.id}
              onClick={() => {
                loginAs(u.role);
                setFormData({
                  name: u.name,
                  email: u.email,
                  title: u.title,
                  org: u.org,
                  phone: '+91 98230 11982',
                  dpiitId: u.dpiitId || ''
                });
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                currentUser?.role === u.role
                  ? 'bg-blue-500 text-white shadow'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {u.role}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 font-display mb-4">Account &amp; Official Designation Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Designation / Title</label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department / Organization</label>
              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.org}
                  onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official Mobile / Contact</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
                />
              </div>
            </div>

            {currentUser?.role === 'Startup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">DPIIT Recognition Number</label>
                <input
                  type="text"
                  value={formData.dpiitId}
                  onChange={(e) => setFormData({ ...formData, dpiitId: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800 font-mono"
                />
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {isSaved ? (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Changes saved to local session
              </span>
            ) : <div />}

            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Save className="w-3.5 h-3.5" /> Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
