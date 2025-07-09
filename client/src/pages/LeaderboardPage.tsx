import React, { useState } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Users, Award } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { XPDisplay } from '../components/gamification/XPDisplay';
import { BadgeDisplay } from '../components/gamification/BadgeDisplay';
import { useAuth } from '../contexts/AuthContext';
import { mockBadges } from '../data/mockData';

export const LeaderboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');

  // Mock leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      user: {
        id: '1',
        name: 'Kamal Perera',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        level: 12,
        xp: 15650,
        badges: 8,
        completedCourses: 5,
      }
    },
    {
      rank: 2,
      user: {
        id: '2',
        name: 'Priya Silva',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
        level: 11,
        xp: 14200,
        badges: 7,
        completedCourses: 4,
      }
    },
    {
      rank: 3,
      user: {
        id: '3',
        name: 'Rajesh Fernando',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        level: 10,
        xp: 12890,
        badges: 6,
        completedCourses: 4,
      }
    },
    {
      rank: 4,
      user: {
        id: '4',
        name: 'Nimal Jayawardana',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
        level: 9,
        xp: 11450,
        badges: 5,
        completedCourses: 3,
      }
    },
    {
      rank: 5,
      user: {
        id: '5',
        name: 'Saman Kumara',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
        level: 8,
        xp: 9800,
        badges: 4,
        completedCourses: 3,
      }
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }  
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-600';
      default:
        return 'bg-gray-100';
    }
  };

  const userRank = leaderboardData.findIndex(entry => entry.user.id === user?.id) + 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary-500 text-white p-3 rounded-full">
              <Trophy className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">Compete with other students and climb the ranks!</p>
        </div>

        {/* User's Current Stats */}
        {user && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <XPDisplay currentXP={user.xp} level={user.level} />
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-4 h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600 mb-1">
                        #{userRank || 'Unranked'}
                      </div>
                      <div className="text-gray-600">Your Current Rank</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex">
            <button
              onClick={() => setActiveTab('weekly')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-l-lg transition-colors
                ${activeTab === 'weekly'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              This Week
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors
                ${activeTab === 'monthly'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <Users className="w-4 h-4 mr-2" />
              This Month
            </button>
            <button
              onClick={() => setActiveTab('all-time')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-r-lg transition-colors
                ${activeTab === 'all-time'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <Trophy className="w-4 h-4 mr-2" />
              All Time
            </button>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {leaderboardData.slice(0, 3).map((entry, index) => (
            <Card
              key={entry.user.id}
              className={`
                text-center relative overflow-hidden
                ${index === 0 ? 'md:order-2 transform md:scale-105' : ''}
                ${index === 1 ? 'md:order-1' : ''}
                ${index === 2 ? 'md:order-3' : ''}
              `}
            >
              <div className={`absolute inset-0 ${getRankBg(entry.rank)} opacity-10`} />
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  {getRankIcon(entry.rank)}
                </div>
                <img
                  src={entry.user.avatar}
                  alt={entry.user.name}
                  className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-lg"
                />
                <h3 className="font-semibold text-gray-900 mb-1">{entry.user.name}</h3>
                <div className="text-sm text-gray-600 mb-2">Level {entry.user.level}</div>
                <div className="font-bold text-primary-600 mb-2">{entry.user.xp.toLocaleString()} XP</div>
                <div className="text-xs text-gray-500">
                  {entry.user.badges} badges • {entry.user.completedCourses} courses
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Full Rankings</h3>
          <div className="space-y-3">
            {leaderboardData.map((entry) => (
              <div
                key={entry.user.id}
                className={`
                  flex items-center p-4 rounded-lg transition-colors
                  ${entry.user.id === user?.id 
                    ? 'bg-primary-50 border-2 border-primary-200' 
                    : 'bg-gray-50 hover:bg-gray-100'
                  }
                `}
              >
                <div className="flex items-center justify-center w-12 h-12 mr-4">
                  {entry.rank <= 3 ? (
                    getRankIcon(entry.rank)
                  ) : (
                    <span className="text-lg font-bold text-gray-600">#{entry.rank}</span>
                  )}
                </div>
                
                <img
                  src={entry.user.avatar}
                  alt={entry.user.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 truncate">{entry.user.name}</h4>
                    {entry.user.id === user?.id && (
                      <span className="bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Level {entry.user.level} • {entry.user.completedCourses} courses completed
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-primary-600">{entry.user.xp.toLocaleString()} XP</div>
                  <div className="text-sm text-gray-500">{entry.user.badges} badges</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Badge Showcase */}
        <Card className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Badges</h3>
          <BadgeDisplay badges={mockBadges} showAll />
        </Card>
      </div>
    </div>
  );
};