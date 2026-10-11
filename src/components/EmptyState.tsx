import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon = Inbox,
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 my-4">
      <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-[#F36B16] mb-3">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 max-w-xs mb-4">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-[#F36B16] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#C95C2D] active:scale-95 transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
