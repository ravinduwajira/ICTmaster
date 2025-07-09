import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Zap, 
  Target, 
  Camera, 
  Edit3, 
  Save, 
  X,
  Shield,
  Clock,
  TrendingUp,
  BookOpen,
  Trophy,
  Star
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { XPDisplay } from '../components/gamification/XPDisplay';
import { BadgeDisplay } from '../components/gamification/BadgeDisplay';
import { useAuth } from '../contexts/AuthContext';
import { mockBadges } from '../data/mockData';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!user) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, profilePicture: 'Please select a valid image file' }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profilePicture: 'Image size must be less than 5MB' }));
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Clear any previous errors
      setErrors(prev => ({ ...prev, profilePicture: '' }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeProfilePicture = () => {
    setProfilePicture(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      const updateData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        ...(profilePicture && { avatar: profilePicture }),
      };

      const result = await updateProfile(updateData);
      if (result.success) {
        setIsEditing(false);
        setProfilePicture(null);
      } else if (result.errors) {
        setErrors(result.errors);
      }
    } catch (error) {
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user.name,
      email: user.email,
    });
    setProfilePicture(null);
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const getNextLevelXP = (level: number) => (level + 1) * 1000;
  const getCurrentLevelXP = (level: number) => level * 1000;
  const progressToNextLevel = user.xp - getCurrentLevelXP(user.level);
  const xpNeededForNextLevel = getNextLevelXP(user.level) - getCurrentLevelXP(user.level);

  // Mock learning stats
  const learningStats = {
    coursesCompleted: 3,
    coursesInProgress: 2,
    totalLessons: 45,
    completedLessons: 32,
    averageScore: 87,
    studyStreak: user.streak,
    totalStudyTime: '24h 30m',
    practiceTests: 12,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and track your progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={Edit3}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={X}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      icon={Save}
                      onClick={handleSave}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                  </div>
                )}
              </div>

              {errors.general && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
                  <span className="text-sm text-red-700">{errors.general}</span>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Picture */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src={profilePicture || user.avatar}
                      alt={user.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {isEditing && (
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="absolute bottom-0 right-0 bg-primary-500 text-white rounded-full p-2 hover:bg-primary-600 transition-colors shadow-lg"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="text-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="hidden"
                      />
                      {profilePicture && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeProfilePicture}
                        >
                          Remove Photo
                        </Button>
                      )}
                      {errors.profilePicture && (
                        <p className="text-sm text-red-600 mt-1">{errors.profilePicture}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Profile Details */}
                <div className="flex-1 space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.name ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{user.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Enter your email"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{user.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900 capitalize">
                        {user.role === 'admin' ? 'Administrator' : 'Student'}
                      </span>
                      {user.role === 'admin' && (
                        <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Member Since */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{formatDate(user.createdAt)}</span>
                    </div>
                  </div>

                  {/* Last Active */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Active
                    </label>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{formatDate(user.lastActive)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Learning Statistics */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Learning Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{learningStats.coursesCompleted}</div>
                  <div className="text-sm text-gray-600">Courses Completed</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-secondary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{learningStats.coursesInProgress}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-accent-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-accent-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{learningStats.averageScore}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                
                <div className="text-center">
                  <div className="bg-warning-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-6 h-6 text-warning-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{learningStats.practiceTests}</div>
                  <div className="text-sm text-gray-600">Practice Tests</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons Completed:</span>
                    <span className="font-medium">{learningStats.completedLessons}/{learningStats.totalLessons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Study Streak:</span>
                    <span className="font-medium">{learningStats.studyStreak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Study Time:</span>
                    <span className="font-medium">{learningStats.totalStudyTime}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">My Badges</h3>
              <BadgeDisplay badges={user.badges.length > 0 ? user.badges : mockBadges.slice(0, 2)} showAll />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* XP Progress */}
            <XPDisplay currentXP={user.xp} level={user.level} />

            {/* Quick Stats */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-primary-500" />
                    <span className="text-sm text-gray-600">Current Level</span>
                  </div>
                  <span className="font-semibold text-gray-900">{user.level}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-secondary-500" />
                    <span className="text-sm text-gray-600">Total XP</span>
                  </div>
                  <span className="font-semibold text-gray-900">{user.xp.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-accent-500" />
                    <span className="text-sm text-gray-600">Badges Earned</span>
                  </div>
                  <span className="font-semibold text-gray-900">{user.badges.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-warning-500" />
                    <span className="text-sm text-gray-600">Study Streak</span>
                  </div>
                  <span className="font-semibold text-gray-900">{user.streak} days</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Progress to Level {user.level + 1}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(progressToNextLevel / xpNeededForNextLevel) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{progressToNextLevel} XP</span>
                  <span>{xpNeededForNextLevel} XP</span>
                </div>
              </div>
            </Card>

            {/* Account Actions */}
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Download Certificate
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};