export const BACKEND_BASE_URL = "https://intellhire.runasp.net/api";
export const IMAGE_BASE_URL = "https://intellhire.runasp.net";
export const API_BASE_URL = "/api/proxy";

export const AUTH_ENDPOINTS = {
  login: {
    url: "/Auth/login",
    method: "POST",
  },
  registerCandidate: {
    url: "/Auth/register/candidate", // name, email, password, confirmPassword, deviceName
    method: "POST",
  },
  registerCompany: {
    url: "/Auth/register/company", // email, password, confirmPassword, deviceName
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
    url: "/Auth/forget-password-request",  //   in body {userEmail} ---> {  "email": "user@example.com" }
    method: "POST",
  },
  sendOTP: {
    url: "/Auth/send-otp",  //   in body {email and code} ---> {  "email": "user@example.com" , "code": "string" }
    method: "POST",
  },
  resetPassword: {
    url: "/Auth/reset-password",  //   in body {email and token and newPassword and confirmPassword } ---> {"email": "user@example.com","token": "string","newPassword": "string","confirmPassword": "string"}
    method: "POST",
  },
  verifyEmail: {
    url: "/Auth/confirm-email", // in parametar query userId  , token 
    method: "GET",
  },
  CompleteUserData: {
    url: "/Profile/UserComplete",  // Photo string($binary) CV string($binary) PhoneNumber *string in Body (formdata)
    method: "POST",
  },
  CompleteCompanyData: {
    url: "/Profile/CompanyComplete", // Name *string  WebsiteUrl string  Industry *string  About string PhoneNumber *string CompanyLogo string($binary) Locations.City  Locations.Country Locations.Government  string in Body (formdata)
    method: "POST",
  },
  userData: {
    url: "/User/profile",  // token only
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
    url: "/Session/StartSession", // ${jobId} فى اخر ال endpoint
    method: "POST",
  },
  nextQuestion: {
    url: "/Session/next", // SessionId string($uuid) QuestionId string($uuid) UserAnswer string currentQuestionIndex integer($int32) voiceFile string($binary)   in body in formdata
    method: "POST",
  },
  endSession: {
    url: "/Session/EndSession", // /{SessionId}/{jobId} فى اخر ال endpoint
    method: "POST",
  },
  checkActiveSession: {
    url: "/Session/CheckActiveSesssion", // /{JobId} فى اخر ال endpoint
    method: "GET",
  },
  getSessionDetails: {
    url: "/Session/GetSessionDetails", // /{SessionId} فى اخر ال endpoint
    method: "GET",
  },
  ActiveSessions: {
    url: "/Session/ActiveSessions", // token only
    method: "GET",
  },
  report: {
    url: "/Report", // /{SessionId} , /${userId} فى اخر ال endpoint
    method: "GET",
  },
  postJob: {
    url: "/Employer/post-job", //  in body : { title *string careerLevel *string experienceYears *integer type *string location *string requiredSkills *string description *string requirements *string}
    method: "POST",
  },
  editJob: {
    url: "/Jobs",  //  /${jobId} in parameters and in body : { title *string careerLevel *string experienceYears *integer type *string location *string skillsAndTools *string description *string requirements *string  startedAt *date endedAt *date}
    method: "PUT",
  },
  deleteJob: {
    url: "/Jobs",  //  /${jobId} in parameters
    method: "DELETE",
  },
  candidateDashboard: {
    url: "/User/dashboard",  // token only
    method: "GET",
  },
  employerDashboard: {
    url: "/Employer/dashboard",  // token only
    method: "GET",
  },
  candidateJobStatus: {
    url: "/Employer/sessions",  // in parameters: sessionId  /{sessionId}/status in end of url and in body : { status *integer (0:Accepted, 1:Rejected, 2:Pending )} 
    method: "PATCH",
  },
};