import React, { useState, useEffect } from "react";
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase-simple";
import { useAuth } from "../hooks/useAuth";
import FileUpload from "../components/FileUpload";
import { useToast } from "../components/Toast";

const MediaGallery = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { showToast, ToastContainer } = useToast();

  // Real-time listener for media items
  useEffect(() => {
    if (!user) return;

    const mediaRef = collection(db, "media");
    const unsubscribe = onSnapshot(mediaRef, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setMediaItems(items);
    });

    return () => unsubscribe();
  }, [user]);

  const handleUploadComplete = async (uploadResult) => {
    try {
      // Save file info to Firestore
      const mediaCollection = collection(db, "media");
      await addDoc(mediaCollection, {
        ...uploadResult,
        uploadedBy: user.uid,
        uploadedByEmail: user.email,
        createdAt: new Date().toISOString()
      });
      
      showToast("تم رفع الملف بنجاح!", "success");
    } catch (error) {
      showToast("خطأ في حفظ معلومات الملف: " + error.message, "error");
    }
  };

  const deleteMedia = async (mediaId, filePath) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا الملف؟")) return;

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "media", mediaId));
      showToast("تم حذف الملف بنجاح!", "success");
    } catch (error) {
      showToast("خطأ في حذف الملف: " + error.message, "error");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 بايت";
    const k = 1024;
    const sizes = ["بايت", "كيلوبايت", "ميجابايت", "جيجابايت"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return React.createElement("div", { 
    style: { 
      padding: "20px", 
      maxWidth: "1200px", 
      margin: "0 auto",
      direction: "rtl"
    } 
  },
    React.createElement(ToastContainer),
    
    React.createElement("h1", null, "معرض الوسائط"),
    React.createElement("p", { style: { color: "#666", marginBottom: "30px" } }, 
      "رفع وإدارة ملفاتك"
    ),

    // Upload Section
    React.createElement("div", { 
      style: { 
        marginBottom: "40px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px"
      } 
    },
      React.createElement("h3", null, "رفع الملفات"),
      React.createElement(FileUpload, {
        onUploadComplete: handleUploadComplete,
        multiple: true,
        path: "media",
        showPreview: true
      })
    ),

    // Media Grid
    React.createElement("div", null,
      React.createElement("h3", null, `الملفات (${mediaItems.length})`),
      
      loading ? (
        React.createElement("div", { 
          style: { 
            textAlign: "center", 
            padding: "40px" 
          } 
        }, "جاري التحميل...")
      ) : mediaItems.length === 0 ? (
        React.createElement("div", { 
          style: { 
            textAlign: "center", 
            padding: "40px",
            color: "#666"
          } 
        }, "لا توجد ملفات مرفوعة بعد")
      ) : (
        React.createElement("div", { 
          style: { 
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          } 
        },
          mediaItems.map((item) =>
            React.createElement("div", {
              key: item.id,
              style: {
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "white"
              }
            },
              // File Preview
              item.type?.startsWith("image/") ? (
                React.createElement("img", {
                  src: item.url,
                  alt: item.originalName,
                  style: {
                    width: "100%",
                    height: "200px",
                    objectFit: "cover"
                  }
                })
              ) : (
                React.createElement("div", {
                  style: {
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "48px"
                  }
                }, "📄")
              ),
              
              // File Info
              React.createElement("div", { style: { padding: "15px" } },
                React.createElement("div", { 
                  style: { 
                    fontWeight: "bold",
                    marginBottom: "5px",
                    wordBreak: "break-word"
                  } 
                }, item.originalName),
                React.createElement("div", { 
                  style: { 
                    fontSize: "12px", 
                    color: "#666",
                    marginBottom: "5px"
                  } 
                }, formatFileSize(item.size)),
                React.createElement("div", { 
                  style: { 
                    fontSize: "12px", 
                    color: "#666" 
                  } 
                }, formatDate(item.uploadedAt)),
                
                // Actions
                React.createElement("div", { 
                  style: { 
                    marginTop: "10px",
                    display: "flex",
                    gap: "10px"
                  } 
                },
                  React.createElement("a", {
                    href: item.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    style: {
                      padding: "5px 10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "12px"
                    }
                  }, "عرض"),
                  React.createElement("button", {
                    onClick: () => deleteMedia(item.id, item.path),
                    style: {
                      padding: "5px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "12px",
                      cursor: "pointer"
                    }
                  }, "حذف")
                )
              )
            )
          )
        )
      )
    )
  );
};

export default MediaGallery;
