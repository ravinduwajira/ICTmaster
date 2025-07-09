import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';

interface XPDisplayProps {
  currentXP: number;
  level: number;
  className?: string;
}

export const XPDisplay: React.FC<XPDisplayProps> = ({ currentXP, level, className = '' }) => {
  const getXPForLevel = (level: number) => level * 1000;
  const getXPForNextLevel = (level: number) => (level + 1) * 1000;
  
  const currentLevelXP = getXPForLevel(level);
  const nextLevelXP = getXPForNextLevel(level);
  const progressXP = currentXP - currentLevelXP;
  const neededXP = nextLevelXP - currentLevelXP;
  const progress = (progressXP / neededXP) * 100;

  return (
    <div className={`bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span className="font-semibold">Level {level}</span>
        </div>
        <div className="flex items-center space-x-1 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>{currentXP.toLocaleString()} XP</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>{progressXP} / {neededXP} XP</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs opacity-90">
          {neededXP - progressXP} XP to next level
        </p>
      </div>
    </div>
  );
};