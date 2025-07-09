import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign,
  Award,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Clock,
  Star
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const ViewReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [reportType, setReportType] = useState('overview');

  // Mock data for reports
  const overviewStats = {
    totalRevenue: 2850000,
    totalStudents: 1247,
    activeCourses: 12,
    completionRate: 78,
    avgRating: 4.7,
    newEnrollments: 45,
    practiceTests: 234,
    certificatesIssued: 89
  };

  const monthlyData = [
    { month: 'Jan', revenue: 245000, students: 89, enrollments: 12 },
    { month: 'Feb', revenue: 298000, students: 124, enrollments: 18 },
    { month: 'Mar', revenue: 356000, students: 156, enrollments: 24 },
    { month: 'Apr', revenue: 412000, students: 189, enrollments: 31 },
    { month: 'May', revenue: 478000, students: 234, enrollments: 28 },
    { month: 'Jun', revenue: 523000, students: 267, enrollments: 35 }
  ];

  const topCourses = [
    { name: 'Web Development Bootcamp', enrollments: 234, revenue: 3510000, rating: 4.8 },
    { name: 'Python Programming Mastery', enrollments: 189, revenue: 2268000, rating: 4.9 },
    { name: 'Digital Marketing & SEO', enrollments: 156, revenue: 2808000, rating: 4.7 },
    { name: 'React Native Development', enrollments: 123, revenue: 2460000, rating: 4.6 },
    { name: 'Data Science Fundamentals', enrollments: 98, revenue: 1470000, rating: 4.8 }
  ];

  const studentEngagement = {
    dailyActiveUsers: 456,
    weeklyActiveUsers: 892,
    monthlyActiveUsers: 1247,
    avgSessionDuration: '24 minutes',
    avgLessonsPerSession: 2.3,
    practiceTestsCompleted: 1234,
    forumPosts: 567,
    certificatesEarned: 89
  };

  const paymentStats = {
    onlinePayments: 67,
    bankTransfers: 33,
    pendingPayments: 12,
    refunds: 3,
    avgOrderValue: 16500,
    conversionRate: 12.4
  };

  const renderOverviewReport = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">LKR {overviewStats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +18% from last month
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.totalStudents.toLocaleString()}</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12% from last month
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.activeCourses}</p>
            </div>
            <div className="bg-accent-100 p-3 rounded-full">
              <BookOpen className="w-6 h-6 text-accent-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +2 new courses
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.completionRate}%</p>
            </div>
            <div className="bg-success-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            +5% improvement
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{data.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `${(data.revenue / 600000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">
                    LKR {(data.revenue / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Growth</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{data.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-secondary-500 h-2 rounded-full"
                      style={{ width: `${(data.students / 300) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">
                    {data.students}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Courses */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Courses</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Course Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Enrollments</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Rating</th>
              </tr>
            </thead>
            <tbody>
              {topCourses.map((course, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{course.name}</td>
                  <td className="py-3 px-4 text-gray-600">{course.enrollments}</td>
                  <td className="py-3 px-4 text-gray-600">LKR {course.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-gray-900">{course.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderStudentReport = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Daily Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{studentEngagement.dailyActiveUsers}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <Activity className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{studentEngagement.weeklyActiveUsers}</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Session Duration</p>
              <p className="text-2xl font-bold text-gray-900">{studentEngagement.avgSessionDuration}</p>
            </div>
            <div className="bg-accent-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Certificates Earned</p>
              <p className="text-2xl font-bold text-gray-900">{studentEngagement.certificatesEarned}</p>
            </div>
            <div className="bg-success-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Practice Tests Completed</span>
              <span className="font-semibold">{studentEngagement.practiceTestsCompleted}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Forum Posts</span>
              <span className="font-semibold">{studentEngagement.forumPosts}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Lessons per Session</span>
              <span className="font-semibold">{studentEngagement.avgLessonsPerSession}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly Active Users</span>
              <span className="font-semibold">{studentEngagement.monthlyActiveUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Certificates Earned</span>
              <span className="font-semibold">{studentEngagement.certificatesEarned}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Online Payments</p>
              <p className="text-2xl font-bold text-gray-900">{paymentStats.onlinePayments}%</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bank Transfers</p>
              <p className="text-2xl font-bold text-gray-900">{paymentStats.bankTransfers}%</p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <FileText className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">LKR {paymentStats.avgOrderValue.toLocaleString()}</p>
            </div>
            <div className="bg-accent-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{paymentStats.conversionRate}%</p>
            </div>
            <div className="bg-success-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Distribution</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Online Payments (Credit/Debit Cards)</span>
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full"
                  style={{ width: `${paymentStats.onlinePayments}%` }}
                />
              </div>
              <span className="font-semibold w-12 text-right">{paymentStats.onlinePayments}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Bank Transfers</span>
            <div className="flex items-center space-x-4">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-secondary-500 h-2 rounded-full"
                  style={{ width: `${paymentStats.bankTransfers}%` }}
                />
              </div>
              <span className="font-semibold w-12 text-right">{paymentStats.bankTransfers}%</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderReportContent = () => {
    switch (reportType) {
      case 'students':
        return renderStudentReport();
      case 'financial':
        return renderFinancialReport();
      default:
        return renderOverviewReport();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="outline" icon={ArrowLeft}>
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          </div>
          <div className="flex space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="last-7-days">Last 7 days</option>
              <option value="last-30-days">Last 30 days</option>
              <option value="last-90-days">Last 90 days</option>
              <option value="last-year">Last year</option>
            </select>
            <Button variant="outline" icon={Download}>
              Export Report
            </Button>
          </div>
        </div>

        {/* Report Type Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex">
            <button
              onClick={() => setReportType('overview')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-l-lg transition-colors
                ${reportType === 'overview'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </button>
            <button
              onClick={() => setReportType('students')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors
                ${reportType === 'students'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <Users className="w-4 h-4 mr-2" />
              Student Analytics
            </button>
            <button
              onClick={() => setReportType('financial')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-r-lg transition-colors
                ${reportType === 'financial'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Financial Reports
            </button>
          </div>
        </div>

        {/* Report Content */}
        {renderReportContent()}
      </div>
    </div>
  );
};