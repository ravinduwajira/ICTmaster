import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Grid, 
  List,
  Eye,
  Edit,
  Users,
  Star,
  Clock,
  BookOpen,
  Play,
  FileText,
  Award,
  ChevronDown,
  ChevronRight,
  Video,
  HelpCircle,
  Settings,
  BarChart3,
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  CheckCircle,
  PlayCircle,
  Download,
  ExternalLink
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { mockCourses } from '../../data/mockData';
import { Course } from '../../types';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: string;
  xpReward: number;
  order: number;
  completed?: boolean;
}

export const AdminCoursesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCoursePreview, setShowCoursePreview] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLessonPreview, setShowLessonPreview] = useState(false);

  const categories = ['all', 'Web Development', 'Programming', 'Marketing', 'Mobile Development'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  // Mock course content structure
  const getCourseContent = (courseId: string) => {
    const sections = [
      {
        id: '1',
        title: 'Getting Started',
        description: 'Introduction to the course and setup',
        lessons: [
          {
            id: '1',
            title: 'Welcome to the Course',
            description: 'Course overview and what you\'ll learn',
            content: `
              <h1>Welcome to Web Development!</h1>
              <p>In this comprehensive course, you'll learn everything you need to know about modern web development.</p>
              
              <div class="callout callout-info" data-callout-type="info">
                <div class="callout-header">
                  <span class="callout-icon">💡</span>
                  <span class="callout-title">Course Overview</span>
                </div>
                <div class="callout-content">
                  <p>This course covers HTML, CSS, JavaScript, React, and Node.js. By the end, you'll be able to build full-stack web applications.</p>
                </div>
              </div>

              <h2>What You'll Learn</h2>
              <ul>
                <li>HTML5 semantic markup</li>
                <li>CSS3 styling and animations</li>
                <li>JavaScript ES6+ features</li>
                <li>React component development</li>
                <li>Node.js backend development</li>
              </ul>
            `,
            videoUrl: 'https://youtube.com/watch?v=example1',
            duration: '15 minutes',
            xpReward: 50,
            order: 1,
            completed: false
          },
          {
            id: '2',
            title: 'Setting Up Your Development Environment',
            description: 'Install and configure necessary tools',
            content: `
              <h1>Development Environment Setup</h1>
              <p>Let's get your computer ready for web development!</p>

              <div class="callout callout-warning" data-callout-type="warning">
                <div class="callout-header">
                  <span class="callout-icon">⚠️</span>
                  <span class="callout-title">Important</span>
                </div>
                <div class="callout-content">
                  <p>Make sure you have administrator access on your computer before proceeding with the installations.</p>
                </div>
              </div>

              <h2>Required Software</h2>
              <ol>
                <li>Visual Studio Code</li>
                <li>Node.js (Latest LTS version)</li>
                <li>Git version control</li>
                <li>Chrome browser with DevTools</li>
              </ol>
            `,
            videoUrl: 'https://youtube.com/watch?v=example2',
            duration: '20 minutes',
            xpReward: 75,
            order: 2,
            completed: false
          }
        ]
      },
      {
        id: '2',
        title: 'HTML Fundamentals',
        description: 'Learn the building blocks of web pages',
        lessons: [
          {
            id: '3',
            title: 'HTML Structure and Syntax',
            description: 'Understanding HTML document structure',
            content: `
              <h1>HTML Fundamentals</h1>
              <p>HTML (HyperText Markup Language) is the foundation of web development.</p>

              <h2>Basic HTML Structure</h2>
              <pre><code><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>
<body>
    <h1>Hello World!</h1>
</body>
</html></code></pre>

              <div class="quiz-block" data-quiz-id="html_quiz_1">
                <div class="quiz-header">
                  <h4>📝 Quick Check</h4>
                </div>
                <div class="quiz-question">
                  <p><strong>What does HTML stand for?</strong></p>
                </div>
                <div class="quiz-options">
                  <div class="quiz-option correct">
                    <span class="option-letter">A.</span>
                    <span class="option-text">HyperText Markup Language</span>
                    <span class="correct-indicator">✓</span>
                  </div>
                  <div class="quiz-option">
                    <span class="option-letter">B.</span>
                    <span class="option-text">High Tech Modern Language</span>
                  </div>
                  <div class="quiz-option">
                    <span class="option-letter">C.</span>
                    <span class="option-text">Home Tool Markup Language</span>
                  </div>
                  <div class="quiz-option">
                    <span class="option-letter">D.</span>
                    <span class="option-text">Hyperlink and Text Markup Language</span>
                  </div>
                </div>
                <div class="quiz-explanation">
                  <p><strong>Explanation:</strong> HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages.</p>
                </div>
              </div>
            `,
            videoUrl: 'https://youtube.com/watch?v=example3',
            duration: '25 minutes',
            xpReward: 100,
            order: 3,
            completed: false
          }
        ]
      },
      {
        id: '3',
        title: 'CSS Styling',
        description: 'Make your websites beautiful with CSS',
        lessons: [
          {
            id: '4',
            title: 'CSS Basics and Selectors',
            description: 'Learn how to style HTML elements',
            content: `
              <h1>CSS Styling Basics</h1>
              <p>CSS (Cascading Style Sheets) is used to style and layout web pages.</p>

              <div class="callout callout-tip" data-callout-type="tip">
                <div class="callout-header">
                  <span class="callout-icon">💡</span>
                  <span class="callout-title">Pro Tip</span>
                </div>
                <div class="callout-content">
                  <p>Always use external CSS files to keep your HTML clean and maintainable.</p>
                </div>
              </div>

              <h2>CSS Syntax</h2>
              <pre><code>selector {
    property: value;
    property: value;
}</code></pre>

              <h2>Common CSS Properties</h2>
              <ul>
                <li><code>color</code> - Text color</li>
                <li><code>background-color</code> - Background color</li>
                <li><code>font-size</code> - Text size</li>
                <li><code>margin</code> - Outer spacing</li>
                <li><code>padding</code> - Inner spacing</li>
              </ul>
            `,
            videoUrl: 'https://youtube.com/watch?v=example4',
            duration: '30 minutes',
            xpReward: 100,
            order: 4,
            completed: false
          }
        ]
      }
    ];
    return sections;
  };

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowCoursePreview(true);
    setExpandedSections(['1']); // Expand first section by default
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleViewLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowLessonPreview(true);
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCourseStats = (course: Course) => {
    const sections = getCourseContent(course.id);
    const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0);
    const totalDuration = sections.reduce((acc, section) => 
      acc + section.lessons.reduce((lessonAcc, lesson) => {
        const minutes = parseInt(lesson.duration.split(' ')[0]) || 0;
        return lessonAcc + minutes;
      }, 0), 0
    );
    
    return {
      sections: sections.length,
      lessons: totalLessons,
      duration: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`,
      enrollments: course.enrolledStudents.length
    };
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
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
              <p className="text-gray-600">View and manage course content as students see it</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link to="/admin/add-course">
              <Button icon={Settings}>
                Add New Course
              </Button>
            </Link>
            <Link to="/admin/manage-courses">
              <Button variant="outline" icon={Edit}>
                Manage Courses
              </Button>
            </Link>
          </div>
        </div>

        {/* Course Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900">{mockCourses.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{mockCourses.filter(c => c.isActive).length}</p>
              </div>
              <div className="bg-secondary-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCourses.reduce((acc, c) => acc + c.enrolledStudents.length, 0)}
                </p>
              </div>
              <div className="bg-accent-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(mockCourses.reduce((acc, c) => acc + c.rating, 0) / mockCourses.length).toFixed(1)}
                </p>
              </div>
              <div className="bg-warning-100 p-3 rounded-full">
                <Star className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                icon={Grid}
                onClick={() => setViewMode('grid')}
              />
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="sm"
                icon={List}
                onClick={() => setViewMode('list')}
              />
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {mockCourses.length} courses
          </p>
        </div>

        {/* Courses Grid/List */}
        {filteredCourses.length === 0 ? (
          <Card className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </Card>
        ) : (
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-6'
            }
          `}>
            {filteredCourses.map((course) => {
              const stats = getCourseStats(course);
              
              return (
                <Card key={course.id} hover className="h-full flex flex-col">
                  {/* Course Image */}
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="absolute top-3 right-3 bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {course.level}
                    </div>
                    <div className="absolute top-3 left-3">
                      {course.isActive ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-primary-600 font-medium">{course.category}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{course.rating}</span>
                        <span className="text-sm text-gray-500">({course.totalRatings})</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                      {course.description}
                    </p>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {stats.sections} sections
                      </div>
                      <div className="flex items-center">
                        <PlayCircle className="w-4 h-4 mr-1" />
                        {stats.lessons} lessons
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {stats.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {stats.enrollments} students
                      </div>
                    </div>

                    {/* Course Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>By {course.instructor}</span>
                      <span>Updated {formatDate(course.updatedAt)}</span>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatPrice(course.price, course.currency)}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Eye}
                          onClick={() => handleViewCourse(course)}
                        >
                          Preview
                        </Button>
                        <Link to={`/admin/edit-course-content/${course.id}`}>
                          <Button size="sm" icon={Edit}>
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Course Preview Modal */}
        <Modal
          isOpen={showCoursePreview}
          onClose={() => setShowCoursePreview(false)}
          title={selectedCourse ? `Preview: ${selectedCourse.title}` : 'Course Preview'}
          maxWidth="6xl"
        >
          {selectedCourse && (
            <div className="space-y-6">
              {/* Course Header */}
              <div className="flex items-start space-x-6">
                <img
                  src={selectedCourse.thumbnail}
                  alt={selectedCourse.title}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-medium">
                      {selectedCourse.category}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {selectedCourse.level}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {selectedCourse.instructor}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      {selectedCourse.rating} ({selectedCourse.totalRatings} reviews)
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedCourse.duration}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {formatPrice(selectedCourse.price, selectedCourse.currency)}
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/admin/edit-course-content/${selectedCourse.id}`}>
                      <Button size="sm" icon={Edit}>
                        Edit Course
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" icon={BarChart3}>
                      Analytics
                    </Button>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Content</h3>
                <div className="space-y-4">
                  {getCourseContent(selectedCourse.id).map((section, sectionIndex) => (
                    <div key={section.id} className="border rounded-lg">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {expandedSections.includes(section.id) ? (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-500" />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Section {sectionIndex + 1}: {section.title}
                            </h4>
                            <p className="text-sm text-gray-600">{section.description}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {section.lessons.length} lesson{section.lessons.length !== 1 ? 's' : ''}
                        </div>
                      </button>

                      {expandedSections.includes(section.id) && (
                        <div className="border-t bg-gray-50">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-white transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-primary-600">
                                    {lessonIndex + 1}
                                  </span>
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900">{lesson.title}</h5>
                                  <p className="text-sm text-gray-600">{lesson.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-sm text-gray-500 flex items-center space-x-3">
                                  {lesson.videoUrl && (
                                    <div className="flex items-center">
                                      <Video className="w-4 h-4 mr-1" />
                                      Video
                                    </div>
                                  )}
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {lesson.duration}
                                  </div>
                                  <div className="flex items-center">
                                    <Award className="w-4 h-4 mr-1" />
                                    {lesson.xpReward} XP
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  icon={Eye}
                                  onClick={() => handleViewLesson(lesson)}
                                >
                                  Preview
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
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
            </div>
          )}
        </Modal>

        {/* Lesson Preview Modal */}
        <Modal
          isOpen={showLessonPreview}
          onClose={() => setShowLessonPreview(false)}
          title={selectedLesson ? `Lesson: ${selectedLesson.title}` : 'Lesson Preview'}
          maxWidth="4xl"
        >
          {selectedLesson && (
            <div className="space-y-6">
              {/* Lesson Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedLesson.title}</h2>
                  <p className="text-gray-600 mb-4">{selectedLesson.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedLesson.duration}
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {selectedLesson.xpReward} XP
                    </div>
                    {selectedLesson.videoUrl && (
                      <div className="flex items-center">
                        <Video className="w-4 h-4 mr-1" />
                        Video included
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="outline" icon={ExternalLink}>
                  Open in Editor
                </Button>
              </div>

              {/* Video Player */}
              {selectedLesson.videoUrl && (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Video Player</p>
                  <p className="text-sm text-gray-500">{selectedLesson.videoUrl}</p>
                  <Button variant="outline" size="sm" icon={PlayCircle} className="mt-4">
                    Play Video
                  </Button>
                </div>
              )}

              {/* Lesson Content */}
              <div className="border rounded-lg p-6 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lesson Content</h3>
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
                />
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};