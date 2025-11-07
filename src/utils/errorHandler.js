export const handleError = (error, context = '') => {
  console.error(`Error in ${context}:`, error);
  
  const errorMap = {
    'auth/email-already-in-use': 'هذا البريد الإلكتروني مستخدم بالفعل',
    'auth/invalid-email': 'بريد إلكتروني غير صحيح',
    'auth/weak-password': 'كلمة المرور ضعيفة',
    'auth/user-not-found': 'لم يتم العثور على مستخدم',
    'auth/wrong-password': 'كلمة المرور خاطئة'
  };
  
  return {
    message: errorMap[error.code] || error.message || 'حدث خطأ غير متوقع',
    code: error.code,
    details: error.message
  };
};

export const handleSuccess = (message, data = null) => {
  return {
    success: true,
    message,
    data
  };
};
