import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyState({ 
  icon: Icon = Inbox, 
  title = "No items found", 
  description = "There are no records to display at this time.", 
  actionLabel, 
  onAction 
}) {
  return (
    <div className="card-gov p-8 sm:p-12 text-center space-y-3 bg-white border border-slate-200">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center justify-center mx-auto">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900 font-display">{title}</h3>
      <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <div className="pt-2">
          <button 
            onClick={onAction}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors"
          >
            {actionLabel}
          </button>
        </div>
      )}
    </div>
  );
}
