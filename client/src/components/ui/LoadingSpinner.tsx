import React from 'react';
import { BookOpen } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white text-primary-500 p-4 rounded-xl mb-4 mx-auto w-fit animate-pulse">
          <BookOpen className="w-12 h-12" />
        </div>
        <div className="text-white">
          <span className="text-2xl font-bold">ICTmaster</span>
          <span className="text-lg text-secondary-200 ml-1">.lk</span>
        </div>
        <p className="text-primary-100 mt-2">Loading...</p>
      </div>
    </div>
  );
};