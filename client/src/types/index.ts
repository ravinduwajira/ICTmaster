export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: 'admin' | 'student';
  xp: number;
  level: number;
  badges: Badge[];
  streak: number;
  lastActive: Date;
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  currency: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  isActive: boolean;
  lessons: Lesson[];
  enrolledStudents: string[];
  sampleLessons?: string[];
  tags: string[];
  rating: number;
  totalRatings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
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

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'pdf' | 'image' | 'video' | 'document';
  size: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
  xpReward: number;
  attempts: QuizAttempt[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  score: number;
  answers: number[];
  completedAt: Date;
  timeSpent: number;
}

export interface PracticeSheet {
  id: string;
  title: string;
  type: 'past-paper' | 'model-paper';
  subject: string;
  year?: number;
  duration: number;
  questions: Question[];
  totalMarks: number;
  attempts: QuizAttempt[];
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirement: string;
  earnedAt?: Date;
}

export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  method: 'online' | 'bank-transfer';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  bankSlip?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  requirement: string;
  xpReward: number;
  badge?: Badge;
  isActive: boolean;
  expiresAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  xp: number;
  level: number;
  badges: number;
  completedCourses: number;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  whatsappNumber: string;
}

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  profilePicture?: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}