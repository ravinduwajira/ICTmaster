import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  Star, 
  Lock, 
  CheckCircle, 
  Play,
  CreditCard,
  Building2,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Course } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { bankDetails } from '../../data/mockData';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, isEnrolled = false }) => {
  const { user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'online' | 'bank' | null>(null);

  const formatPrice = (price: number, currency: string) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  const handleEnroll = () => {
    if (!user) {
      // Show login modal in real app
      alert('Please login to enroll in courses');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePayment = (method: 'online' | 'bank') => {
    setSelectedPaymentMethod(method);
    if (method === 'online') {
      // In real app, integrate with payment gateway
      alert('Redirecting to payment gateway...');
    } else {
      // Show bank details
      alert('Bank details will be shown');
    }
  };

  const openWhatsApp = () => {
    const message = `Hi, I would like to enroll in "${course.title}" course. I have made the bank transfer. Please verify my payment.`;
    const url = `https://wa.me/${bankDetails.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <Card hover className="h-full flex flex-col">
        {/* Course Image */}
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          {isEnrolled && (
            <div className="absolute top-3 right-3 bg-secondary-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Enrolled
            </div>
          )}
          {!isEnrolled && (
            <div className="absolute top-3 right-3 bg-gray-900 bg-opacity-75 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Locked
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-primary-500 text-white px-2 py-1 rounded text-xs font-medium">
            {course.level}
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

          {/* Course Meta */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {course.enrolledStudents.length} students
              </div>
            </div>
          </div>

          {/* Course Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="text-gray-500 text-xs">+{course.tags.length - 3} more</span>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              {formatPrice(course.price, course.currency)}
            </div>
            {isEnrolled ? (
              <Button variant="secondary" icon={Play}>
                Continue Learning
              </Button>
            ) : (
              <Button onClick={handleEnroll} icon={Lock}>
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title={`Enroll in ${course.title}`}
        maxWidth="md"
      >
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Course Details</h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{course.title}</span>
              <span className="font-semibold">{formatPrice(course.price, course.currency)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Choose Payment Method</h4>
            
            {/* Online Payment */}
            <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                 onClick={() => handlePayment('online')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-6 h-6 text-primary-500" />
                  <div>
                    <h5 className="font-medium text-gray-900">Online Payment</h5>
                    <p className="text-sm text-gray-600">Pay with credit/debit card or digital wallet</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-secondary-600">Instant Access</div>
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                 onClick={() => handlePayment('bank')}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Building2 className="w-6 h-6 text-primary-500" />
                  <div>
                    <h5 className="font-medium text-gray-900">Bank Transfer</h5>
                    <p className="text-sm text-gray-600">Transfer to our bank account</p>
                  </div>
                </div>
                <div className="text-sm font-medium text-yellow-600">Manual Verification</div>
              </div>
            </div>
          </div>

          {selectedPaymentMethod === 'bank' && (
            <div className="bg-blue-50 rounded-lg p-4 space-y-3">
              <h5 className="font-semibold text-gray-900">Bank Transfer Details</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-medium">{bankDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Name:</span>
                  <span className="font-medium">{bankDetails.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-medium">{bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Branch:</span>
                  <span className="font-medium">{bankDetails.branch}</span>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="text-sm text-gray-600 mb-3">
                  After making the transfer, contact us on WhatsApp with your payment details for verification.
                </p>
                <Button
                  onClick={openWhatsApp}
                  variant="secondary"
                  icon={MessageCircle}
                  className="w-full"
                >
                  Contact on WhatsApp
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};