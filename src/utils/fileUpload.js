import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase-simple";
import { handleError } from "../utils/errorHandler";

// Allowed file types and sizes
export const ALLOWED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  all: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
};

export const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
  all: 10 * 1024 * 1024 // 10MB
};

// Validate file before upload
export const validateFile = (file, allowedTypes = ALLOWED_FILE_TYPES.all, maxSize = MAX_FILE_SIZES.all) => {
  const errors = [];

  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }

  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    errors.push(`File too large. Maximum size: ${maxSizeMB}MB`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Upload file to Firebase Storage
export const uploadFile = async (file, path = 'uploads', userId = 'anonymous') => {
  try {
    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(', '));
    }

    // Create unique filename
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}_${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
    const storagePath = `${path}/${userId}/${fileName}`;

    // Create storage reference
    const storageRef = ref(storage, storagePath);

    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    return {
      success: true,
      url: downloadURL,
      path: storagePath,
      fileName: fileName,
      originalName: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    };
  } catch (error) {
    return handleError(error, 'file-upload');
  }
};

// Delete file from Firebase Storage
export const deleteFile = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
    return { success: true, message: 'File deleted successfully' };
  } catch (error) {
    return handleError(error, 'file-delete');
  }
};

// Multiple file upload
export const uploadMultipleFiles = async (files, path = 'uploads', userId = 'anonymous') => {
  const uploadPromises = files.map(file => uploadFile(file, path, userId));
  const results = await Promise.all(uploadPromises);
  
  return {
    success: results.every(result => result.success),
    results: results,
    successful: results.filter(result => result.success),
    failed: results.filter(result => !result.success)
  };
};
