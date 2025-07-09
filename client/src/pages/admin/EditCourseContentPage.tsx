import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye, 
  Video, 
  FileText, 
  HelpCircle, 
  Upload, 
  Download, 
  Move, 
  Copy, 
  Clock, 
  Award, 
  BookOpen, 
  Settings, 
  X, 
  Check, 
  AlertCircle, 
  PlayCircle, 
  PlusCircle, 
  GripVertical,
  ChevronDown,
  ChevronRight,
  Code2
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { RichTextEditor } from '../../components/editor/RichTextEditor';
import { mockCourses } from '../../data/mockData';
import '../../components/editor/EditorStyles.css';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  attachments: Attachment[];
  quiz?: Quiz;
  xpReward: number;
  order: number;
  duration: string;
  completed?: boolean;
}

interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'image' | 'video' | 'document';
  size: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  timeLimit?: number;
  passingScore: number;
  xpReward: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const EditCourseContentPage: React.FC = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(() => mockCourses.find(c => c.id === courseId));
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Introduction to Web Development',
      description: 'Learn the basics of web development and what you\'ll build in this course',
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

        <div class="quiz-block" data-quiz-id="intro_quiz_1">
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

        <h2>Course Structure</h2>
        <p>The course is divided into several modules, each building upon the previous one:</p>
        
        <div class="callout callout-tip" data-callout-type="tip">
          <div class="callout-header">
            <span class="callout-icon">💡</span>
            <span class="callout-title">Pro Tip</span>
          </div>
          <div class="callout-content">
            <p>Practice coding along with each lesson. The best way to learn programming is by doing!</p>
          </div>
        </div>
      `,
      videoUrl: 'https://youtube.com/watch?v=example1',
      attachments: [
        { id: '1', name: 'Course Outline.pdf', url: '#', type: 'pdf', size: '2.5 MB' },
        { id: '2', name: 'Setup Guide.pdf', url: '#', type: 'pdf', size: '1.2 MB' }
      ],
      xpReward: 50,
      order: 1,
      duration: '15 minutes'
    },
    {
      id: '2',
      title: 'HTML Fundamentals',
      description: 'Master HTML tags, elements, and document structure',
      content: `
        <h1>HTML Fundamentals</h1>
        <p>HTML (HyperText Markup Language) is the foundation of web development. Let's explore its core concepts.</p>

        <h2>Basic HTML Structure</h2>
        <p>Every HTML document follows a basic structure:</p>

        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello World!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>

        <div class="callout callout-note" data-callout-type="note">
          <div class="callout-header">
            <span class="callout-icon">📝</span>
            <span class="callout-title">Important</span>
          </div>
          <div class="callout-content">
            <p>Always include the DOCTYPE declaration at the beginning of your HTML documents to ensure proper rendering.</p>
          </div>
        </div>

        <h2>Common HTML Elements</h2>
        <ul>
          <li><strong>Headings:</strong> &lt;h1&gt; to &lt;h6&gt;</li>
          <li><strong>Paragraphs:</strong> &lt;p&gt;</li>
          <li><strong>Links:</strong> &lt;a href="..."&gt;</li>
          <li><strong>Images:</strong> &lt;img src="..." alt="..."&gt;</li>
          <li><strong>Lists:</strong> &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</li>
        </ul>

        <div class="pdf-embed" data-pdf-url="/assets/html-reference.pdf">
          <div class="pdf-preview">
            <div class="pdf-icon">📄</div>
            <div class="pdf-info">
              <h4>HTML Reference Guide</h4>
              <p>Complete reference of HTML elements and attributes</p>
              <a href="/assets/html-reference.pdf" target="_blank" class="pdf-link">Open PDF</a>
            </div>
          </div>
        </div>
      `,
      videoUrl: 'https://youtube.com/watch?v=example2',
      attachments: [
        { id: '3', name: 'HTML Cheat Sheet.pdf', url: '#', type: 'pdf', size: '800 KB' }
      ],
      quiz: {
        id: '1',
        title: 'HTML Basics Quiz',
        questions: [
          {
            id: '1',
            question: 'What does HTML stand for?',
            options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
            correctAnswer: 0,
            explanation: 'HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages.'
          }
        ],
        timeLimit: 10,
        passingScore: 80,
        xpReward: 25
      },
      xpReward: 75,
      order: 2,
      duration: '25 minutes'
    },
    {
      id: '3',
      title: 'CSS Styling Basics',
      description: 'Learn how to style your HTML with CSS',
      content: `
        <h1>CSS Styling Basics</h1>
        <p>CSS (Cascading Style Sheets) is used to style and layout web pages. Let's explore how to make your HTML look amazing!</p>

        <div class="callout callout-warning" data-callout-type="warning">
          <div class="callout-header">
            <span class="callout-icon">⚠️</span>
            <span class="callout-title">Before You Start</span>
          </div>
          <div class="callout-content">
            <p>Make sure you have completed the HTML Fundamentals lesson before proceeding with CSS.</p>
          </div>
        </div>

        <h2>CSS Syntax</h2>
        <p>CSS rules consist of a selector and a declaration block:</p>

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

        <div class="callout callout-success" data-callout-type="success">
          <div class="callout-header">
            <span class="callout-icon">✅</span>
            <span class="callout-title">Best Practice</span>
          </div>
          <div class="callout-content">
            <p>Use external CSS files to keep your HTML clean and maintainable. Link them using the &lt;link&gt; tag in the &lt;head&gt; section.</p>
          </div>
        </div>
      `,
      videoUrl: 'https://youtube.com/watch?v=example3',
      attachments: [],
      xpReward: 75,
      order: 3,
      duration: '30 minutes'
    }
  ]);

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedLessons, setExpandedLessons] = useState<string[]>(['1']);

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

  // Quiz form state
  const [quizForm, setQuizForm] = useState({
    title: '',
    timeLimit: 10,
    passingScore: 80,
    xpReward: 25,
    questions: [] as QuizQuestion[]
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: ''
  });

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist.</p>
          <Link to="/admin/manage-courses">
            <Button icon={ArrowLeft}>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddLesson = () => {
    setLessonForm({
      title: '',
      description: '',
      content: '',
      videoUrl: '',
      duration: '',
      xpReward: 50,
      order: lessons.length + 1
    });
    setSelectedLesson(null);
    setIsEditing(true);
    setShowLessonModal(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setLessonForm({
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      videoUrl: lesson.videoUrl || '',
      duration: lesson.duration,
      xpReward: lesson.xpReward,
      order: lesson.order
    });
    setSelectedLesson(lesson);
    setIsEditing(true);
    setShowLessonModal(true);
  };

  const handleSaveLesson = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (selectedLesson) {
      // Update existing lesson
      setLessons(prev => prev.map(lesson => 
        lesson.id === selectedLesson.id 
          ? { ...lesson, ...lessonForm }
          : lesson
      ));
      setSuccessMessage(`Lesson "${lessonForm.title}" updated successfully`);
    } else {
      // Add new lesson
      const newLesson: Lesson = {
        id: `lesson_${Date.now()}`,
        ...lessonForm,
        attachments: [],
        completed: false
      };
      setLessons(prev => [...prev, newLesson]);
      setSuccessMessage(`Lesson "${lessonForm.title}" added successfully`);
    }
    
    setIsSaving(false);
    setShowLessonModal(false);
    setIsEditing(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleDeleteLesson = async () => {
    if (!selectedLesson) return;

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLessons(prev => prev.filter(lesson => lesson.id !== selectedLesson.id));
    setSuccessMessage(`Lesson "${selectedLesson.title}" deleted successfully`);
    setIsSaving(false);
    setShowDeleteModal(false);
    setSelectedLesson(null);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleAddQuizQuestion = () => {
    if (!currentQuestion.question.trim() || currentQuestion.options.some(opt => !opt.trim())) {
      return;
    }

    const newQuestion: QuizQuestion = {
      id: `question_${Date.now()}`,
      ...currentQuestion
    };

    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    setCurrentQuestion({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    });
  };

  const handleSaveQuiz = async () => {
    if (!selectedLesson) return;

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updatedQuiz: Quiz = {
      id: selectedLesson.quiz?.id || `quiz_${Date.now()}`,
      ...quizForm
    };

    setLessons(prev => prev.map(lesson => 
      lesson.id === selectedLesson.id 
        ? { ...lesson, quiz: updatedQuiz }
        : lesson
    ));

    setSuccessMessage(`Quiz for "${selectedLesson.title}" saved successfully`);
    setIsSaving(false);
    setShowQuizModal(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const toggleLessonExpansion = (lessonId: string) => {
    setExpandedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-red-500" />;
      case 'video':
        return <Video className="w-4 h-4 text-blue-500" />;
      case 'image':
        return <FileText className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/admin/manage-courses">
              <Button variant="outline" icon={ArrowLeft}>
                Back to Courses
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Course Content</h1>
              <p className="text-gray-600">{course.title}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" icon={Eye}>
              Preview Course
            </Button>
            <Button icon={Plus} onClick={handleAddLesson}>
              Add Lesson
            </Button>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-800">{successMessage}</span>
            </div>
          </div>
        )}

        {/* Course Overview */}
        <Card className="mb-8">
          <div className="flex items-start space-x-6">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-32 h-32 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{lessons.length}</div>
                  <div className="text-sm text-gray-600">Lessons</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary-600">{course.enrolledStudents.length}</div>
                  <div className="text-sm text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600">{course.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning-600">{course.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Lessons List */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Course Lessons</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" icon={Download}>
                Export Content
              </Button>
              <Button variant="outline" size="sm" icon={Upload}>
                Import Content
              </Button>
            </div>
          </div>

          {lessons.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No lessons yet</h4>
              <p className="text-gray-600 mb-4">Start building your course by adding the first lesson</p>
              <Button icon={Plus} onClick={handleAddLesson}>
                Add First Lesson
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {lessons.sort((a, b) => a.order - b.order).map((lesson, index) => (
                <div key={lesson.id} className="border rounded-lg">
                  {/* Lesson Header */}
                  <div className="p-4 bg-gray-50 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                          <button
                            onClick={() => toggleLessonExpansion(lesson.id)}
                            className="flex items-center space-x-2"
                          >
                            {expandedLessons.includes(lesson.id) ? (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-medium">
                            Lesson {lesson.order}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{lesson.title}</h4>
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
                          onClick={() => handleEditLesson(lesson)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          onClick={() => {
                            setSelectedLesson(lesson);
                            setShowDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-700"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Lesson Details (Expandable) */}
                  {expandedLessons.includes(lesson.id) && (
                    <div className="p-4 space-y-4">
                      {/* Video */}
                      {lesson.videoUrl && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                            <Video className="w-4 h-4 mr-2" />
                            Video Content
                          </h5>
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{lesson.videoUrl}</span>
                              <Button variant="ghost" size="sm" icon={PlayCircle}>
                                Preview
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Rich Content Preview */}
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2 flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          Lesson Content
                        </h5>
                        <div className="bg-gray-100 rounded-lg p-4 max-h-96 overflow-y-auto">
                          <div 
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: lesson.content }}
                          />
                        </div>
                      </div>

                      {/* Attachments */}
                      {lesson.attachments.length > 0 && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Attachments</h5>
                          <div className="space-y-2">
                            {lesson.attachments.map((attachment) => (
                              <div key={attachment.id} className="flex items-center justify-between bg-gray-100 rounded-lg p-3">
                                <div className="flex items-center space-x-3">
                                  {getAttachmentIcon(attachment.type)}
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                                    <p className="text-xs text-gray-500">{attachment.size}</p>
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm" icon={Download}>
                                    Download
                                  </Button>
                                  <Button variant="ghost" size="sm" icon={Trash2} className="text-red-600">
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quiz */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900 flex items-center">
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Quiz
                          </h5>
                          <Button
                            variant="outline"
                            size="sm"
                            icon={lesson.quiz ? Edit : Plus}
                            onClick={() => {
                              setSelectedLesson(lesson);
                              if (lesson.quiz) {
                                setQuizForm({
                                  title: lesson.quiz.title,
                                  timeLimit: lesson.quiz.timeLimit || 10,
                                  passingScore: lesson.quiz.passingScore,
                                  xpReward: lesson.quiz.xpReward,
                                  questions: lesson.quiz.questions
                                });
                              } else {
                                setQuizForm({
                                  title: `${lesson.title} Quiz`,
                                  timeLimit: 10,
                                  passingScore: 80,
                                  xpReward: 25,
                                  questions: []
                                });
                              }
                              setShowQuizModal(true);
                            }}
                          >
                            {lesson.quiz ? 'Edit Quiz' : 'Add Quiz'}
                          </Button>
                        </div>
                        {lesson.quiz ? (
                          <div className="bg-blue-50 rounded-lg p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-blue-900">{lesson.quiz.title}</p>
                                <p className="text-xs text-blue-700">
                                  {lesson.quiz.questions.length} questions • {lesson.quiz.timeLimit} min • {lesson.quiz.passingScore}% to pass
                                </p>
                              </div>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                {lesson.quiz.xpReward} XP
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-100 rounded-lg p-3 text-center">
                            <p className="text-sm text-gray-600">No quiz added yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Add/Edit Lesson Modal */}
        <Modal
          isOpen={showLessonModal}
          onClose={() => setShowLessonModal(false)}
          title={selectedLesson ? 'Edit Lesson' : 'Add New Lesson'}
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
                Video URL
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
                  placeholder="Write your lesson content here. Use the toolbar to format text, add images, videos, quizzes, and more..."
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Use the rich text editor to create engaging lesson content with formatting, media, quizzes, and callouts.
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

        {/* Quiz Modal */}
        <Modal
          isOpen={showQuizModal}
          onClose={() => setShowQuizModal(false)}
          title={selectedLesson ? `Quiz for ${selectedLesson.title}` : 'Add Quiz'}
          maxWidth="xl"
        >
          <div className="space-y-6">
            {/* Quiz Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  value={quizForm.title}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time Limit (minutes)
                </label>
                <input
                  type="number"
                  value={quizForm.timeLimit}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 10 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passing Score (%)
                </label>
                <input
                  type="number"
                  value={quizForm.passingScore}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, passingScore: parseInt(e.target.value) || 80 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            {/* Add Question Form */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-4">Add Question</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question *
                  </label>
                  <textarea
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your question here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Answer Options *
                  </label>
                  <div className="space-y-2">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={currentQuestion.correctAnswer === index}
                          onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="font-medium text-gray-700 w-6">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...currentQuestion.options];
                            newOptions[index] = e.target.value;
                            setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Select the radio button next to the correct answer
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Explanation (Optional)
                  </label>
                  <textarea
                    value={currentQuestion.explanation}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Explain why this is the correct answer..."
                  />
                </div>

                <Button
                  onClick={handleAddQuizQuestion}
                  disabled={!currentQuestion.question.trim() || currentQuestion.options.some(opt => !opt.trim())}
                  icon={PlusCircle}
                  size="sm"
                >
                  Add Question
                </Button>
              </div>
            </div>

            {/* Questions List */}
            {quizForm.questions.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Questions ({quizForm.questions.length})
                </h4>
                <div className="space-y-3">
                  {quizForm.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-gray-900">
                          {index + 1}. {question.question}
                        </h5>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          onClick={() => {
                            setQuizForm(prev => ({
                              ...prev,
                              questions: prev.questions.filter(q => q.id !== question.id)
                            }));
                          }}
                          className="text-red-600"
                        />
                      </div>
                      <div className="space-y-1">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`text-sm p-2 rounded ${
                              optionIndex === question.correctAnswer
                                ? 'bg-green-50 text-green-800 font-medium'
                                : 'text-gray-600'
                            }`}
                          >
                            {String.fromCharCode(65 + optionIndex)}. {option}
                            {optionIndex === question.correctAnswer && (
                              <span className="ml-2 text-green-600">✓ Correct</span>
                            )}
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowQuizModal(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveQuiz}
                disabled={isSaving || !quizForm.title || quizForm.questions.length === 0}
                icon={isSaving ? undefined : Save}
              >
                {isSaving ? 'Saving...' : 'Save Quiz'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Lesson"
          maxWidth="md"
        >
          {selectedLesson && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium mb-1">Warning: This action cannot be undone</p>
                    <p>Deleting this lesson will permanently remove all lesson content, videos, attachments, and quiz data.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Lesson:</span>
                  <p className="text-gray-900">{selectedLesson.title}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Order:</span>
                  <p className="text-gray-900">Lesson {selectedLesson.order}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Duration:</span>
                  <p className="text-gray-900">{selectedLesson.duration}</p>
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
                  onClick={handleDeleteLesson}
                  disabled={isSaving}
                  icon={isSaving ? undefined : Trash2}
                >
                  {isSaving ? 'Deleting...' : 'Delete Lesson'}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};