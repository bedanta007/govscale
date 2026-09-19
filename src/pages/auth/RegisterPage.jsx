import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Building2, User, Mail, Key, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState('Startup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [dpiitId, setDpiitId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      name,
      email,
      role,
      org,
      dpiitId: role === 'Startup' ? dpiitId : undefined,
      password
    });
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="card-gov p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-5">
        
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl mx-auto shadow-sm">
            G
          </div>
          <h1 className="text-xl font-bold text-slate-900 font-display pt-2">Create GovScale Account</h1>
          <p className="text-xs text-slate-500">Register under Maharashtra State Innovation Procurement Policy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          {/* Role selector */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1.5">Select Role Persona</label>
            <div className="grid grid-cols-2 gap-2">
              {['Startup', 'Procurement Officer', 'Evaluator', 'Admin'].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`p-2.5 rounded-lg border text-left font-semibold text-xs transition-all ${
                    role === r 
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Vikram Malhotra"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Official Email</label>
              <input 
                type="email" 
                placeholder="e.g. vikram@startup.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Organization / Department Name</label>
            <input 
              type="text" 
              placeholder={role === 'Startup' ? "e.g. HealthAI Technologies Pvt Ltd" : "e.g. Public Health Department, Govt of Maharashtra"}
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white text-xs"
            />
          </div>

          {role === 'Startup' && (
            <div>
              <label className="font-semibold text-slate-700 block mb-1">DPIIT Recognition Number</label>
              <input 
                type="text" 
                placeholder="e.g. DPIIT-89241"
                value={dpiitId}
                onChange={(e) => setDpiitId(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white text-xs font-mono"
              />
            </div>
          )}

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white text-xs"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm flex items-center justify-center space-x-1.5 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Complete Registration</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-1">
          Already registered?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign In here
          </Link>
        </div>

      </div>
    </div>
  );
}
