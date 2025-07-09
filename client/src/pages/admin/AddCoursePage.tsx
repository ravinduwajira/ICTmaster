import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X, 
  Save, 
  Eye,
  BookOpen,
  DollarSign,
  Clock,
  Users,
  Tag,
  Star,
  Video,
  FileText,
  HelpCircle,
  Award,
  GripVertical,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  PlusCircle,
  Settings,
  CheckCircle,
  AlertCircle,
  Globe,
  Target,
  Zap,
  TrendingUp,
  Camera,
  Link as LinkIcon,
  Code2,
  Palette
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { RichTextEditor } from '../../components/editor/RichTextEditor';
import '../../components/editor/EditorStyles.css';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  duration: string;
  xpReward: number;
  order: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number;
  passingScore: number;
  xpReward: number;
}

interface CourseSection {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export const AddCoursePage: React.FC = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    description: '',
    detailedDescription: '',
    price: '',
    currency: 'LKR',
    instructor: '',
    duration: '',
    level: 'Beginner',
    category: '',
    thumbnail: '',
    previewVideo: '',
    tags: [] as string[],
    learningOutcomes: [] as string[],
    prerequisites: [] as string[],
    targetAudience: '',
    certificateOffered: true,
    language: 'English',
    estimatedHours: '',
  });

  const [sections, setSections] = useState<CourseSection[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [currentOutcome, setCurrentOutcome] = useState('');
  const [currentPrerequisite, setCurrentPrerequisite] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'advanced' | 'preview'>('basic');

  // Section modal states
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<CourseSection | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isEditingSection, setIsEditingSection] = useState(false);
  const [isEditingLesson, setIsEditingLesson] = useState(false);

  // Section form state
  const [sectionForm, setSectionForm] = useState({
    title: '',
    description: '',
    order: 1
  });

  // Lesson form state
  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    content: '',
    videoUrl: '',
    duration: '',
    xpReward: 50,
    order: 1
  });

  const categories = [
    'Web Development',
    'Programming',
    'Mobile Development',
    'Data Science',
    'Digital Marketing',
    'Graphic Design',
    'Cybersecurity',
    'Database Management',
    'Cloud Computing',
    'AI & Machine Learning',
    'UI/UX Design',
    'DevOps',
    'Game Development',
    'Blockchain',
    'IoT Development'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const languages = ['English', 'Sinhala', 'Tamil'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setCourseData(prev => ({ ...prev, [name]: checked }));
    } else {
      setCourseData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !courseData.tags.includes(currentTag.trim())) {
      setCourseData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCourseData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addLearningOutcome = () => {
    if (currentOutcome.trim() && !courseData.learningOutcomes.includes(currentOutcome.trim())) {
      setCourseData(prev => ({
        ...prev,
        learningOutcomes: [...prev.learningOutcomes, currentOutcome.trim()]
      }));
      setCurrentOutcome('');
    }
  };

  const removeLearningOutcome = (outcomeToRemove: string) => {
    setCourseData(prev => ({
      ...prev,
      learningOutcomes: prev.learningOutcomes.filter(outcome => outcome !== outcomeToRemove)
    }));
  };

  const addPrerequisite = () => {
    if (currentPrerequisite.trim() && !courseData.prerequisites.includes(currentPrerequisite.trim())) {
      setCourseData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, currentPrerequisite.trim()]
      }));
      setCurrentPrerequisite('');
    }
  };

  const removePrerequisite = (prerequisiteToRemove: string) => {
    setCourseData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter(prereq => prereq !== prerequisiteToRemove)
    }));
  };

  const handleAddSection = () => {
    setSectionForm({
      title: '',
      description: '',
      order: sections.length + 1
    });
    setSelectedSection(null);
    setIsEditingSection(false);
    setShowSectionModal(true);
  };

  const handleEditSection = (section: CourseSection) => {
    setSectionForm({
      title: section.title,
      description: section.description,
      order: section.order
    });
    setSelectedSection(section);
    setIsEditingSection(true);
    setShowSectionModal(true);
  };

  const handleSaveSection = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (selectedSection) {
      // Update existing section
      setSections(prev => prev.map(section => 
        section.id === selectedSection.id 
          ? { ...section, ...sectionForm }
          : section
      ));
      setSuccessMessage(`Section "${sectionForm.title}" updated successfully`);
    } else {
      // Add new section
      const newSection: CourseSection = {
        id: `section_${Date.now()}`,
        ...sectionForm,
        lessons: []
      };
      setSections(prev => [...prev, newSection]);
      setSuccessMessage(`Section "${sectionForm.title}" added successfully`);
    }
    
    setIsSaving(false);
    setShowSectionModal(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleAddLesson = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    setLessonForm({
      title: '',
      description: '',
      content: '',
      videoUrl: '',
      duration: '',
      xpReward: 50,
      order: section ? section.lessons.length + 1 : 1
    });
    setSelectedSection(section || null);
    setSelectedLesson(null);
    setIsEditingLesson(false);
    setShowLessonModal(true);
  };

  const handleEditLesson = (lesson: Lesson, sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    setLessonForm({
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      videoUrl: lesson.videoUrl || '',
      duration: lesson.duration,
      xpReward: lesson.xpReward,
      order: lesson.order
    });
    setSelectedSection(section || null);
    setSelectedLesson(lesson);
    setIsEditingLesson(true);
    setShowLessonModal(true);
  };

  const handleSaveLesson = async () => {
    if (!selectedSection) return;

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (selectedLesson) {
      // Update existing lesson
      setSections(prev => prev.map(section => 
        section.id === selectedSection.id 
          ? {
              ...section,
              lessons: section.lessons.map(lesson =>
                lesson.id === selectedLesson.id ? { ...lesson, ...lessonForm } : lesson
              )
            }
          : section
      ));
      setSuccessMessage(`Lesson "${lessonForm.title}" updated successfully`);
    } else {
      // Add new lesson
      const newLesson: Lesson = {
        id: `lesson_${Date.now()}`,
        ...lessonForm,
      };
      setSections(prev => prev.map(section => 
        section.id === selectedSection.id 
          ? { ...section, lessons: [...section.lessons, newLesson] }
          : section
      ));
      setSuccessMessage(`Lesson "${lessonForm.title}" added successfully`);
    }
    
    setIsSaving(false);
    setShowLessonModal(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDeleteSection = async () => {
    if (!selectedSection) return;

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSections(prev => prev.filter(section => section.id !== selectedSection.id));
    setSuccessMessage(`Section "${selectedSection.title}" deleted successfully`);
    setIsSaving(false);
    setShowDeleteModal(false);
    setSelectedSection(null);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const toggleSectionExpansion = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setSuccessMessage('Course saved as draft successfully!');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handlePublish = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setSuccessMessage('Course published successfully!');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const getTotalLessons = () => {
    return sections.reduce((total, section) => total + section.lessons.length, 0);
  };

  const getTotalDuration = () => {
    // Calculate total duration from all lessons
    let totalMinutes = 0;
    sections.forEach(section => {
      section.lessons.forEach(lesson => {
        const duration = lesson.duration.toLowerCase();
        if (duration.includes('hour')) {
          const hours = parseInt(duration) || 0;
          totalMinutes += hours * 60;
        } else if (duration.includes('min')) {
          const minutes = parseInt(duration) || 0;
          totalMinutes += minutes;
        }
      });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Preview Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                icon={ArrowLeft}
                onClick={() => setIsPreview(false)}
              >
                Back to Edit
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Course Preview</h1>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish} disabled={isSaving}>
                {isSaving ? 'Publishing...' : 'Publish Course'}
              </Button>
            </div>
          </div>

          {/* Course Preview */}
          <Card className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-medium">
                      {courseData.category}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {courseData.level}
                    </span>
                    {courseData.certificateOffered && (
                      <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded text-sm">
                        Certificate
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
                  {courseData.subtitle && (
                    <h2 className="text-xl text-gray-600 mb-4">{courseData.subtitle}</h2>
                  )}
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">{courseData.description}</p>
                  
                  {courseData.detailedDescription && (
                    <div className="prose prose-lg max-w-none mb-6">
                      <div dangerouslySetInnerHTML={{ __html: courseData.detailedDescription }} />
                    </div>
                  )}
                </div>

                {courseData.thumbnail && (
                  <div className="mb-6">
                    <img
                      src={courseData.thumbnail}
                      alt={courseData.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {courseData.learningOutcomes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {courseData.learningOutcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-secondary-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {courseData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {courseData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {sections.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Content</h3>
                    <div className="space-y-3">
                      {sections.sort((a, b) => a.order - b.order).map((section, sectionIndex) => (
                        <div key={section.id} className="border rounded-lg">
                          <div className="p-4 bg-gray-50 border-b">
                            <h4 className="font-medium text-gray-900">
                              Section {section.order}: {section.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                            <div className="text-xs text-gray-500 mt-2">
                              {section.lessons.length} lessons
                            </div>
                          </div>
                          <div className="p-4">
                            {section.lessons.sort((a, b) => a.order - b.order).map((lesson, lessonIndex) => (
                              <div key={lesson.id} className="flex items-center justify-between py-2">
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {lesson.order}. {lesson.title}
                                  </span>
                                  <p className="text-sm text-gray-600">{lesson.description}</p>
                                </div>
                                <div className="text-right text-sm text-gray-500">
                                  <div>{lesson.duration}</div>
                                  <div>{lesson.xpReward} XP</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Card className="p-6 sticky top-8">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {courseData.currency} {courseData.price ? Number(courseData.price).toLocaleString() : '0'}
                    </div>
                    <Button className="w-full" size="lg">
                      Enroll Now
                    </Button>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>Instructor</span>
                      </div>
                      <span className="font-medium">{courseData.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Duration</span>
                      </div>
                      <span className="font-medium">{getTotalDuration()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span>Lessons</span>
                      </div>
                      <span className="font-medium">{getTotalLessons()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-gray-400" />
                        <span>Level</span>
                      </div>
                      <span className="font-medium">{courseData.level}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-gray-400" />
                        <span>Language</span>
                      </div>
                      <span className="font-medium">{courseData.language}</span>
                    </div>
                    {courseData.certificateOffered && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-gray-400" />
                          <span>Certificate</span>
                        </div>
                        <span className="font-medium">Included</span>
                      </div>
                    )}
                  </div>

                  {courseData.prerequisites.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-medium text-gray-900 mb-3">Prerequisites</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {courseData.prerequisites.map((prereq, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              icon={Eye}
              onClick={() => setIsPreview(true)}
            >
              Preview
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Draft'}
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

        {/* Progress Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex">
            <button
              onClick={() => setActiveTab('basic')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-l-lg transition-colors
                ${activeTab === 'basic'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <Settings className="w-4 h-4 mr-2" />
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors
                ${activeTab === 'content'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Content & Structure
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors
                ${activeTab === 'advanced'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <Target className="w-4 h-4 mr-2" />
              Advanced Settings
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-r-lg transition-colors
                ${activeTab === 'preview'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview & Publish
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <>
              {/* Course Overview */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={courseData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter course title"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Subtitle
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={courseData.subtitle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="A compelling subtitle that describes your course"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Short Description *
                    </label>
                    <textarea
                      name="description"
                      value={courseData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Brief description that appears in course listings"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={courseData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level *
                    </label>
                    <select
                      name="level"
                      value={courseData.level}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Language *
                    </label>
                    <select
                      name="language"
                      value={courseData.language}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {languages.map(language => (
                        <option key={language} value={language}>{language}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instructor Name *
                    </label>
                    <input
                      type="text"
                      name="instructor"
                      value={courseData.instructor}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter instructor name"
                    />
                  </div>
                </div>
              </Card>

              {/* Detailed Description */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Detailed Course Description</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rich Course Description
                  </label>
                  <div className="border border-gray-300 rounded-lg">
                    <RichTextEditor
                      content={courseData.detailedDescription}
                      onChange={(content) => setCourseData(prev => ({ ...prev, detailedDescription: content }))}
                      placeholder="Create a comprehensive course description with formatting, images, videos, and interactive elements..."
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Use the rich text editor to create an engaging course description with multimedia content, formatting, and interactive elements.
                  </p>
                </div>
              </Card>

              {/* Pricing */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Pricing & Duration</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="number"
                        name="price"
                        value={courseData.price}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      name="currency"
                      value={courseData.currency}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="LKR">LKR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estimated Hours
                    </label>
                    <input
                      type="text"
                      name="estimatedHours"
                      value={courseData.estimatedHours}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="e.g., 40 hours"
                    />
                  </div>
                </div>
              </Card>

              {/* Media */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Course Thumbnail URL
                    </label>
                    <input
                      type="url"
                      name="thumbnail"
                      value={courseData.thumbnail}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                    {courseData.thumbnail && (
                      <div className="mt-4">
                        <img
                          src={courseData.thumbnail}
                          alt="Course thumbnail preview"
                          className="w-full max-w-sm h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview Video URL
                    </label>
                    <input
                      type="url"
                      name="previewVideo"
                      value={courseData.previewVideo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Optional promotional video for your course
                    </p>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Content & Structure Tab */}
          {activeTab === 'content' && (
            <>
              {/* Course Structure */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Course Structure</h3>
                  <Button onClick={handleAddSection} icon={Plus}>
                    Add Section
                  </Button>
                </div>
                
                {sections.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No sections added yet</p>
                    <p className="text-sm mb-4">Organize your course content into logical sections</p>
                    <Button onClick={handleAddSection} icon={Plus}>
                      Add First Section
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sections.sort((a, b) => a.order - b.order).map((section) => (
                      <div key={section.id} className="border rounded-lg">
                        {/* Section Header */}
                        <div className="p-4 bg-gray-50 border-b">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                                <button
                                  onClick={() => toggleSectionExpansion(section.id)}
                                  className="flex items-center space-x-2"
                                >
                                  {expandedSections.includes(section.id) ? (
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                  )}
                                </button>
                                <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-medium">
                                  Section {section.order}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{section.title}</h4>
                                <p className="text-sm text-gray-600">{section.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm text-gray-500">
                                {section.lessons.length} lessons
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={Plus}
                                onClick={() => handleAddLesson(section.id)}
                              >
                                Add Lesson
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={Edit}
                                onClick={() => handleEditSection(section)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                icon={Trash2}
                                onClick={() => {
                                  setSelectedSection(section);
                                  setShowDeleteModal(true);
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Section Lessons (Expandable) */}
                        {expandedSections.includes(section.id) && (
                          <div className="p-4">
                            {section.lessons.length === 0 ? (
                              <div className="text-center py-8 text-gray-500">
                                <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p className="text-sm mb-3">No lessons in this section yet</p>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  icon={Plus}
                                  onClick={() => handleAddLesson(section.id)}
                                >
                                  Add First Lesson
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {section.lessons.sort((a, b) => a.order - b.order).map((lesson) => (
                                  <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                      <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                                      <div>
                                        <h5 className="font-medium text-gray-900">
                                          {lesson.order}. {lesson.title}
                                        </h5>
                                        <p className="text-sm text-gray-600">{lesson.description}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div className="text-sm text-gray-500 flex items-center space-x-4">
                                        <span className="flex items-center">
                                          <Clock className="w-4 h-4 mr-1" />
                                          {lesson.duration}
                                        </span>
                                        <span className="flex items-center">
                                          <Award className="w-4 h-4 mr-1" />
                                          {lesson.xpReward} XP
                                        </span>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        icon={Edit}
                                        onClick={() => handleEditLesson(lesson, section.id)}
                                      >
                                        Edit
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              {/* Course Statistics */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">{sections.length}</div>
                    <div className="text-sm text-gray-600">Sections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-600">{getTotalLessons()}</div>
                    <div className="text-sm text-gray-600">Total Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent-600">{getTotalDuration()}</div>
                    <div className="text-sm text-gray-600">Total Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning-600">
                      {sections.reduce((total, section) => 
                        total + section.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.xpReward, 0), 0
                      )}
                    </div>
                    <div className="text-sm text-gray-600">Total XP</div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Advanced Settings Tab */}
          {activeTab === 'advanced' && (
            <>
              {/* Learning Outcomes */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Learning Outcomes</h3>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentOutcome}
                      onChange={(e) => setCurrentOutcome(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLearningOutcome())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="What will students learn? (e.g., Build responsive websites)"
                    />
                    <Button onClick={addLearningOutcome} icon={Plus}>
                      Add Outcome
                    </Button>
                  </div>
                  
                  {courseData.learningOutcomes.length > 0 && (
                    <div className="space-y-2">
                      {courseData.learningOutcomes.map((outcome, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-green-800">{outcome}</span>
                          </div>
                          <button
                            onClick={() => removeLearningOutcome(outcome)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>

              {/* Prerequisites */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Prerequisites</h3>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentPrerequisite}
                      onChange={(e) => setCurrentPrerequisite(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="What should students know beforehand? (e.g., Basic HTML knowledge)"
                    />
                    <Button onClick={addPrerequisite} icon={Plus}>
                      Add Prerequisite
                    </Button>
                  </div>
                  
                  {courseData.prerequisites.length > 0 && (
                    <div className="space-y-2">
                      {courseData.prerequisites.map((prerequisite, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                          <div className="flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-800">{prerequisite}</span>
                          </div>
                          <button
                            onClick={() => removePrerequisite(prerequisite)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>

              {/* Tags */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Tags</h3>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Add relevant tags (e.g., JavaScript, Frontend, Responsive)"
                    />
                    <Button onClick={addTag} icon={Plus}>
                      Add Tag
                    </Button>
                  </div>
                  
                  {courseData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {courseData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                        >
                          <span>{tag}</span>
                          <button
                            onClick={() => removeTag(tag)}
                            className="text-primary-500 hover:text-primary-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Card>

              {/* Additional Settings */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Additional Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <textarea
                      name="targetAudience"
                      value={courseData.targetAudience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Who is this course designed for?"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="certificateOffered"
                        name="certificateOffered"
                        checked={courseData.certificateOffered}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="certificateOffered" className="ml-2 text-sm text-gray-700">
                        Offer completion certificate
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Preview & Publish Tab */}
          {activeTab === 'preview' && (
            <>
              {/* Course Summary */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Course Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-primary-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600 mb-1">{sections.length}</div>
                    <div className="text-sm text-primary-700">Sections</div>
                  </div>
                  <div className="text-center p-4 bg-secondary-50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary-600 mb-1">{getTotalLessons()}</div>
                    <div className="text-sm text-secondary-700">Lessons</div>
                  </div>
                  <div className="text-center p-4 bg-accent-50 rounded-lg">
                    <div className="text-2xl font-bold text-accent-600 mb-1">{getTotalDuration()}</div>
                    <div className="text-sm text-accent-700">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-warning-50 rounded-lg">
                    <div className="text-2xl font-bold text-warning-600 mb-1">
                      {courseData.currency} {courseData.price ? Number(courseData.price).toLocaleString() : '0'}
                    </div>
                    <div className="text-sm text-warning-700">Price</div>
                  </div>
                </div>
              </Card>

              {/* Readiness Checklist */}
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Publishing Checklist</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${courseData.title ? 'text-green-600' : 'text-gray-300'}`} />
                    <span className={courseData.title ? 'text-gray-900' : 'text-gray-500'}>
                      Course title added
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${courseData.description ? 'text-green-600' : 'text-gray-300'}`} />
                    <span className={courseData.description ? 'text-gray-900' : 'text-gray-500'}>
                      Course description added
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${courseData.thumbnail ? 'text-green-600' : 'text-gray-300'}`} />
                    <span className={courseData.thumbnail ? 'text-gray-900' : 'text-gray-500'}>
                      Course thumbnail uploaded
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${sections.length > 0 ? 'text-green-600' : 'text-gray-300'}`} />
                    <span className={sections.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                      At least one section created
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${getTotalLessons() > 0 ? 'text-green-600' : 'text-gray-300'}`} />
                    <span className={getTotalLessons() > 0 ? 'text-gray-900' : 'text-gray-500'}>
                      At least one lesson created
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${courseData.price ? 'text-green-600' : 'text-gray-300'}`} />
                    <span className={courseData.price ? 'text-gray-900' : 'text-gray-500'}>
                      Course price set
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className={`w-5 h-5 ${courseData.learningOutcomes.length > 0 ? 'text-green-600' : 'text-gray-300'}`} />
                    <span className={courseData.learningOutcomes.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                      Learning outcomes defined
                    </span>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                  Save as Draft
                </Button>
                <Button 
                  onClick={() => setIsPreview(true)} 
                  variant="outline"
                  icon={Eye}
                >
                  Full Preview
                </Button>
                <Button onClick={handlePublish} disabled={isSaving}>
                  {isSaving ? 'Publishing...' : 'Publish Course'}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Add/Edit Section Modal */}
        <Modal
          isOpen={showSectionModal}
          onClose={() => setShowSectionModal(false)}
          title={isEditingSection ? 'Edit Section' : 'Add New Section'}
          maxWidth="md"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title *
              </label>
              <input
                type="text"
                value={sectionForm.title}
                onChange={(e) => setSectionForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter section title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description *
              </label>
              <textarea
                value={sectionForm.description}
                onChange={(e) => setSectionForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Brief description of this section"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Order *
              </label>
              <input
                type="number"
                value={sectionForm.order}
                onChange={(e) => setSectionForm(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min="1"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowSectionModal(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveSection}
                disabled={isSaving || !sectionForm.title || !sectionForm.description}
                icon={isSaving ? undefined : Save}
              >
                {isSaving ? 'Saving...' : 'Save Section'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Add/Edit Lesson Modal */}
        <Modal
          isOpen={showLessonModal}
          onClose={() => setShowLessonModal(false)}
          title={isEditingLesson ? 'Edit Lesson' : 'Add New Lesson'}
          maxWidth="6xl"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter lesson title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <input
                  type="text"
                  value={lessonForm.duration}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 15 minutes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  XP Reward *
                </label>
                <input
                  type="number"
                  value={lessonForm.xpReward}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, xpReward: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lesson Order *
                </label>
                <input
                  type="number"
                  value={lessonForm.order}
                  onChange={(e) => setLessonForm(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={lessonForm.description}
                onChange={(e) => setLessonForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Brief description of the lesson"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (Optional)
              </label>
              <input
                type="url"
                value={lessonForm.videoUrl}
                onChange={(e) => setLessonForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Content *
              </label>
              <div className="border border-gray-300 rounded-lg">
                <RichTextEditor
                  content={lessonForm.content}
                  onChange={(content) => setLessonForm(prev => ({ ...prev, content }))}
                  placeholder="Create engaging lesson content with rich formatting, images, videos, quizzes, and interactive elements..."
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Use the rich text editor to create professional lesson content with multimedia, interactive quizzes, callouts, and more.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowLessonModal(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveLesson}
                disabled={isSaving || !lessonForm.title || !lessonForm.description}
                icon={isSaving ? undefined : Save}
              >
                {isSaving ? 'Saving...' : 'Save Lesson'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Section"
          maxWidth="md"
        >
          {selectedSection && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium mb-1">Warning: This action cannot be undone</p>
                    <p>Deleting this section will permanently remove all lessons and content within it.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Section:</span>
                  <p className="text-gray-900">{selectedSection.title}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Lessons:</span>
                  <p className="text-gray-900">{selectedSection.lessons.length} lessons will be deleted</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteSection}
                  disabled={isSaving}
                  icon={isSaving ? undefined : Trash2}
                >
                  {isSaving ? 'Deleting...' : 'Delete Section'}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};