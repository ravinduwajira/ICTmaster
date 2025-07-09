import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CoursesPage } from './pages/CoursesPage';
import { PracticePage } from './pages/PracticePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AddCoursePage } from './pages/admin/AddCoursePage';
import { ManageStudentsPage } from './pages/admin/ManageStudentsPage';
import { ManageCoursesPage } from './pages/admin/ManageCoursesPage';
import { EditCourseContentPage } from './pages/admin/EditCourseContentPage';
import { AddPracticePaperPage } from './pages/admin/AddPracticePaperPage';
import { ViewReportsPage } from './pages/admin/ViewReportsPage';
import { AdminCoursesPage } from './pages/admin/AdminCoursesPage';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && <Header />}
      
      <main className={isAuthenticated ? '' : 'min-h-screen'}>
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
            } 
          />
          <Route path="/" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path="/courses" element={
            <ProtectedRoute>
              <CoursesPage />
            </ProtectedRoute>
          } />
          <Route path="/practice" element={
            <ProtectedRoute>
              <PracticePage />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/courses" element={
            <ProtectedRoute adminOnly>
              <AdminCoursesPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/add-course" element={
            <ProtectedRoute adminOnly>
              <AddCoursePage />
            </ProtectedRoute>
          } />
          <Route path="/admin/manage-courses" element={
            <ProtectedRoute adminOnly>
              <ManageCoursesPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-course-content/:courseId" element={
            <ProtectedRoute adminOnly>
              <EditCourseContentPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/manage-students" element={
            <ProtectedRoute adminOnly>
              <ManageStudentsPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/add-practice-paper" element={
            <ProtectedRoute adminOnly>
              <AddPracticePaperPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <ProtectedRoute adminOnly>
              <ViewReportsPage />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      {isAuthenticated && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;