import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { map, get, take, drop } from "lodash-es";
import { useApi } from "@/hooks/useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useNavigation } from "@/hooks/common";

export const useJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      if (searchTerm !== debouncedSearch) {
        setPage(1);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, debouncedSearch]);

  const { data, loading, error, refetch } = useApi({
    type: "jobs",
    params: {
      page,
      pageSize: 9,
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
    },
  });

  console.log("[useJobs] API Data:", data);
  const rawJobs = get(data, "jobs", Array.isArray(data) ? data : get(data, "items", get(data, "data", [])));
  const totalCount = get(data, "totalCount", get(data, "total", rawJobs?.length || 0));
  const isServerPaginated = !!get(data, "totalCount");
  const displayJobs = useMemo(() => {
    return isServerPaginated ? rawJobs : take(drop(rawJobs, (page - 1) * 9), 9);
  }, [isServerPaginated, rawJobs, page]);

  return useMemo(() => ({
    jobs: displayJobs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    refetch,
    totalCount,
  }), [displayJobs, loading, error, searchTerm, page, refetch, totalCount]);
};

export const useJobDetails = (jobId) => {
  const { data, loading, error, refetch } = useApi({
    type: "jobsDetails",
    urlSuffix: `/${jobId}`,
    autoFetch: !!jobId,
  });

  return useMemo(() => ({
    job: get(data, "job", data),
    loading,
    error,
    refetch,
  }), [data, loading, error, refetch]);
};

export const usePostJob = () => {
  const { userData } = useContext(UserTokenContext);
  const { navigateTo } = useNavigation();
  const postJobApi = useApi({ type: "postJob", autoFetch: false });

  const postJob = useCallback(async (values) => {
    console.log("[usePostJob] Attempting submit. userData:", userData);
    console.log("[usePostJob] Form values:", values);
    
    const userRole = userData?.userType || userData?.role || userData?.Role;
    if (userRole?.toLowerCase() !== "company") {
      console.error("[usePostJob] Access Denied: User is not a company. Role found:", userRole);
      throw new Error("Only companies can post jobs");
    }

    try {
      const payload = { 
        ...values, 
        experienceYears: parseInt(values.experienceYears || 0, 10),
        startedAt: values.startedAt instanceof Date ? values.startedAt.toISOString() : values.startedAt,
        endedAt: values.endedAt instanceof Date ? values.endedAt.toISOString() : values.endedAt,
      };
      const data = await postJobApi.refetch({ data: payload });
      console.log("[usePostJob] API Response Success:", data);
      if (data) navigateTo("/intelliHire/jobs");
      return data;
    } catch (err) { 
      console.error("[usePostJob] API Error:", err);
      throw err; 
    }
  }, [postJobApi, navigateTo, userData]);

  return { postJob, isLoading: postJobApi.loading, error: postJobApi.error };
};

export const useEditJob = (jobId) => {
  const { userData } = useContext(UserTokenContext);
  const { navigateTo } = useNavigation();
  const editJobApi = useApi({ type: "editJob", autoFetch: false, urlSuffix: `/${jobId}` });

  const editJob = useCallback(async (values) => {
    console.log("[useEditJob] Attempting edit. userData:", userData);
    
    const userRole = userData?.userType || userData?.role || userData?.Role;
    if (userRole?.toLowerCase() !== "company") {
      console.error("[useEditJob] Access Denied: User is not a company. Role found:", userRole);
      throw new Error("Only companies can edit jobs");
    }

    try {
      const payload = { 
        ...values, 
        experienceYears: parseInt(values.experienceYears || 0, 10),
        skillsAndTools: values.skillsAndTools || values.requiredSkills,
        startedAt: values.startedAt instanceof Date ? values.startedAt.toISOString() : values.startedAt,
        endedAt: values.endedAt instanceof Date ? values.endedAt.toISOString() : values.endedAt,
      };
      const data = await editJobApi.refetch({ data: payload });
      console.log("[useEditJob] API Response Success:", data);
      if (data) navigateTo("/intelliHire/jobs");
      return data;
    } catch (err) { 
      console.error("[useEditJob] API Error:", err);
      throw err; 
    }
  }, [editJobApi, navigateTo, userData]);

  return { editJob, isLoading: editJobApi.loading, error: editJobApi.error };
};
