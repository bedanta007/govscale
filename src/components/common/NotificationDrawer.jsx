import React from 'react';
import { X, Check, Bell, ExternalLink, ShieldAlert, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProcurement } from '../../context/ProcurementContext';

export default function NotificationDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { notificationsList, markNotificationRead } = useProcurement();

  if (!isOpen) return null;

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.link) {
      navigate(notif.link);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-fade-in">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">Notifications</h3>
                <p className="text-[11px] text-slate-500">Real-time procurement alerts & updates</p>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {notificationsList.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No notifications right now.
              </div>
            ) : (
              notificationsList.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    item.read 
                      ? 'bg-slate-50/60 border-slate-100 opacity-75' 
                      : 'bg-white border-blue-200 shadow-xs hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${item.read ? 'bg-slate-300' : 'bg-blue-600'}`} />
                      <span className="font-bold text-xs text-slate-900">{item.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{item.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 pl-4 leading-relaxed">{item.description}</p>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>State Innovation Portal • SIH26136</span>
            <button 
              onClick={() => {
                notificationsList.forEach(n => markNotificationRead(n.id));
              }}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Mark all read
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
