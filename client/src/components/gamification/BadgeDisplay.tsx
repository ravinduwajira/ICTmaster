import React from 'react';
import { Award } from 'lucide-react';
import { Badge } from '../../types';

interface BadgeDisplayProps {
  badges: Badge[];
  className?: string;
  showAll?: boolean;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  badges, 
  className = '',
  showAll = false 
}) => {
  const displayBadges = showAll ? badges : badges.slice(0, 3);
  const remainingCount = badges.length - 3;

  if (badges.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <Award className="w-12 h-12 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500">No badges earned yet</p>
        <p className="text-sm text-gray-400">Complete lessons and quizzes to earn badges!</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-3">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className="bg-white rounded-lg p-3 shadow-card border-2 border-gray-100 hover:border-primary-200 transition-colors"
            title={badge.description}
          >
            <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center text-white text-xl mb-2 mx-auto`}>
              {badge.icon}
            </div>
            <p className="text-xs font-medium text-gray-900 text-center">{badge.name}</p>
            <p className="text-xs text-gray-500 text-center mt-1">{badge.requirement}</p>
          </div>
        ))}
        
        {!showAll && remainingCount > 0 && (
          <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-medium mb-2 mx-auto">
                +{remainingCount}
              </div>
              <p className="text-xs text-gray-600">More badges</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};