import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Building2, FileText, Activity, ShieldCheck, 
  TrendingUp, Database, Users, CheckCircle2, UserCheck, Bell, 
  Search, Menu, X, ChevronDown, LogOut, User, Compass, RefreshCw, 
  Sparkles, Award, Shield, FileSpreadsheet, PlusCircle, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProcurement } from '../context/ProcurementContext';
import Breadcrumbs from '../components/common/Breadcrumbs';
import NotificationDrawer from '../components/common/NotificationDrawer';
import DemoTourModal from '../components/DemoTourModal';

export default function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, loginAs, demoUsers, notification } = useAuth();
  const { notificationsList, tenders } = useProcurement();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tenders?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Role-based Navigation Links
  const getNavLinks = () => {
    const role = currentUser?.role || 'Startup';

    if (role === 'Startup') {
      return [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Schemes & Opportunities', path: '/schemes-opportunities', icon: Sparkles, badge: 'Hub' },
        { label: 'Browse Tenders', path: '/tenders', icon: Building2, badge: tenders.length },
        { label: 'My Proposals / Bids', path: '/bids', icon: FileText },
        { label: 'Commercial Contracts', path: '/contracts', icon: Award },
        { label: 'Sandbox Telemetry', path: '/pilots', icon: Activity, badge: 'Live' },
        { label: 'Startup Profile & DPIIT', path: '/onboarding', icon: UserCheck },
        { label: 'Audit Trail', path: '/audit', icon: Database }
      ];
    } else if (role === 'Procurement Officer') {
      return [
        { label: 'Officer Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Schemes & Opportunities', path: '/schemes-opportunities', icon: Sparkles, badge: 'Hub' },
        { label: 'Department Tenders', path: '/tenders', icon: Building2, badge: tenders.length },
        { label: 'Received Bids', path: '/bids', icon: FileText },
        { label: 'Evaluation Matrix', path: '/evaluations', icon: ShieldCheck },
        { label: 'DPC Contracts & Awards', path: '/contracts', icon: Award },
        { label: 'Sandbox Telemetry', path: '/pilots', icon: Activity, badge: 'Live' },
        { label: 'Audit Ledger', path: '/audit', icon: Database }
      ];
    } else if (role === 'Evaluator') {
      return [
        { label: 'Evaluator Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Schemes & Opportunities', path: '/schemes-opportunities', icon: Sparkles, badge: 'Hub' },
        { label: 'Assigned Evaluations', path: '/evaluations', icon: ShieldCheck },
        { label: 'Tenders Catalog', path: '/tenders', icon: Building2 },
        { label: 'Pilot Feeds', path: '/pilots', icon: Activity },
        { label: 'Signed Audit Ledger', path: '/audit', icon: Database }
      ];
    } else {
      // Admin
      return [
        { label: 'Admin Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'Schemes & Opportunities', path: '/schemes-opportunities', icon: Sparkles, badge: 'Hub' },
        { label: 'Startup Approvals', path: '/admin/verifications', icon: CheckCircle2 },
        { label: 'User Directory', path: '/admin/users', icon: Users },
        { label: 'All State Tenders', path: '/tenders', icon: Building2, badge: tenders.length },
        { label: 'All Bids', path: '/bids', icon: FileText },
        { label: 'Scale Contracts', path: '/contracts', icon: Award },
        { label: 'Sandbox Telemetry', path: '/pilots', icon: Activity },
        { label: 'Consensus Ledger', path: '/audit', icon: Database }
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Unified Global Header */}
      <div className="w-full bg-[#0f172a] text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center text-slate-200 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mr-2" />
              Government of Maharashtra
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-medium">Smart India Hackathon 2026 (SIH26136)</span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-medium">
            <button 
              onClick={() => setShowTourModal(true)}
              className="text-amber-400 hover:text-amber-300 flex items-center transition-colors"
            >
              <Compass className="w-3.5 h-3.5 mr-1" /> 5-Stage Demo Tour
            </button>
            <span className="text-slate-600">|</span>
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand & Sidebar Toggle */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                title="Toggle Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <Link to="/" className="flex items-center space-x-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:bg-blue-700 transition-colors">
                  G
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-base tracking-tight text-slate-900 font-display">GovScale</span>
                    <span className="text-[10px] font-mono font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.2 rounded">
                      SIH26136
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Middle: Global Quick Search */}
            <form onSubmit={handleGlobalSearch} className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search tenders, startups, contracts, districts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </form>

            {/* Right: Notification, Role Switcher, Profile */}
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              
              {/* Notification Bell */}
              <button 
                onClick={() => setNotificationsOpen(true)}
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                )}
              </button>

              {/* Role Quick Switcher Pill */}
              <div className="hidden sm:flex items-center bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 mr-1.5">Role:</span>
                <select
                  value={currentUser?.role || 'Startup'}
                  onChange={(e) => {
                    loginAs(e.target.value);
                    navigate('/dashboard');
                  }}
                  className="bg-transparent text-slate-800 font-semibold border-none p-0 text-xs focus:ring-0 cursor-pointer"
                >
                  {demoUsers.map(u => (
                    <option key={u.role} value={u.role} className="bg-white text-slate-800 font-medium">
                      {u.role}
                    </option>
                  ))}
                </select>
              </div>

              {/* User Avatar & Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg ${currentUser?.color || 'bg-blue-600'} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
                    {currentUser?.avatar || 'U'}
                  </div>
                  <div className="hidden xl:block text-left text-xs">
                    <span className="font-semibold text-slate-800 block leading-tight truncate max-w-[120px]">{currentUser?.name}</span>
                    <span className="text-[10px] text-slate-400 leading-tight block">{currentUser?.role}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in text-xs">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-800 truncate">{currentUser?.name}</p>
                      <p className="text-slate-400 text-[11px] truncate">{currentUser?.email}</p>
                      <span className="badge-gov badge-blue text-[10px] mt-1.5">{currentUser?.role}</span>
                    </div>

                    <Link 
                      to="/profile" 
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <User className="w-4 h-4 mr-2 text-slate-400" />
                      <span>Profile & Settings</span>
                    </Link>

                    <Link 
                      to="/dashboard" 
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2 text-slate-400" />
                      <span>Role Dashboard</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />

                    <button 
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Main Body with Collapsible Sidebar & Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Collapsible Sidebar */}
        <aside className={`hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-200 ${
          sidebarOpen ? 'w-64' : 'w-18'
        }`}>
          {/* User Role Identity Strip */}
          {sidebarOpen ? (
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Active Workspace</span>
              <p className="font-bold text-xs text-slate-800 truncate mt-0.5">{currentUser?.org || 'State Innovation Portal'}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] text-slate-500">{currentUser?.role} Mode</span>
              </div>
            </div>
          ) : (
            <div className="p-3 border-b border-slate-100 flex justify-center">
              <div className={`w-8 h-8 rounded-lg ${currentUser?.color} text-white flex items-center justify-center font-bold text-xs`}>
                {currentUser?.avatar}
              </div>
            </div>
          )}

          {/* Nav List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </div>
                  {sidebarOpen && item.badge !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono font-semibold ${
                      isActive ? 'bg-blue-200 text-blue-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Separated Secondary / Public Navigation Item */}
            <div className="pt-2 mt-2 border-t border-slate-200/80">
              <Link
                to="/"
                title={!sidebarOpen ? 'Public Portal' : undefined}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-semibold transition-colors group"
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Globe className="w-4 h-4 text-blue-600 group-hover:text-blue-700 shrink-0" />
                  {sidebarOpen && <span>Public Portal</span>}
                </div>
                {sidebarOpen && (
                  <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded font-medium">
                    Public ↗
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Quick Support / Feedback Footer in Sidebar */}
          {sidebarOpen && (
            <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-[11px] text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">GovScale SIH26136</p>
              <p className="text-[10px] text-slate-400">Maharashtra Innovation Society</p>
            </div>
          )}
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-72 max-w-full bg-white flex flex-col p-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">G</div>
                  <span className="font-bold text-sm text-slate-900">GovScale Menu</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Role Switcher */}
              <div className="mb-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Active Role</span>
                <select
                  value={currentUser?.role || 'Startup'}
                  onChange={(e) => {
                    loginAs(e.target.value);
                    setMobileMenuOpen(false);
                    navigate('/dashboard');
                  }}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-semibold text-slate-800"
                >
                  {demoUsers.map(u => (
                    <option key={u.role} value={u.role}>{u.role}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1 overflow-y-auto space-y-1">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${
                        isActive ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="text-[10px] bg-slate-100 px-1.5 py-0.2 rounded font-mono">{item.badge}</span>
                      )}
                    </Link>
                  );
                })}

                <div className="pt-2 border-t border-slate-200 my-2">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span>Public Portal</span>
                    </div>
                    <span className="text-[10px] text-blue-600">↗</span>
                  </Link>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-center space-x-1.5 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Outlet with Breadcrumbs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Breadcrumbs />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            <Outlet />
          </main>

          {/* Clean App Shell Footer */}
          <footer className="bg-white text-slate-500 text-xs py-5 px-6 border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-800 text-xs font-display">GovScale</span>
                <span className="text-slate-300">•</span>
                <span>Smart Public Procurement for Startup Innovation (SIH26136)</span>
              </div>
              <div className="flex items-center space-x-4 text-xs font-medium">
                <Link to="/tenders" className="hover:text-slate-800">Tenders</Link>
                <Link to="/audit" className="hover:text-slate-800">Ledger</Link>
                <button onClick={() => setShowTourModal(true)} className="hover:text-slate-800">Demo Tour</button>
              </div>
            </div>
          </footer>
        </div>

      </div>

      {/* Notifications Drawer */}
      <NotificationDrawer 
        isOpen={notificationsOpen} 
        onClose={() => setNotificationsOpen(false)} 
      />

      {/* 5-Stage Demo Tour Modal */}
      {showTourModal && (
        <DemoTourModal 
          onClose={() => setShowTourModal(false)}
          onNavigateTab={(tab) => {
            setShowTourModal(false);
            if (tab === 'challenges') navigate('/tenders');
            else if (tab === 'match') navigate('/tenders');
            else if (tab === 'evaluations') navigate('/evaluations');
            else if (tab === 'pilots') navigate('/pilots');
            else if (tab === 'procurement') navigate('/contracts');
            else navigate('/dashboard');
          }}
        />
      )}

    </div>
  );
}
