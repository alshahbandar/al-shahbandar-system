import React, { useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { uploadFile, uploadMultipleFiles, ALLOWED_FILE_TYPES, MAX_FILE_SIZES } from "../utils/fileUpload";
import { useToast } from "./Toast";

const FileUpload = ({ 
  onUploadComplete, 
  multiple = false, 
  allowedTypes = ALLOWED_FILE_TYPES.all,
  maxSize = MAX_FILE_SIZES.all,
  path = "uploads",
  showPreview = true
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    
    // Auto-upload when files are selected
    if (files.length > 0) {
      handleUpload(files);
    }
  };

  const handleUpload = async (files = selectedFiles) => {
    if (!files || files.length === 0) {
      showToast("Please select files to upload", "warning");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const result = multiple 
        ? await uploadMultipleFiles(files, path, user?.uid)
        : await uploadFile(files[0], path, user?.uid);

      if (result.success) {
        showToast("Files uploaded successfully!", "success");
        if (onUploadComplete) {
          onUploadComplete(multiple ? result.results : result);
        }
        setSelectedFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        showToast(result.message || "Upload failed", "error");
      }
    } catch (error) {
      showToast("Upload failed: " + error.message, "error");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
    handleUpload(files);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return React.createElement("div", null,
    React.createElement("div", {
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      style: {
        border: "2px dashed #ccc",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        backgroundColor: uploading ? "#f8f9fa" : "white",
        cursor: uploading ? "not-allowed" : "pointer",
        transition: "all 0.3s ease"
      },
      onClick: () => !uploading && fileInputRef.current?.click()
    },
      uploading ? (
        React.createElement("div", null,
          React.createElement("div", { 
            style: { 
              marginBottom: "10px",
              color: "#007bff"
            } 
          }, "Uploading..."),
          React.createElement("div", {
            style: {
              width: "100%",
              height: "8px",
              backgroundColor: "#e9ecef",
              borderRadius: "4px",
              overflow: "hidden"
            }
          },
            React.createElement("div", {
              style: {
                width: `${progress}%`,
                height: "100%",
                backgroundColor: "#007bff",
                transition: "width 0.3s ease"
              }
            })
          )
        )
      ) : (
        React.createElement("div", null,
          React.createElement("div", { 
            style: { fontSize: "48px", marginBottom: "10px" } 
          }, "📁"),
          React.createElement("p", { style: { margin: "0 0 10px 0" } }, 
            "Click to upload or drag and drop"
          ),
          React.createElement("p", { 
            style: { 
              fontSize: "12px", 
              color: "#666",
              margin: 0
            } 
          }, `Max file size: ${formatFileSize(maxSize)}`)
        )
      )
    ),

    React.createElement("input", {
      type: "file",
      ref: fileInputRef,
      multiple: multiple,
      accept: allowedTypes.join(","),
      onChange: handleFileSelect,
      style: { display: "none" },
      disabled: uploading
    }),

    selectedFiles.length > 0 && !uploading && (
      React.createElement("div", { 
        style: { 
          marginTop: "15px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px"
        } 
      },
        React.createElement("p", { style: { margin: "0 0 10px 0", fontWeight: "bold" } }, 
          "Selected Files:"
        ),
        React.createElement("div", { style: { maxHeight: "150px", overflowY: "auto" } },
          selectedFiles.map((file, index) =>
            React.createElement("div", {
              key: index,
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                borderBottom: "1px solid #dee2e6"
              }
            },
              React.createElement("span", { style: { fontSize: "14px" } }, file.name),
              React.createElement("span", { 
                style: { 
                  fontSize: "12px", 
                  color: "#666" 
                } 
              }, formatFileSize(file.size))
            )
          )
        )
      )
    )
  );
};

export default FileUpload;
