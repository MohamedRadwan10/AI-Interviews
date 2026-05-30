import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { get, take, drop, filter } from "lodash-es";
import { useApi } from "@/hooks/useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useNavigation, useMainNotify } from "@/hooks/common";
import { formatDate } from "@/Utils/Func/Common";
import { getCountryName, getStateName } from "@/Utils/Func/LocationData";

export const useJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
    type: "",
    careerLevel: "",
    country: "",
    city: "",
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      if (searchTerm !== debouncedSearch) {
        setPage(1);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, debouncedSearch]);

  const updateFilter = useCallback((name, value) => {
    setFilters((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "category") next.subCategory = "";
      if (name === "country") next.city = "";
      return next;
    });
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      category: "",
      subCategory: "",
      type: "",
      careerLevel: "",
      country: "",
      city: "",
    });
    setPage(1);
  }, []);

  const { data, loading, error, refetch } = useApi({
    type: "jobs",
    params: {
      page,
      pageSize: 9,
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.subCategory ? { subCategory: filters.subCategory, subCtegory: filters.subCategory } : {}),
      ...(filters.type ? { jobType: filters.type } : {}),
      ...(filters.careerLevel ? { careerLevel: filters.careerLevel } : {}),
      ...(filters.country ? { country: getCountryName(filters.country) } : {}),
      ...(filters.city ? { city: getStateName(filters.country, filters.city) } : {}),
    },
  });

  const rawJobs = get(data, "jobs", Array.isArray(data) ? data : get(data, "items", get(data, "data", [])));
  const isServerPaginated = !!get(data, "totalCount");
  const now = new Date();

  const normalize = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  const filteredJobs = filter(rawJobs, job => {
    const endedAt = get(job, "endedAt") || get(job, "endedAtDate");
    if (endedAt) {
      const endDate = new Date(endedAt);
      if (endDate < now) return false;
    }

    if (debouncedSearch) {
      const searchNormalized = normalize(debouncedSearch);
      const title = normalize(get(job, "title"));
      const company = normalize(get(job, "companyName"));
      // const desc = normalize(get(job, "description"));
      // const cat = normalize(get(job, "category"));
      // const subCat = normalize(get(job, "subCategory") || get(job, "subCtegory"));
      // const skills = normalize(get(job, "skillsAndTools") || get(job, "requiredSkills"));

      const matchesSearch = 
        title.includes(searchNormalized) || 
        company.includes(searchNormalized) /* || 
        desc.includes(searchNormalized) || 
        cat.includes(searchNormalized) || 
        subCat.includes(searchNormalized) || 
        skills.includes(searchNormalized) */;

      if (!matchesSearch) return false;
    }

    if (filters.category) {
      const catNormalized = normalize(filters.category);
      const jobCat = normalize(get(job, "category"));
      if (jobCat !== catNormalized) return false;
    }

    if (filters.subCategory) {
      const subCatNormalized = normalize(filters.subCategory);
      const jobSubCat = normalize(get(job, "subCategory") || get(job, "subCtegory"));
      if (jobSubCat !== subCatNormalized && !jobSubCat.includes(subCatNormalized) && !subCatNormalized.includes(jobSubCat)) return false;
    }

    if (filters.type) {
      const typeNormalized = normalize(filters.type);
      const jobType = normalize(get(job, "type"));
      if (jobType !== typeNormalized && !jobType.includes(typeNormalized) && !typeNormalized.includes(jobType)) return false;
    }

    if (filters.careerLevel) {
      const levelNormalized = normalize(filters.careerLevel);
      const jobLevel = normalize(get(job, "careerLevel"));
      if (jobLevel !== levelNormalized && !jobLevel.includes(levelNormalized) && !levelNormalized.includes(jobLevel)) return false;
    }

    if (filters.country) {
      const countryNormalized = normalize(filters.country);
      const countryNameNormalized = normalize(getCountryName(filters.country));
      const jobCountry = normalize(get(job, "country"));
      const jobLocations = normalize(get(job, "locations"));
      if (jobCountry !== countryNormalized && 
          jobCountry !== countryNameNormalized && 
          !jobLocations.includes(countryNormalized) && 
          !jobLocations.includes(countryNameNormalized)) return false;
    }

    if (filters.city) {
      const cityNormalized = normalize(filters.city);
      const cityNameNormalized = normalize(getStateName(filters.country, filters.city));
      const jobCity = normalize(get(job, "city"));
      const jobLocations = normalize(get(job, "locations"));
      if (jobCity !== cityNormalized && 
          jobCity !== cityNameNormalized && 
          !jobLocations.includes(cityNormalized) && 
          !jobLocations.includes(cityNameNormalized)) return false;
    }

    return true;
  });

  const totalJobsCount = isServerPaginated
    ? get(data, "totalCount", get(data, "total", filteredJobs.length))
    : filteredJobs.length;

  const displayJobs = useMemo(() => {
    return isServerPaginated ? filteredJobs : take(drop(filteredJobs, (page - 1) * 9), 9);
  }, [isServerPaginated, filteredJobs, page]);

  const availableCountries = useMemo(() => {
    const set = new Set();
    (rawJobs || []).forEach(job => {
      const c = get(job, "country");
      if (c && c !== "N/A") set.add(c);
    });
    return [...set].sort();
  }, [rawJobs]);

  const availableCities = useMemo(() => {
    const set = new Set();
    (rawJobs || []).forEach(job => {
      if (filters.country) {
        const jobCountry = get(job, "country");
        if (normalize(jobCountry) !== normalize(filters.country)) return;
      }
      const c = get(job, "city");
      if (c && c !== "N/A") set.add(c);
    });
    return [...set].sort();
  }, [rawJobs, filters.country]);


  return useMemo(() => ({
    jobs: displayJobs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    page,
    setPage,
    refetch,
    totalCount: totalJobsCount,
    filters,
    updateFilter,
    resetFilters,
    availableCountries,
    availableCities,
  }), [displayJobs, loading, error, searchTerm, page, refetch, totalJobsCount, filters, updateFilter, resetFilters, availableCountries, availableCities]);
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
        const {
          title,
          category,
          subCategory,
          type,
          description,
          careerLevel,
          experienceYears,
          requirements,
          requiredSkills,
          startedAt,
          endedAt,
        } = values;
        const payload = {
          title,
          category,
          subCategory,
          type,
          description,
          careerLevel,
          experienceYears: parseInt(experienceYears || 0, 10),
          requirements,
          requiredSkills,
          ...(startedAt ? { startedAt: formatDate(startedAt) } : {}),
          ...(endedAt ? { endedAt: formatDate(endedAt) } : {}),
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
      const originalStart = values.originalStartedAt;
      const originalEnd = values.originalEndedAt;

      const payload = { 
        title: values.title,
        description: values.description,
        careerLevel: values.careerLevel,
        experienceYears: parseInt(values.experienceYears || 0, 10),
        requirements: values.requirements || values.jobrequirements,
        type: values.type,
        category: values.category,
        requiredSkills: values.requiredSkills || values.skillsAndTools,
        startedAt: (originalStart && formatDate(originalStart) === formatDate(values.startedAt))
          ? originalStart
          : formatDate(values.startedAt),
        endedAt: (originalEnd && formatDate(originalEnd) === formatDate(values.endedAt))
          ? originalEnd
          : formatDate(values.endedAt),
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
