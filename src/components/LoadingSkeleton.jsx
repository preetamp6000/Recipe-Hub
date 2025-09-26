import React from 'react';

export const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  if (type === 'detail') {
    return (
      <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-2xl max-w-4xl w-full p-8 animate-pulse">
          <div className="h-64 bg-gray-700 rounded-xl mb-6"></div>
          <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-700"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;