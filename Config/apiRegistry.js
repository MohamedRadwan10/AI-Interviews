export const BACKEND_BASE_URL = "https://intellhire.runasp.net/api";
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
};
