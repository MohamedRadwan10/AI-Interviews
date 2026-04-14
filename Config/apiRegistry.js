export const API_BASE_URL = "https://intellhire.runasp.net/api";

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
  jobs: {
    url: "/jobs/browse",
    method: "GET",
  },
};
