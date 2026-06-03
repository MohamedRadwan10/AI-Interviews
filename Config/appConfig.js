export const APP_CONFIG = {
  system: {
    name: "IntelliHire",
    version: "1.0.0",
    supportEmail: "Support@IntelliHire",
    supportPhone: "01183291091",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    }
  },
  faceAuth: {
    frameInterval: 60000,
    frameError: 5000,      
    frameQuality: 0.6,       
    warningDisplayTime: 5000, 
    maxAttempts: 3,         
    retryInterval: 500,
  },
  interview: {
    defaultTotalQuestions: 15,
    autoSubmitDelay: 1000,   
    timerSyncInterval: 5000,  
    webcamCheckInterval: 500,
  },
  upload: {
    maxCVSizeMB: 5,
    allowedCVFormats: [".pdf", ".doc", ".docx"],
    maxPhotoSizeMB: 2,
    allowedPhotoFormats: ["image/jpeg", "image/png"],
  },
  auth: {
    otpLength: 6,
    redirectDelay: 2000,
  },
  ui: {
    toastDuration: 4000,
    defaultChartColors: ["#4A90D9", "#E85D5D", "#F2C94C", "#27AE60"],
    sidebarWidth: "280px",
    statusColors: {
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
    },
  },
  navigation: {
    onboarding: {
      individual: "/candidate-onboarding",
      company: "/company-onboarding",
    },
    dashboard: "/intelliHire",
    login: "/login",
  }
};
