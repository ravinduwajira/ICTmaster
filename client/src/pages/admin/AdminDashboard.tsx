import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Award,
  FileText,
  BarChart3,
  Plus,
  Settings,
  Eye,
  Search,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Edit
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { mockCourses } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const [showCourseAccessModal, setShowCourseAccessModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [isGrantingAccess, setIsGrantingAccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const stats = {
    totalStudents: 1247,
    activeCourses: 12,
    totalRevenue: 2850000,
    newEnrollments: 45,
    completionRate: 78,
    avgRating: 4.7,
  };

  const recentActivities = [
    { id: 1, type: 'enrollment', user: 'Kamal Perera', course: 'Web Development Bootcamp', time: '2 hours ago' },
    { id: 2, type: 'completion', user: 'Priya Silva', course: 'Python Programming', time: '4 hours ago' },
    { id: 3, type: 'payment', user: 'Rajesh Fernando', course: 'Digital Marketing', time: '6 hours ago' },
    { id: 4, type: 'question', user: 'Nimal Jayawardana', course: 'React Native', time: '8 hours ago' },
  ];

  // Mock bank transfer requests
  const bankTransferRequests = [
    { 
      id: 1, 
      studentEmail: 'saman@example.com', 
      studentName: 'Saman Kumara',
      course: 'Web Development Bootcamp', 
      amount: 15000, 
      date: '2024-01-15',
      status: 'pending'
    },
    { 
      id: 2, 
      studentEmail: 'priya@example.com', 
      studentName: 'Priya Mendis',
      course: 'Python Programming', 
      amount: 12000, 
      date: '2024-01-14',
      status: 'pending'
    },
    { 
      id: 3, 
      studentEmail: 'kasun@example.com', 
      studentName: 'Kasun Silva',
      course: 'Digital Marketing', 
      amount: 18000, 
      date: '2024-01-13',
      status: 'pending'
    },
  ];

  const handleGrantAccess = async () => {
    if (!studentEmail || !selectedCourse) {
      return;
    }

    setIsGrantingAccess(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const course = mockCourses.find(c => c.id === selectedCourse);
    setSuccessMessage(`Successfully granted access to "${course?.title}" for ${studentEmail}`);
    
    // Reset form
    setStudentEmail('');
    setSelectedCourse('');
    setIsGrantingAccess(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
      setShowCourseAccessModal(false);
    }, 3000);
  };

  const handleQuickGrant = async (request: any) => {
    setIsGrantingAccess(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSuccessMessage(`Successfully granted access to "${request.course}" for ${request.studentEmail}`);
    setIsGrantingAccess(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your educational platform</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-primary-600" />
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
                <p className="text-2xl font-bold text-gray-900">{stats.activeCourses}</p>
              </div>
              <div className="bg-secondary-100 p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-secondary-600" />
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
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">LKR {stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-accent-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-accent-600" />
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
                <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${activity.type === 'enrollment' ? 'bg-primary-100' : ''}
                    ${activity.type === 'completion' ? 'bg-secondary-100' : ''}
                    ${activity.type === 'payment' ? 'bg-accent-100' : ''}
                    ${activity.type === 'question' ? 'bg-warning-100' : ''}
                  `}>
                    {activity.type === 'enrollment' && <Users className="w-5 h-5 text-primary-600" />}
                    {activity.type === 'completion' && <Award className="w-5 h-5 text-secondary-600" />}
                    {activity.type === 'payment' && <DollarSign className="w-5 h-5 text-accent-600" />}
                    {activity.type === 'question' && <FileText className="w-5 h-5 text-warning-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.course}</p>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Give Course Access to Bank Transfers */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Give Course Access to Bank Transfers</h3>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {bankTransferRequests.length} pending
                </span>
                <Button 
                  size="sm" 
                  icon={UserPlus}
                  onClick={() => setShowCourseAccessModal(true)}
                >
                  Grant Access
                </Button>
              </div>
            </div>
            
            {bankTransferRequests.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p>No pending bank transfer requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bankTransferRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{request.studentName}</p>
                      <p className="text-sm text-gray-600">{request.studentEmail}</p>
                      <p className="text-sm text-gray-600">{request.course}</p>
                      <p className="text-xs text-gray-500">{request.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">LKR {request.amount.toLocaleString()}</p>
                      <div className="flex space-x-2 mt-2">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleQuickGrant(request)}
                          disabled={isGrantingAccess}
                        >
                          {isGrantingAccess ? 'Granting...' : 'Grant Access'}
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Link to="/admin/add-course">
              <Button icon={Plus} className="h-16 flex-col w-full">
                <span className="text-sm">Add Course</span>
              </Button>
            </Link>
            <Link to="/admin/manage-courses">
              <Button icon={Edit} variant="outline" className="h-16 flex-col w-full">
                <span className="text-sm">Manage Courses</span>
              </Button>
            </Link>
            <Link to="/admin/manage-students">
              <Button icon={Users} variant="outline" className="h-16 flex-col w-full">
                <span className="text-sm">Manage Students</span>
              </Button>
            </Link>
            <Link to="/admin/add-practice-paper">
              <Button icon={FileText} variant="outline" className="h-16 flex-col w-full">
                <span className="text-sm">Add Practice Paper</span>
              </Button>
            </Link>
            <Link to="/admin/reports">
              <Button icon={BarChart3} variant="outline" className="h-16 flex-col w-full">
                <span className="text-sm">View Reports</span>
              </Button>
            </Link>
          </div>
        </Card>

        {/* Course Access Modal */}
        <Modal
          isOpen={showCourseAccessModal}
          onClose={() => setShowCourseAccessModal(false)}
          title="Grant Course Access"
          maxWidth="md"
        >
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Manual Course Access</p>
                  <p>Use this to grant course access to students who have completed bank transfers. Verify payment before granting access.</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Email *
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter student email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Course *
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Choose a course</option>
                {mockCourses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title} - LKR {course.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {selectedCourse && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Course Details</h4>
                {(() => {
                  const course = mockCourses.find(c => c.id === selectedCourse);
                  return course ? (
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Title:</span> {course.title}</p>
                      <p><span className="font-medium">Price:</span> LKR {course.price.toLocaleString()}</p>
                      <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                      <p><span className="font-medium">Duration:</span> {course.duration}</p>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCourseAccessModal(false)}
                disabled={isGrantingAccess}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGrantAccess}
                disabled={!studentEmail || !selectedCourse || isGrantingAccess}
                icon={isGrantingAccess ? undefined : UserPlus}
              >
                {isGrantingAccess ? 'Granting Access...' : 'Grant Access'}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};