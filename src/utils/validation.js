// Validation utility functions
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateLength = (value, min, max) => {
  return value.length >= min && value.length <= max;
};

// Form validation schemas
export const validationSchemas = {
  login: {
    email: {
      validate: validateEmail,
      message: "Please enter a valid email address"
    },
    password: {
      validate: (value) => validatePassword(value),
      message: "Password must be at least 6 characters"
    }
  },
  profile: {
    name: {
      validate: (value) => validateRequired(value) && validateLength(value, 2, 50),
      message: "Name must be between 2 and 50 characters"
    },
    phone: {
      validate: validatePhone,
      message: "Please enter a valid phone number",
      optional: true
    }
  },
  item: {
    name: {
      validate: (value) => validateRequired(value) && validateLength(value, 2, 100),
      message: "Item name must be between 2 and 100 characters"
    },
    description: {
      validate: (value) => validateLength(value, 0, 500),
      message: "Description cannot exceed 500 characters",
      optional: true
    }
  }
};

// Validate form data against schema
export const validateForm = (data, schema) => {
  const errors = {};
  
  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field] || '';
    
    // Skip optional fields if empty
    if (rules.optional && !validateRequired(value)) {
      continue;
    }
    
    if (!rules.validate(value)) {
      errors[field] = rules.message;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
