export const BACKEND_BASE_URL = "https://intellhire.runasp.net/api";
export const IMAGE_BASE_URL = "https://intellhire.runasp.net";
export const API_BASE_URL = "/api/proxy";

export const AUTH_ENDPOINTS = {
  login: {
    url: "/Auth/login",
    method: "POST",
  },
  registerCandidate: {
    url: "/Auth/register/candidate",
    method: "POST",
  },
  registerCompany: {
    url: "/Auth/register/company",
    method: "POST",
  },
  refreshToken: {
    url: "/Auth/refresh-token",
    method: "POST",
  },
  logout: {
    url: "/Auth/logout",
    method: "POST",
  },
  forgetPassword: {
    url: "/Auth/forget-password-request",
    method: "POST",
  },
  sendOTP: {
    url: "/Auth/send-otp",
    method: "POST",
  },
  resetPassword: {
    url: "/Auth/reset-password",
    method: "POST",
  },
  verifyEmail: {
    url: "/Auth/confirm-email",
    method: "GET",
  },
  CompleteUserData: {
    url: "/Profile/UserComplete",
    method: "POST",
  },
  CompleteCompanyData: {
    url: "/Profile/CompanyComplete",
    method: "POST",
  },
  userData: {
    url: "/User/profile",
    method: "GET",
  },
  userCv: {
    url: "/User/professional-profile",
    method: "GET",
  },
  jobs: {
    url: "/jobs/browse",
    method: "GET",
  },
  jobsDetails: {
    url: "/jobs/Details",
    method: "GET",
  },
  startSession: {
    url: "/Session/StartSession",
    method: "POST",
  },
  nextQuestion: {
    url: "/Session/next",
    method: "POST",
  },
  endSession: {
    url: "/Session/EndSession",
    method: "POST",
  },
  checkActiveSession: {
    url: "/Session/CheckActiveSesssion",
    method: "GET",
  },
  getSessionDetails: {
    url: "/Session/GetSessionDetails",
    method: "GET",
  },
  ActiveSessions: {
    url: "/Session/ActiveSessions",
    method: "GET",
  },
  report: {
    url: "/Report",
    method: "GET",
  },
  postJob: {
    url: "/Employer/post-job",
    method: "POST",
  },
  editJob: {
    url: "/Jobs",
    method: "PUT",
  },
  deleteJob: {
    url: "/Jobs/delete",
    method: "PUT",
  },
  candidateDashboard: {
    url: "/User/dashboard",
    method: "GET",
  },
  employerDashboard: {
    url: "/Employer/dashboard",
    method: "GET",
  },
  candidateJobStatus: {
    url: "/Employer/sessions",
    method: "PATCH",
  },
  selfie: {
    url: "/selfie",
    method: "POST",
  },
  jobMatch: {
    url: "/CheckJobMatch",
    method: "GET",
  },
  GetNotifications: {
    url: "/GetNotifications",
    method: "GET",
  },
  MarkAllAsRead: {
    url: "/MarkAllAsRead",
    method: "PUT",
  },
  MarkAsDeleted: {
    url: "/MarkAsDeleted",
    method: "PUT",
  },
  MarkAsRead: {
    url: "/MarkAsRead", // /{id} in parameters 
    method: "PUT",
  },
  candidateSettingInfo: {
    url: "/Setting/personal-info",
    method: "PATCH",
  },
  companySettingInfo: {
    url: "/Setting/personal-company-info", 
    method: "PATCH",
  },
  SettingCV: {
    url: "/Setting/career-details",
    method: "PATCH",
  },
  SettingCompanyAbout: {
    url: "/Setting/company-about",
    method: "PATCH",
  },
  ChangeEmailStep1: {
    url: "/Setting/change-email-password-request", 
    method: "POST",
  },
  ChangeEmailStep2: {
    url: "/Setting/change-email-request", 
    method: "POST",
  },
  ChangeEmailStep3: {
    url: "/Setting/change-email-Confirm", 
    method: "POST",
  },
  ChangePasswordStep1: {
    url: "/Setting/request-password-change",
    method: "POST",
  },
  ChangePasswordStep2: {
    url: "/Setting/send-otp",
    method: "POST",
  },
  ChangePasswordStep3: {
    url: "/Setting/confirm-password-change",
    method: "POST",
  },
  deleteAccount: {
    url: "/Setting/delete-account",
    method: "PUT",
  },
};
