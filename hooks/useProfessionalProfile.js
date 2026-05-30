"use client";
import { useContext, useMemo } from "react";
import { get } from "lodash-es";
import { useApi } from "@/hooks/useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";

export const useProfessionalProfile = () => {
  const { userToken } = useContext(UserTokenContext);
  const { data, loading, error, refetch } = useApi({
    type: "userCv",
    autoFetch: !!userToken,
  });

  const profileData = useMemo(() => {
    const rawData = get(data, "data", data) || {};

    const fullName = get(rawData, "fullName", "");
    const jobTitle = get(rawData, "jobTitle", "");
    const email = get(rawData, "email", "");
    const phoneNumber = get(rawData, "phoneNumber", "");
    const photoUrl = get(rawData, "photoUrl", null);
    const hasResume = get(rawData, "hasResume", false);

    const workExperiences = get(rawData, "workExperiences", []);
    const skills = get(rawData, "skills", []);
    const certifications = get(rawData, "certifications", []);
    const projects = get(rawData, "projects", []);
    const education = get(rawData, "education", []);

    return {
      fullName,
      jobTitle,
      email,
      phoneNumber,
      photoUrl,
      hasResume,
      workExperiences,
      skills,
      certifications,
      projects,
      education,
    };
  }, [data]);

  return useMemo(() => ({
    ...profileData,
    loading,
    error,
    refetch,
  }), [profileData, loading, error, refetch]);
};
