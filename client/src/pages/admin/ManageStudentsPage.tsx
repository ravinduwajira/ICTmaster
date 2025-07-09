import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  X,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Users,
  Ban,
  Unlock
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { mockCourses } from '../../data/mockData';

interface StudentCourse {
  courseId: string;
  courseName: string;
  enrolledDate: string;
  progress: number;
  status: 'active' | 'completed' | 'paused';
  lastAccessed: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  lastActive: string;
  coursesEnrolled: number;
  coursesCompleted: number;
  totalXP: number;
  level: number;
  status: 'active' | 'inactive' | 'suspended';
  enrolledCourses: StudentCourse[];
}

export const ManageStudentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showUngrantModal, setShowUngrantModal] = useState(false);
  const [selectedCourseToUngrant, setSelectedCourseToUngrant] = useState<StudentCourse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Enhanced mock student data with enrolled courses
  const students: Student[] = [
    {
      id: '1',
      name: 'Kamal Perera',
      email: 'kamal@example.com',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinDate: '2024-01-15',
      lastActive: '2024-01-20',
      coursesEnrolled: 3,
      coursesCompleted: 1,
      totalXP: 2450,
      level: 5,
      status: 'active',
      enrolledCourses: [
        {
          courseId: '1',
          courseName: 'Complete Web Development Bootcamp',
          enrolledDate: '2024-01-15',
          progress: 75,
          status: 'active',
          lastAccessed: '2024-01-20'
        },
        {
          courseId: '2',
          courseName: 'Python Programming Mastery',
          enrolledDate: '2024-01-10',
          progress: 100,
          status: 'completed',
          lastAccessed: '2024-01-18'
        },
        {
          courseId: '3',
          courseName: 'Digital Marketing & SEO',
          enrolledDate: '2024-01-12',
          progress: 30,
          status: 'active',
          lastAccessed: '2024-01-19'
        }
      ]
    },
    {
      id: '2',
      name: 'Priya Silva',
      email: 'priya@example.com',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinDate: '2024-01-10',
      lastActive: '2024-01-19',
      coursesEnrolled: 2,
      coursesCompleted: 2,
      totalXP: 3200,
      level: 7,
      status: 'active',
      enrolledCourses: [
        {
          courseId: '1',
          courseName: 'Complete Web Development Bootcamp',
          enrolledDate: '2024-01-10',
          progress: 100,
          status: 'completed',
          lastAccessed: '2024-01-15'
        },
        {
          courseId: '2',
          courseName: 'Python Programming Mastery',
          enrolledDate: '2024-01-08',
          progress: 100,
          status: 'completed',
          lastAccessed: '2024-01-12'
        }
      ]
    },
    {
      id: '3',
      name: 'Rajesh Fernando',
      email: 'rajesh@example.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinDate: '2024-01-05',
      lastActive: '2024-01-18',
      coursesEnrolled: 4,
      coursesCompleted: 1,
      totalXP: 1800,
      level: 4,
      status: 'inactive',
      enrolledCourses: [
        {
          courseId: '1',
          courseName: 'Complete Web Development Bootcamp',
          enrolledDate: '2024-01-05',
          progress: 45,
          status: 'paused',
          lastAccessed: '2024-01-15'
        },
        {
          courseId: '3',
          courseName: 'Digital Marketing & SEO',
          enrolledDate: '2024-01-06',
          progress: 100,
          status: 'completed',
          lastAccessed: '2024-01-10'
        },
        {
          courseId: '4',
          courseName: 'Mobile App Development with React Native',
          enrolledDate: '2024-01-07',
          progress: 20,
          status: 'active',
          lastAccessed: '2024-01-18'
        }
      ]
    },
    {
      id: '4',
      name: 'Nimal Jayawardana',
      email: 'nimal@example.com',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinDate: '2024-01-12',
      lastActive: '2024-01-20',
      coursesEnrolled: 1,
      coursesCompleted: 0,
      totalXP: 450,
      level: 2,
      status: 'active',
      enrolledCourses: [
        {
          courseId: '2',
          courseName: 'Python Programming Mastery',
          enrolledDate: '2024-01-12',
          progress: 15,
          status: 'active',
          lastAccessed: '2024-01-20'
        }
      ]
    },
    {
      id: '5',
      name: 'Saman Kumara',
      email: 'saman@example.com',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
      joinDate: '2024-01-08',
      lastActive: '2024-01-15',
      coursesEnrolled: 2,
      coursesCompleted: 0,
      totalXP: 890,
      level: 3,
      status: 'suspended',
      enrolledCourses: [
        {
          courseId: '1',
          courseName: 'Complete Web Development Bootcamp',
          enrolledDate: '2024-01-08',
          progress: 25,
          status: 'paused',
          lastAccessed: '2024-01-15'
        },
        {
          courseId: '3',
          courseName: 'Digital Marketing & SEO',
          enrolledDate: '2024-01-09',
          progress: 10,
          status: 'paused',
          lastAccessed: '2024-01-14'
        }
      ]
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectStudent = (studentId: string) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleUngrantCourse = (course: StudentCourse) => {
    setSelectedCourseToUngrant(course);
    setShowUngrantModal(true);
  };

  const confirmUngrantCourse = async () => {
    if (!selectedCourseToUngrant || !selectedStudent) return;

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update student's enrolled courses
    const updatedCourses = selectedStudent.enrolledCourses.filter(
      course => course.courseId !== selectedCourseToUngrant.courseId
    );
    
    const updatedStudent = {
      ...selectedStudent,
      enrolledCourses: updatedCourses,
      coursesEnrolled: updatedCourses.length,
      coursesCompleted: updatedCourses.filter(c => c.status === 'completed').length
    };
    
    setSelectedStudent(updatedStudent);
    setSuccessMessage(`Successfully removed access to "${selectedCourseToUngrant.courseName}" for ${selectedStudent.name}`);
    setIsProcessing(false);
    setShowUngrantModal(false);
    setSelectedCourseToUngrant(null);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Active</span>;
      case 'inactive':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Inactive</span>;
      case 'suspended':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Suspended</span>;
      default:
        return null;
    }
  };

  const getCourseStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Active</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Completed</span>;
      case 'paused':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Paused</span>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'active').length,
    newThisMonth: students.filter(s => new Date(s.joinDate) > new Date('2024-01-01')).length,
    avgCompletionRate: Math.round(students.reduce((acc, s) => acc + (s.coursesCompleted / Math.max(s.coursesEnrolled, 1)), 0) / students.length * 100)
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
            <h1 className="text-3xl font-bold text-gray-900">Manage Students</h1>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" icon={Download}>
              Export Data
            </Button>
            <Button variant="outline" icon={Mail}>
              Send Email
            </Button>
          </div>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeStudents}</p>
              </div>
              <div className="bg-secondary-100 p-3 rounded-full">
                <UserCheck className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.newThisMonth}</p>
              </div>
              <div className="bg-accent-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Completion</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgCompletionRate}%</p>
              </div>
              <div className="bg-success-100 p-3 rounded-full">
                <Award className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
              
              <Button variant="outline" icon={Filter}>
                More Filters
              </Button>
            </div>
          </div>

          {selectedStudents.length > 0 && (
            <div className="mt-4 p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-700">
                  {selectedStudents.length} student(s) selected
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Send Email
                  </Button>
                  <Button size="sm" variant="outline">
                    Export Selected
                  </Button>
                  <Button size="sm" variant="outline">
                    Bulk Actions
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Students Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleSelectStudent(student.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(student.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {student.coursesEnrolled} enrolled
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.coursesCompleted} completed
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        Level {student.level}
                      </div>
                      <div className="text-sm text-gray-500">
                        {student.totalXP.toLocaleString()} XP
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(student.joinDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(student.lastActive)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Eye}
                          onClick={() => handleViewStudent(student)}
                        >
                          View
                        </Button>
                        <Button variant="ghost" size="sm" icon={Edit}>
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" icon={MoreVertical} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <UserX className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </Card>

        {/* Student Details Modal */}
        <Modal
          isOpen={showStudentModal}
          onClose={() => setShowStudentModal(false)}
          title={selectedStudent ? `${selectedStudent.name} - Course Details` : 'Student Details'}
          maxWidth="xl"
        >
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Info */}
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{selectedStudent.name}</h3>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Level {selectedStudent.level}</span>
                    <span>{selectedStudent.totalXP.toLocaleString()} XP</span>
                    <span>{getStatusBadge(selectedStudent.status)}</span>
                  </div>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Enrolled Courses ({selectedStudent.enrolledCourses.length})
                </h4>
                
                {selectedStudent.enrolledCourses.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p>No courses enrolled</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedStudent.enrolledCourses.map((course) => (
                      <div key={course.courseId} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{course.courseName}</h5>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                              <span>Enrolled: {formatDate(course.enrolledDate)}</span>
                              <span>Last accessed: {formatDate(course.lastAccessed)}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getCourseStatusBadge(course.status)}
                            <Button
                              variant="outline"
                              size="sm"
                              icon={Ban}
                              onClick={() => handleUngrantCourse(course)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Remove Access
                            </Button>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                course.status === 'completed' ? 'bg-green-500' :
                                course.status === 'active' ? 'bg-blue-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Student Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{selectedStudent.coursesEnrolled}</div>
                  <div className="text-sm text-gray-600">Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedStudent.coursesCompleted}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedStudent.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedStudent.totalXP.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Total XP</div>
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Ungrant Course Confirmation Modal */}
        <Modal
          isOpen={showUngrantModal}
          onClose={() => setShowUngrantModal(false)}
          title="Remove Course Access"
          maxWidth="md"
        >
          {selectedCourseToUngrant && selectedStudent && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium mb-1">Warning: This action cannot be undone</p>
                    <p>Removing course access will prevent the student from accessing course materials and their progress will be preserved but inaccessible.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Student:</span>
                  <p className="text-gray-900">{selectedStudent.name} ({selectedStudent.email})</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Course:</span>
                  <p className="text-gray-900">{selectedCourseToUngrant.courseName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Current Progress:</span>
                  <p className="text-gray-900">{selectedCourseToUngrant.progress}% completed</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <div className="mt-1">{getCourseStatusBadge(selectedCourseToUngrant.status)}</div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowUngrantModal(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={confirmUngrantCourse}
                  disabled={isProcessing}
                  icon={isProcessing ? undefined : Ban}
                >
                  {isProcessing ? 'Removing Access...' : 'Remove Access'}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};