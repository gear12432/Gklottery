import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl my-3 flex items-start space-x-3">
      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-xs font-medium text-red-800 leading-snug">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center space-x-1 text-xs font-bold text-red-700 hover:underline"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};
