// Error handling utilities
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', details = null) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

// Firebase error mapping
export const getFriendlyFirebaseError = (error) => {
  const errorMap = {
    'auth/email-already-in-use': 'This email is already registered. Please login instead.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email. Please sign up first.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'firestore/permission-denied': 'You don\'t have permission to perform this action.',
    'firestore/unavailable': 'Service temporarily unavailable. Please try again.',
    'storage/unauthorized': 'You are not authorized to upload files.',
    'storage/retry-limit-exceeded': 'Upload failed. Please try again.'
  };
  
  return errorMap[error.code] || error.message || 'An unexpected error occurred.';
};

// Global error handler
export const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      details: error.details
    };
  }
  
  // Firebase errors
  if (error.code && error.code.startsWith('auth/') || error.code.startsWith('firestore/') || error.code.startsWith('storage/')) {
    return {
      message: getFriendlyFirebaseError(error),
      code: error.code,
      details: null
    };
  }
  
  // Generic errors
  return {
    message: 'An unexpected error occurred. Please try again.',
    code: 'UNKNOWN_ERROR',
    details: process.env.NODE_ENV === 'development' ? error.message : null
  };
};

// Success response formatter
export const handleSuccess = (message, data = null) => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};
