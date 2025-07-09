import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthFormData, ValidationErrors } from '../types';

interface AuthContextType {
  user: User | null;
  login: (formData: AuthFormData) => Promise<{ success: boolean; errors?: ValidationErrors }>;
  register: (formData: AuthFormData) => Promise<{ success: boolean; errors?: ValidationErrors }>;
  updateProfile: (updateData: Partial<User>) => Promise<{ success: boolean; errors?: ValidationErrors }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user database - in production, this would be handled by a backend
const getUsersFromStorage = (): User[] => {
  const users = localStorage.getItem('ictmaster_users');
  return users ? JSON.parse(users) : [];
};

const saveUsersToStorage = (users: User[]) => {
  localStorage.setItem('ictmaster_users', JSON.stringify(users));
};

// Initialize with default admin user
const initializeUsers = () => {
  const users = getUsersFromStorage();
  
  // Check if admin user already exists
  const adminExists = users.find(u => u.email === 'ravinduwajira@gmail.com');
  
  if (!adminExists) {
    const adminUser: User = {
      id: 'admin-ravinduwajira',
      email: 'ravinduwajira@gmail.com',
      name: 'Ravindu Wajira',
      avatar: 'https://ui-avatars.com/api/?name=Ravindu+Wajira&background=0066CC&color=fff&size=150&rounded=true',
      role: 'admin',
      xp: 0,
      level: 1,
      badges: [],
      streak: 0,
      lastActive: new Date(),
      createdAt: new Date(),
    };
    
    // Add admin user to existing users or create new array
    const updatedUsers = [...users, adminUser];
    saveUsersToStorage(updatedUsers);
    
    // Set admin password
    localStorage.setItem('password_admin-ravinduwajira', 'Ravi@4466565');
  }
  
  // Remove old admin if exists
  const filteredUsers = users.filter(u => u.email !== 'admin@ictmaster.lk');
  if (filteredUsers.length !== users.length) {
    saveUsersToStorage(filteredUsers);
    localStorage.removeItem('password_admin-1');
  }
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

const generateAvatar = (name: string): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0066CC&color=fff&size=150&rounded=true`;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize users on first load
    initializeUsers();

    // Check for existing session
    const savedUser = localStorage.getItem('ictmaster_current_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // Verify user still exists in users database
        const users = getUsersFromStorage();
        const existingUser = users.find(u => u.id === userData.id);
        if (existingUser) {
          setUser(existingUser);
        } else {
          localStorage.removeItem('ictmaster_current_user');
        }
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('ictmaster_current_user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (formData: AuthFormData): Promise<{ success: boolean; errors?: ValidationErrors }> => {
    const errors: ValidationErrors = {};

    // Validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // Check credentials
    const users = getUsersFromStorage();
    const user = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());

    if (!user) {
      return { 
        success: false, 
        errors: { general: 'No account found with this email address' }
      };
    }

    // Check password
    const storedPassword = localStorage.getItem(`password_${user.id}`) || 'password123';
    if (formData.password !== storedPassword) {
      return { 
        success: false, 
        errors: { general: 'Invalid email or password' }
      };
    }

    // Update last active
    user.lastActive = new Date();
    const updatedUsers = users.map(u => u.id === user.id ? user : u);
    saveUsersToStorage(updatedUsers);

    setUser(user);
    localStorage.setItem('ictmaster_current_user', JSON.stringify(user));

    return { success: true };
  };

  const register = async (formData: AuthFormData): Promise<{ success: boolean; errors?: ValidationErrors }> => {
    const errors: ValidationErrors = {};

    // Validation
    if (!formData.name || formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // Check if user already exists
    const users = getUsersFromStorage();
    const existingUser = users.find(u => u.email.toLowerCase() === formData.email!.toLowerCase());

    if (existingUser) {
      return { 
        success: false, 
        errors: { email: 'An account with this email already exists' }
      };
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: formData.email!.toLowerCase(),
      name: formData.name!.trim(),
      avatar: formData.profilePicture || generateAvatar(formData.name!.trim()),
      role: 'student',
      xp: 0,
      level: 1,
      badges: [],
      streak: 0,
      lastActive: new Date(),
      createdAt: new Date(),
    };

    // Save user and password
    const updatedUsers = [...users, newUser];
    saveUsersToStorage(updatedUsers);
    localStorage.setItem(`password_${newUser.id}`, formData.password!);

    setUser(newUser);
    localStorage.setItem('ictmaster_current_user', JSON.stringify(newUser));

    return { success: true };
  };

  const updateProfile = async (updateData: Partial<User>): Promise<{ success: boolean; errors?: ValidationErrors }> => {
    if (!user) {
      return { success: false, errors: { general: 'No user logged in' } };
    }

    const errors: ValidationErrors = {};

    // Validation
    if (updateData.name !== undefined) {
      if (!updateData.name.trim() || updateData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long';
      }
    }

    if (updateData.email !== undefined) {
      if (!updateData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!validateEmail(updateData.email)) {
        errors.email = 'Please enter a valid email address';
      } else {
        // Check if email is already taken by another user
        const users = getUsersFromStorage();
        const existingUser = users.find(u => u.id !== user.id && u.email.toLowerCase() === updateData.email!.toLowerCase());
        if (existingUser) {
          errors.email = 'This email is already taken by another account';
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    try {
      // Update user data
      const updatedUser = {
        ...user,
        ...updateData,
        lastActive: new Date(),
      };

      // Update in storage
      const users = getUsersFromStorage();
      const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
      saveUsersToStorage(updatedUsers);

      // Update current user state and session
      setUser(updatedUser);
      localStorage.setItem('ictmaster_current_user', JSON.stringify(updatedUser));

      return { success: true };
    } catch (error) {
      return { success: false, errors: { general: 'Failed to update profile. Please try again.' } };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ictmaster_current_user');
  };

  const value = {
    user,
    login,
    register,
    updateProfile,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};