import React, { useState } from 'react';
import { 
  Users, Shield, ShieldCheck, UserPlus, Search, 
  CheckCircle2, AlertCircle, Building2, Mail, Lock 
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export default function AdminUsersPage() {
  const { demoUsers, currentUser } = useAuth();
  const [usersList, setUsersList] = useState(demoUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Evaluator',
    org: 'Government Department',
    title: 'Senior Officer'
  });

  const filteredUsers = usersList.filter(u => {
    const matchSearch = !searchTerm ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.org.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'ALL' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    const created = {
      id: `usr_${Date.now().toString().slice(-4)}`,
      avatar: newUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      color: newUser.role === 'Startup' ? 'bg-emerald-600' : 'bg-blue-600',
      verificationStatus: 'Verified',
      ...newUser
    };
    setUsersList(prev => [...prev, created]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: 'Evaluator', org: 'Government Department', title: 'Senior Officer' });
  };

  return (
    <div className="space-y-5 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">
              System Administration
            </span>
            <span className="text-[10px] text-slate-500 font-mono">RBAC Authorization</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display">User Directory &amp; Role Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage administrative privileges, departmental procurement officers, technical evaluators, and registered startups.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <UserPlus className="w-4 h-4" /> Provision New Officer
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Total Accounts</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900 font-display">{usersList.length}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">Active</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Procurement Officers</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-blue-600 font-display">
              {usersList.filter(u => u.role === 'Procurement Officer').length}
            </span>
            <span className="text-[11px] text-slate-400">IAS / DPC</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Technical Evaluators</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-violet-600 font-display">
              {usersList.filter(u => u.role === 'Evaluator').length}
            </span>
            <span className="text-[11px] text-slate-400">Auditors</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <p className="text-xs text-slate-500 font-medium">Verified Startups</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-600 font-display">
              {usersList.filter(u => u.role === 'Startup').length}
            </span>
            <span className="text-[11px] text-slate-400">DPIIT</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-slate-200 p-3 rounded-xl">
        <div className="flex items-center gap-1.5 flex-wrap">
          {['ALL', 'Startup', 'Procurement Officer', 'Evaluator', 'Admin'].map(r => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterRole === r ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {r === 'ALL' ? 'All Roles' : r}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, email, org..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-800"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100">
          {filteredUsers.map(user => (
            <div key={user.id} className="p-4 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-sm ${user.color || 'bg-blue-600'}`}>
                  {user.avatar || 'U'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    {user.id === currentUser?.id && (
                      <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded font-semibold">You</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">{user.email} • {user.title || user.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{user.org}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs shrink-0 self-end md:self-center">
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded ${
                  user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                  user.role === 'Procurement Officer' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'Evaluator' ? 'bg-amber-100 text-amber-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {user.role}
                </span>

                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-900 font-display">Provision System User</h2>
            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Anita Sharma"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. anita.sharma@maharashtra.gov.in"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800 bg-white"
                >
                  <option value="Procurement Officer">Procurement Officer (DPC)</option>
                  <option value="Evaluator">Technical Evaluator</option>
                  <option value="Startup">DPIIT Startup</option>
                  <option value="Admin">State Super Administrator</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department / Organization</label>
                <input
                  type="text"
                  required
                  value={newUser.org}
                  onChange={(e) => setNewUser({ ...newUser, org: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg text-slate-800"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
