import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  BookOpen,
  Users,
  Star,
  DollarSign,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Upload,
  Settings,
  Copy,
  Archive,
  RotateCcw,
  FileEdit
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { mockCourses } from '../../data/mockData';
import { Course } from '../../types';

export const ManageCoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [courses, setCourses] = useState<Course[]>(mockCourses);

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'LKR',
    instructor: '',
    duration: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    category: '',
    thumbnail: '',
    isActive: true,
    tags: [] as string[],
  });

  const categories = ['all', 'Web Development', 'Programming', 'Marketing', 'Mobile Development', 'Data Science', 'Graphic Design'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && course.isActive) ||
                         (statusFilter === 'inactive' && !course.isActive);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCourses.length === filteredCourses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(filteredCourses.map(c => c.id));
    }
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setEditForm({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      currency: course.currency,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      category: course.category,
      thumbnail: course.thumbnail,
      isActive: course.isActive,
      tags: course.tags,
    });
    setShowEditModal(true);
  };

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const confirmDeleteCourse = async () => {
    if (!selectedCourse) return;

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Remove course from list
    setCourses(prev => prev.filter(course => course.id !== selectedCourse.id));
    
    setSuccessMessage(`Successfully deleted "${selectedCourse.title}"`);
    setIsProcessing(false);
    setShowDeleteModal(false);
    setSelectedCourse(null);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleSaveEdit = async () => {
    if (!selectedCourse) return;

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update course in list
    const updatedCourse = {
      ...selectedCourse,
      title: editForm.title,
      description: editForm.description,
      price: parseFloat(editForm.price) || 0,
      currency: editForm.currency,
      instructor: editForm.instructor,
      duration: editForm.duration,
      level: editForm.level,
      category: editForm.category,
      thumbnail: editForm.thumbnail,
      isActive: editForm.isActive,
      tags: editForm.tags,
      updatedAt: new Date(),
    };
    
    setCourses(prev => prev.map(course => 
      course.id === selectedCourse.id ? updatedCourse : course
    ));
    
    setSuccessMessage(`Successfully updated "${editForm.title}"`);
    setIsProcessing(false);
    setShowEditModal(false);
    setSelectedCourse(null);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleToggleStatus = async (course: Course) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update course status
    setCourses(prev => prev.map(c => 
      c.id === course.id ? { ...c, isActive: !c.isActive } : c
    ));
    
    setSuccessMessage(`Course "${course.title}" ${course.isActive ? 'deactivated' : 'activated'} successfully`);
    setIsProcessing(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDuplicateCourse = async (course: Course) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create duplicate course
    const duplicatedCourse = {
      ...course,
      id: `course_${Date.now()}`,
      title: `${course.title} (Copy)`,
      enrolledStudents: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setCourses(prev => [duplicatedCourse, ...prev]);
    
    setSuccessMessage(`Successfully duplicated "${course.title}"`);
    setIsProcessing(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Active</span>
    ) : (
      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Inactive</span>
    );
  };

  const stats = {
    totalCourses: courses.length,
    activeCourses: courses.filter(c => c.isActive).length,
    totalEnrollments: courses.reduce((acc, c) => acc + c.enrolledStudents.length, 0),
    avgRating: courses.reduce((acc, c) => acc + c.rating, 0) / courses.length,
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
            <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" icon={Download}>
              Export
            </Button>
            <Button variant="outline" icon={Upload}>
              Import
            </Button>
            <Link to="/admin/add-course">
              <Button icon={Plus}>
                Add Course
              </Button>
            </Link>
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
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeCourses}</p>
              </div>
              <div className="bg-secondary-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEnrollments}</p>
              </div>
              <div className="bg-accent-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p>
              </div>
              <div className="bg-warning-100 p-3 rounded-full">
                <Star className="w-6 h-6 text-warning-600" />
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
                  placeholder="Search courses by title, description, or instructor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              
              <Button variant="outline" icon={Filter}>
                More Filters
              </Button>
            </div>
          </div>

          {selectedCourses.length > 0 && (
            <div className="mt-4 p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-700">
                  {selectedCourses.length} course(s) selected
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Bulk Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    Export Selected
                  </Button>
                  <Button size="sm" variant="danger">
                    Delete Selected
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Courses Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCourses.length === filteredCourses.length && filteredCourses.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => handleSelectCourse(course.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-1">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.instructor}</div>
                          <div className="text-xs text-gray-400">{course.duration} • {course.level}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs font-medium">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatPrice(course.price, course.currency)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {course.enrolledStudents.length}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({course.totalRatings})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(course.isActive)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(course.updatedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Eye}
                          onClick={() => handleViewCourse(course)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          icon={Edit}
                          onClick={() => handleEditCourse(course)}
                        >
                          Edit
                        </Button>
                        <div className="relative group">
                          <Button variant="ghost" size="sm" icon={MoreVertical} />
                          <div className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <Link
                              to={`/admin/edit-course-content/${course.id}`}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <FileEdit className="w-4 h-4 mr-2" />
                              Edit Content
                            </Link>
                            <button
                              onClick={() => handleToggleStatus(course)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              {course.isActive ? <XCircle className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                              {course.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => handleDuplicateCourse(course)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicate
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or create a new course</p>
              <Link to="/admin/add-course" className="mt-4 inline-block">
                <Button icon={Plus}>
                  Add New Course
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Course Details Modal */}
        <Modal
          isOpen={showCourseModal}
          onClose={() => setShowCourseModal(false)}
          title={selectedCourse ? selectedCourse.title : 'Course Details'}
          maxWidth="xl"
        >
          {selectedCourse && (
            <div className="space-y-6">
              {/* Course Header */}
              <div className="flex items-start space-x-4">
                <img
                  src={selectedCourse.thumbnail}
                  alt={selectedCourse.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedCourse.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span>{selectedCourse.instructor}</span>
                    <span>{selectedCourse.duration}</span>
                    <span>{selectedCourse.level}</span>
                    {getStatusBadge(selectedCourse.isActive)}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{selectedCourse.rating}</span>
                      <span className="text-gray-500 ml-1">({selectedCourse.totalRatings} reviews)</span>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">
                      {formatPrice(selectedCourse.price, selectedCourse.currency)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{selectedCourse.description}</p>
              </div>

              {/* Course Tags */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{selectedCourse.enrolledStudents.length}</div>
                  <div className="text-sm text-gray-600">Enrolled Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedCourse.lessons.length}</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedCourse.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{formatDate(selectedCourse.createdAt)}</div>
                  <div className="text-sm text-gray-600">Created</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Link to={`/admin/edit-course-content/${selectedCourse.id}`}>
                  <Button
                    variant="outline"
                    icon={FileEdit}
                  >
                    Edit Content
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  icon={Edit}
                  onClick={() => {
                    setShowCourseModal(false);
                    handleEditCourse(selectedCourse);
                  }}
                >
                  Edit Course
                </Button>
                <Button
                  variant="outline"
                  icon={Copy}
                  onClick={() => {
                    setShowCourseModal(false);
                    handleDuplicateCourse(selectedCourse);
                  }}
                >
                  Duplicate
                </Button>
                <Button
                  variant={selectedCourse.isActive ? 'outline' : 'secondary'}
                  icon={selectedCourse.isActive ? XCircle : CheckCircle}
                  onClick={() => {
                    setShowCourseModal(false);
                    handleToggleStatus(selectedCourse);
                  }}
                >
                  {selectedCourse.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Edit Course Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title={selectedCourse ? `Edit ${selectedCourse.title}` : 'Edit Course'}
          maxWidth="xl"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructor *
                </label>
                <input
                  type="text"
                  value={editForm.instructor}
                  onChange={(e) => setEditForm(prev => ({ ...prev, instructor: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.filter(c => c !== 'all').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level *
                </label>
                <select
                  value={editForm.level}
                  onChange={(e) => setEditForm(prev => ({ ...prev, level: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  value={editForm.duration}
                  onChange={(e) => setEditForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 40 hours"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                value={editForm.thumbnail}
                onChange={(e) => setEditForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={editForm.isActive}
                onChange={(e) => setEditForm(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                Course is active and visible to students
              </label>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
                disabled={isProcessing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                disabled={isProcessing}
                icon={isProcessing ? undefined : Settings}
              >
                {isProcessing ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Course"
          maxWidth="md"
        >
          {selectedCourse && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium mb-1">Warning: This action cannot be undone</p>
                    <p>Deleting this course will permanently remove all course content, student enrollments, and progress data.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Course:</span>
                  <p className="text-gray-900">{selectedCourse.title}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Enrolled Students:</span>
                  <p className="text-gray-900">{selectedCourse.enrolledStudents.length} students</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Created:</span>
                  <p className="text-gray-900">{formatDate(selectedCourse.createdAt)}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={confirmDeleteCourse}
                  disabled={isProcessing}
                  icon={isProcessing ? undefined : Trash2}
                >
                  {isProcessing ? 'Deleting...' : 'Delete Course'}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};