import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Star,
  PlayCircle,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Globe,
  FileText
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { mockCourses } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  const stats = {
    totalCourses: 50,
    activeStudents: 1200,
    completedProjects: 850,
    successRate: 95,
  };

  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Master ICT Skills in 
                <span className="text-secondary-200"> Sri Lanka</span>
              </h1>
              <p className="text-xl mb-8 text-primary-100 leading-relaxed">
                Join thousands of students learning programming, web development, 
                and digital skills with our expert-designed courses tailored for local success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/courses">
                  <Button size="lg" variant="secondary" icon={BookOpen}>
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/practice">
                  <Button size="lg" variant="outline" icon={PlayCircle}>
                    Practice Papers
                  </Button>
                </Link>
              </div>
              
              {user && (
                <div className="mt-8 bg-white bg-opacity-10 rounded-lg p-4">
                  <p className="text-sm text-primary-100 mb-2">Welcome back, {user.name}!</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Level {user.level}
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {user.xp} XP
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {user.badges.length} Badges
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students learning"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.totalCourses}+</div>
              <div className="text-gray-600">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.activeStudents.toLocaleString()}+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-accent-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.completedProjects}+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-success-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stats.successRate}%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your journey with our most popular courses designed by industry experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <Card key={course.id} hover className="h-full">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-medium">
                    {course.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    LKR {course.price.toLocaleString()}
                  </span>
                  <Link to="/courses">
                    <Button size="sm" icon={ArrowRight}>
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/courses">
              <Button size="lg" icon={BookOpen}>
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose ICTmaster.lk?</h2>
            <p className="text-xl text-gray-600">
              Comprehensive learning experience with gamification and real-world projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlayCircle className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Learning</h3>
              <p className="text-gray-600">
                Hands-on lessons with videos, quizzes, and practical exercises designed for Sri Lankan students
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gamified Experience</h3>
              <p className="text-gray-600">
                Earn XP, unlock badges, and compete on leaderboards while mastering ICT skills
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of experience in Sri Lankan tech industry
              </p>
            </div>

            <div className="text-center">
              <div className="bg-success-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Context</h3>
              <p className="text-gray-600">
                Courses tailored for Sri Lankan job market with local examples and case studies
              </p>
            </div>

            <div className="text-center">
              <div className="bg-warning-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Practical Projects</h3>
              <p className="text-gray-600">
                Build real-world projects that you can showcase to potential employers
              </p>
            </div>

            <div className="text-center">
              <div className="bg-error-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-error-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Track Learning</h3>
              <p className="text-gray-600">
                Accelerated learning paths designed to get you job-ready in the shortest time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your ICT Journey?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of Sri Lankan students who have transformed their careers with our courses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" variant="secondary" icon={BookOpen}>
                Browse Courses
              </Button>
            </Link>
            <Link to="/practice">
              <Button size="lg" variant="outline" icon={FileText}>
                Try Practice Papers
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};