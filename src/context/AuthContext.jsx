import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEMO_USERS = [
  {
    id: 'usr_startup_01',
    email: 'vikram@healthai.tech',
    password: 'password123',
    role: 'Startup',
    name: 'Vikram Malhotra',
    title: 'Founder & CEO',
    org: 'HealthAI Technologies Pvt Ltd',
    dpiitId: 'DPIIT-89241',
    verificationStatus: 'Verified',
    avatar: 'VM',
    color: 'bg-emerald-600',
    phone: '+91 98201 44820',
    location: 'Pune, Maharashtra'
  },
  {
    id: 'usr_officer_02',
    email: 'rajeshwar.deshmukh@health.maharashtra.gov.in',
    password: 'password123',
    role: 'Procurement Officer',
    name: 'Dr. Rajeshwar Deshmukh, IAS',
    title: 'Director of Digital Health & Hospital Administration',
    org: 'Public Health Department, Govt of Maharashtra',
    department: 'Public Health Department',
    verificationStatus: 'Verified',
    avatar: 'RD',
    color: 'bg-blue-600',
    phone: '+91 94220 11928',
    location: 'Mantralaya, Mumbai'
  },
  {
    id: 'usr_evaluator_03',
    email: 'ananya.kulkarni@iitb.ac.in',
    password: 'password123',
    role: 'Evaluator',
    name: 'Dr. Ananya Kulkarni',
    title: 'Principal Innovation Evaluator (GovTech Panel)',
    org: 'IIT Bombay Healthcare AI Research Cell',
    department: 'Independent Expert Panel',
    verificationStatus: 'Verified',
    avatar: 'AK',
    color: 'bg-purple-600',
    phone: '+91 97654 32109',
    location: 'Powai, Mumbai'
  },
  {
    id: 'usr_admin_04',
    email: 'admin@govscale.maharashtra.gov.in',
    password: 'password123',
    role: 'Admin',
    name: 'Sanjay Patil, IAS',
    title: 'State Procurement Governance Administrator',
    org: 'Maharashtra State Innovation Society (MSInS)',
    department: 'General Administration Dept',
    verificationStatus: 'Verified',
    avatar: 'SP',
    color: 'bg-amber-600',
    phone: '+91 98230 55412',
    location: 'Mantralaya, Mumbai'
  }
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('govscale_user');
      return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Default logged-in as Startup demo
    } catch {
      return DEMO_USERS[0];
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('govscale_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('govscale_user');
    }
  }, [currentUser]);

  const notify = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const login = (email, password) => {
    const found = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (found) {
      setCurrentUser(found);
      notify(`Welcome back, ${found.name}! Signed in as ${found.role}.`, 'success');
      return { success: true, user: found };
    }
    // Also accept any of the demo emails without password check for smooth reviewer testing
    const emailMatch = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailMatch) {
      setCurrentUser(emailMatch);
      notify(`Welcome back, ${emailMatch.name}!`, 'success');
      return { success: true, user: emailMatch };
    }
    return { success: false, error: 'Invalid email or password. Use demo credentials.' };
  };

  const loginAs = (role) => {
    const found = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[0];
    setCurrentUser(found);
    notify(`Switched active persona to ${found.role} (${found.name})`, 'success');
    return found;
  };

  const register = (userData) => {
    const newUser = {
      id: `usr_${Date.now().toString().slice(-4)}`,
      avatar: (userData.name || 'User').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      color: userData.role === 'Startup' ? 'bg-emerald-600' : userData.role === 'Procurement Officer' ? 'bg-blue-600' : 'bg-purple-600',
      verificationStatus: userData.role === 'Startup' ? 'Pending' : 'Verified',
      ...userData
    };
    setCurrentUser(newUser);
    notify(`Registration successful! Account created as ${newUser.role}.`, 'success');
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    notify('You have been securely signed out.', 'info');
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updatedFields };
      notify('Profile details updated successfully.', 'success');
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      notification,
      notify,
      login,
      loginAs,
      register,
      logout,
      updateProfile,
      demoUsers: DEMO_USERS
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
