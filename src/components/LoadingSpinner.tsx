import React from 'react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 space-y-3">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-orange-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-[#F36B16] border-t-transparent animate-spin"></div>
      </div>
      <p className="text-xs font-semibold text-gray-600 tracking-wide">{message}</p>
    </div>
  );
};
