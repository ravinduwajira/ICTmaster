import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Save, 
  Eye,
  FileText,
  Clock,
  Award,
  HelpCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  marks: number;
}

export const AddPracticePaperPage: React.FC = () => {
  const [paperData, setPaperData] = useState({
    title: '',
    type: 'past-paper' as 'past-paper' | 'model-paper',
    subject: 'ICT',
    year: new Date().getFullYear(),
    duration: 180,
    totalMarks: 0,
    instructions: '',
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const subjects = ['ICT', 'Mathematics', 'Science', 'English', 'Sinhala', 'Tamil'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaperData(prev => ({ 
      ...prev, 
      [name]: name === 'year' || name === 'duration' ? parseInt(value) || 0 : value 
    }));
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `question_${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      marks: 1,
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: any) => {
    setQuestions(prev => prev.map(question => 
      question.id === id ? { ...question, [field]: value } : question
    ));
  };

  const updateQuestionOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(prev => prev.map(question => 
      question.id === questionId 
        ? { 
            ...question, 
            options: question.options.map((opt, idx) => idx === optionIndex ? value : opt)
          }
        : question
    ));
  };

  const removeQuestion = (id: string) => {
    setQuestions(prev => prev.filter(question => question.id !== id));
  };

  const calculateTotalMarks = () => {
    return questions.reduce((total, question) => total + question.marks, 0);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Update total marks before saving
    const totalMarks = calculateTotalMarks();
    setPaperData(prev => ({ ...prev, totalMarks }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    alert('Practice paper saved successfully!');
  };

  const handlePublish = async () => {
    setIsSaving(true);
    const totalMarks = calculateTotalMarks();
    setPaperData(prev => ({ ...prev, totalMarks }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    alert('Practice paper published successfully!');
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
              <h1 className="text-2xl font-bold text-gray-900">Practice Paper Preview</h1>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handlePublish} disabled={isSaving}>
                {isSaving ? 'Publishing...' : 'Publish Paper'}
              </Button>
            </div>
          </div>

          {/* Paper Preview */}
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{paperData.title}</h1>
              <div className="flex justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {paperData.duration} minutes
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  {calculateTotalMarks()} marks
                </div>
                <div className="flex items-center">
                  <HelpCircle className="w-4 h-4 mr-1" />
                  {questions.length} questions
                </div>
              </div>
            </div>

            {paperData.instructions && (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
                <p className="text-blue-800 whitespace-pre-wrap">{paperData.instructions}</p>
              </div>
            )}

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Question {index + 1}. {question.question}
                    </h3>
                    <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm">
                      {question.marks} mark{question.marks !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded border ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span>{option}</span>
                          {optionIndex === question.correctAnswer && (
                            <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {question.explanation && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <h4 className="font-medium text-yellow-900 mb-1">Explanation:</h4>
                      <p className="text-yellow-800 text-sm">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="outline" icon={ArrowLeft}>
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Add Practice Paper</h1>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              icon={Eye}
              onClick={() => setIsPreview(true)}
              disabled={questions.length === 0}
            >
              Preview
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic Information */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Paper Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paper Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={paperData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., A/L ICT 2024 Past Paper"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paper Type *
                </label>
                <select
                  name="type"
                  value={paperData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="past-paper">Past Paper</option>
                  <option value="model-paper">Model Paper</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={paperData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  value={paperData.year}
                  onChange={handleInputChange}
                  min="2000"
                  max="2030"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={paperData.duration}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions
                </label>
                <textarea
                  name="instructions"
                  value={paperData.instructions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter instructions for students taking this paper..."
                />
              </div>
            </div>
          </Card>

          {/* Paper Statistics */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Paper Statistics</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{questions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">{calculateTotalMarks()}</div>
                <div className="text-sm text-gray-600">Total Marks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600">{paperData.duration}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
            </div>
          </Card>

          {/* Questions */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Questions</h3>
              <Button onClick={addQuestion} icon={Plus}>
                Add Question
              </Button>
            </div>
            
            {questions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No questions added yet</p>
                <p className="text-sm">Click "Add Question" to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <label className="text-sm text-gray-600">Marks:</label>
                          <input
                            type="number"
                            value={question.marks}
                            onChange={(e) => updateQuestion(question.id, 'marks', parseInt(e.target.value) || 1)}
                            min="1"
                            max="10"
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          icon={X}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Question Text *
                        </label>
                        <textarea
                          value={question.question}
                          onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Enter the question..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Answer Options *
                        </label>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name={`correct-${question.id}`}
                                checked={question.correctAnswer === optionIndex}
                                onChange={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                                className="text-primary-600 focus:ring-primary-500"
                              />
                              <span className="font-medium text-gray-700 w-6">
                                {String.fromCharCode(65 + optionIndex)}.
                              </span>
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => updateQuestionOption(question.id, optionIndex, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                              />
                              {question.correctAnswer === optionIndex && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
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
                          value={question.explanation}
                          onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Explain why this is the correct answer..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={handleSave} disabled={isSaving}>
              Save as Draft
            </Button>
            <Button onClick={handlePublish} disabled={isSaving || questions.length === 0}>
              {isSaving ? 'Publishing...' : 'Publish Paper'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};