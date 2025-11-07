export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validationSchemas = {
  login: {
    email: {
      validate: validateEmail,
      message: "يرجى إدخال بريد إلكتروني صحيح"
    },
    password: {
      validate: validatePassword,
      message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
    }
  }
};

export const validateForm = (data, schema) => {
  const errors = {};
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field] || '';
    
    if (!rules.validate(value)) {
      errors[field] = rules.message;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
