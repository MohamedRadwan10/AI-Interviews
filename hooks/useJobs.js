import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { map, get, take, drop } from "lodash-es";
import { useApi } from "@/hooks/useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useNavigation, useMainNotify } from "@/hooks/common";
import { formatDate } from "@/Utils/Func/Common";

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
  const { success, error: notifyError } = useMainNotify();

  const postJob = useCallback(async (values) => {
    const userRole = userData?.userType || userData?.role || userData?.Role;
    if (userRole?.toLowerCase() !== "company") {
      notifyError("Access Denied", "Only companies can post jobs");
      throw new Error("Only companies can post jobs");
    }

    try {
      const payload = { 
        ...values, 
        experienceYears: parseInt(values.experienceYears || 0, 10),
        startedAt: formatDate(values.startedAt),
        endedAt: formatDate(values.endedAt),
      };
      const data = await postJobApi.refetch({ data: payload });
      if (data) {
        success("Job Posted", "New job opportunity created successfully.");
        navigateTo("/intelliHire/jobs");
      }
      return data;
    } catch (err) { 
      notifyError("Post Job Failed", get(err, "response.data.message") || "An error occurred while creating the job.");
      throw err; 
    }
  }, [postJobApi, navigateTo, userData, success, notifyError]);

  return { postJob, isLoading: postJobApi.loading, error: postJobApi.error };
};

export const useEditJob = (jobId) => {
  const { userData } = useContext(UserTokenContext);
  const { navigateTo } = useNavigation();
  const editJobApi = useApi({ type: "editJob", autoFetch: false, urlSuffix: `/${jobId}` });
  const { success, error: notifyError } = useMainNotify();

  const editJob = useCallback(async (values) => {
    const userRole = userData?.userType || userData?.role || userData?.Role;
    if (userRole?.toLowerCase() !== "company") {
      notifyError("Access Denied", "Only companies can edit jobs");
      throw new Error("Only companies can edit jobs");
    }

    try {
      const payload = { 
        ...values, 
        experienceYears: parseInt(values.experienceYears || 0, 10),
        skillsAndTools: values.skillsAndTools || values.requiredSkills,
        startedAt: formatDate(values.startedAt),
        endedAt: formatDate(values.endedAt),
      };
      const data = await editJobApi.refetch({ data: payload });
      if (data) {
        success("Job Updated", "Job details have been updated successfully.");
        navigateTo("/intelliHire/jobs");
      }
      return data;
    } catch (err) { 
      notifyError("Edit Job Failed", get(err, "response.data.message") || "An error occurred while updating the job.");
      throw err; 
    }
  }, [editJobApi, navigateTo, userData, success, notifyError]);

  return { editJob, isLoading: editJobApi.loading, error: editJobApi.error };
};

export const useDeleteJob = () => {
  const deleteJobApi = useApi({ type: "deleteJob", autoFetch: false });
  const { success, error: notifyError } = useMainNotify();

  const deleteJob = useCallback(async (jobId) => {
    try {
      const data = await deleteJobApi.refetch({ urlSuffix: `/${jobId}` });
      if (data) {
        success("Job Deleted", "The job has been successfully removed.");
      }
      return data;
    } catch (err) {
      notifyError("Delete Job Failed", get(err, "response.data.message") || "An error occurred while deleting the job.");
      throw err;
    }
  }, [deleteJobApi, success, notifyError]);

  return { deleteJob, isLoading: deleteJobApi.loading, error: deleteJobApi.error };
};

export const useCheckJobMatch = (autoJobId = null) => {
  const [matchResult, setMatchResult] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const checkMatchApi = useApi({ 
    type: "jobMatch", 
    autoFetch: !!autoJobId, 
    urlSuffix: autoJobId ? `/${autoJobId}` : "" 
  });
  const { error: notifyError } = useMainNotify();
  const { navigateTo, navigateBack } = useNavigation();

  const [hasHandledAutoResult, setHasHandledAutoResult] = useState(false);

  const handleResult = useCallback((data, jobId) => {
    if (data && data.rejected) {
      setMatchResult(data);
      setShowRejectionModal(true);
      return false;
    } else if (data && !data.rejected && jobId) {
      navigateTo(`/intelliHire/interview-session/${jobId}`);
      return true;
    }
    return true;
  }, [navigateTo]);

  useEffect(() => {
    if (autoJobId && checkMatchApi.data && !hasHandledAutoResult) {
      handleResult(checkMatchApi.data);
      setHasHandledAutoResult(true);
    }
  }, [autoJobId, checkMatchApi.data, hasHandledAutoResult, handleResult]);

  useEffect(() => {
    if (autoJobId && checkMatchApi.error && !hasHandledAutoResult) {
      const errorData = get(checkMatchApi.error, "response.data");
      if (errorData && errorData.rejected) {
        setMatchResult(errorData);
        setShowRejectionModal(true);
        setHasHandledAutoResult(true);
      }
    }
  }, [autoJobId, checkMatchApi.error, hasHandledAutoResult]);

  const checkAndApply = useCallback(async (jobId) => {
    try {
      const data = await checkMatchApi.refetch({ urlSuffix: `/${jobId}` });
      return handleResult(data, jobId);
    } catch (err) {
      const errorData = get(err, "response.data");
      if (errorData && errorData.rejected) {
        setMatchResult(errorData);
        setShowRejectionModal(true);
        return false;
      }
      notifyError("Match Check Failed", get(err, "response.data.message") || "An error occurred while checking job match.");
      throw err;
    }
  }, [checkMatchApi, handleResult, notifyError]);

  return { 
    checkAndApply, 
    isLoading: checkMatchApi.loading, 
    matchResult, 
    showRejectionModal, 
    setShowRejectionModal,
    isRejected: !!(matchResult && matchResult.rejected)
  };
};
