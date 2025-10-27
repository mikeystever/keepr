
import React from 'react';

interface NotificationToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ message, type, onDismiss }) => {
  const baseClasses = 'fixed bottom-5 right-5 max-w-sm w-full shadow-lg rounded-md pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden';
  const typeClasses = {
    success: 'bg-green-800 border-green-500 text-green-100',
    error: 'bg-red-800 border-red-500 text-red-100',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {type === 'success' ? (
              <svg className="h-6 w-6 text-green-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-red-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button onClick={onDismiss} className="inline-flex text-gray-300 hover:text-white focus:outline-none">
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;
