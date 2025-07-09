import React, { useState } from 'react';
import { Clock, FileText, Trophy, Play, Calendar } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockPracticeSheets } from '../data/mockData';

export const PracticePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'past-papers' | 'model-papers'>('past-papers');

  const pastPapers = mockPracticeSheets.filter(sheet => sheet.type === 'past-paper');
  const modelPapers = mockPracticeSheets.filter(sheet => sheet.type === 'model-paper');

  const currentSheets = activeTab === 'past-papers' ? pastPapers : modelPapers;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MCQ Practice</h1>
          <p className="text-gray-600">Practice with past papers and model papers to improve your skills</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex">
            <button
              onClick={() => setActiveTab('past-papers')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-l-lg transition-colors
                ${activeTab === 'past-papers'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <FileText className="w-4 h-4 mr-2" />
              Past Papers
            </button>
            <button
              onClick={() => setActiveTab('model-papers')}
              className={`
                flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium rounded-r-lg transition-colors
                ${activeTab === 'model-papers'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }
              `}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Model Papers
            </button>
          </div>
        </div>

        {/* Practice Sheets */}
        {currentSheets.length === 0 ? (
          <Card className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab === 'past-papers' ? 'past papers' : 'model papers'} available
            </h3>
            <p className="text-gray-600">
              New practice papers will be added soon. Check back later!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSheets.map((sheet) => (
              <Card key={sheet.id} hover className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm font-medium">
                    {sheet.subject}
                  </span>
                  {sheet.year && (
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {sheet.year}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{sheet.title}</h3>

                <div className="flex-1 space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {sheet.duration} minutes
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-1" />
                      {sheet.totalMarks} marks
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {sheet.questions.length} questions
                  </div>

                  {sheet.attempts.length > 0 && (
                    <div className="bg-gray-50 rounded p-3">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        Your Best Score: {Math.max(...sheet.attempts.map(a => a.score))}%
                      </div>
                      <div className="text-xs text-gray-600">
                        Attempted {sheet.attempts.length} time(s)
                      </div>
                    </div>
                  )}
                </div>

                <Button icon={Play} className="w-full">
                  {sheet.attempts.length > 0 ? 'Attempt Again' : 'Start Practice'}
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Instructions */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">How to Practice</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">📝 Past Papers</h4>
              <p>Official exam papers from previous years. Perfect for understanding the exam format and difficulty level.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🎯 Model Papers</h4>
              <p>Practice papers created by our experts. Great for additional practice and skill improvement.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">⏱️ Timed Practice</h4>
              <p>All papers are timed to simulate real exam conditions. Manage your time effectively!</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">📊 Instant Results</h4>
              <p>Get immediate feedback with detailed explanations for correct and incorrect answers.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};