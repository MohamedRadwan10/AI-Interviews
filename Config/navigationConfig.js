export const NAVIGATION_ROUTES = {
  auth: {
    login: "/login",
    loginWithVerified: "/login?verified=true",
    loginWithSuccess: "/login?success=true",
    register: "/register",
    verifyEmailRequest: "/verify-email-request",
    candidateRegister: "/individual-register",
    companyRegister: "/company-register",
    candidateOnboarding: "/candidate-onboarding",
    companyOnboarding: "/company-onboarding",
  },
  candidate: {
    dashboard: "/intelliHire",
    errorDashboard: "/intelliHire/dashboard",
    activeSessions: "/intelliHire/active-sessions",
    jobs: "/intelliHire/jobs",
    jobDetails: (id) => `/intelliHire/jobs/${id}`,
    interviewSession: (jobId) => `/intelliHire/interview-session/${jobId}`,
    interviewSessionRoom: (jobId) => `/intelliHire/interview-session/${jobId}/room`,
    report: (sessionId, userId) => `/intelliHire/report/${sessionId}/${userId}`,
    cv: (userId) => `/intelliHire/cv/${userId}`,
  },
  company: {
    dashboard: "/intelliHire/company-dashboard",
    postJob: "/intelliHire/post-job",
    editJob: (jobId) => `/intelliHire/edit-job/${jobId}`,
    jobApplicants: (jobId) => `/intelliHire/job-applicants/${jobId}`,
  },
  common: {
    home: "/intelliHire",
    about: "/intelliHire/about",
    notifications: "/intelliHire/notifications",
    settings: "/intelliHire/settings",
  }
};
