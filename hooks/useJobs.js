import { useState, useMemo, useEffect, useContext, useCallback } from "react";
import { get, take, drop, filter } from "lodash-es";
import { useApi } from "@/hooks/useApi";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useNavigation, useMainNotify, useUrlSync } from "@/hooks/common";
import { formatDate } from "@/Utils/Func/Common";
import { NAVIGATION_ROUTES } from "@/Config/navigationConfig";


export const useJobs = () => {
  const { params, setParams, updateParam } = useUrlSync({
    search: "",
    page: 1,
    category: "",
    subCategory: "",
    type: "",
    careerLevel: "",
    country: "",
    city: "",
  });

  const searchTerm = params.search || "";
  const setSearchTerm = (value) => updateParam("search", value);
  const page = params.page || 1;
  const setPage = (value) => updateParam("page", value);
  const filters = {
    category: params.category || "",
    subCategory: params.subCategory || "",
    type: params.type || "",
    careerLevel: params.careerLevel || "",
    country: params.country || "",
    city: params.city || "",
  };

  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      if (searchTerm !== debouncedSearch) {
        setPage(1);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, debouncedSearch, setPage]);

  const updateFilter = useCallback((name, value) => {
    setParams((prev) => {
      const next = { ...prev, [name]: value, page: 1 };
      if (name === "category") next.subCategory = "";
      if (name === "country") next.city = "";
      return next;
    });
  }, [setParams]);

  const resetFilters = useCallback(() => {
    setParams(prev => ({
      ...prev,
      category: "",
      subCategory: "",
      type: "",
      careerLevel: "",
      country: "",
      city: "",
      page: 1
    }));
  }, [setParams]);

  const { data, loading, error, refetch } = useApi({
    type: "jobs",
    params: {
      page,
      pageSize: 9,
      ...(debouncedSearch ? { search: debouncedSearch } : {}),
      ...(filters.category ? { category: filters.category } : {}),
      ...(filters.subCategory ? { subcategory: filters.subCategory } : {}),
      ...(filters.type ? { jobType: filters.type } : {}),
      ...(filters.careerLevel ? { careerlevel: filters.careerLevel } : {}),
      ...(filters.country ? { country: filters.country } : {}),
      ...(filters.city ? { city: filters.city } : {}),
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
      const jobCountry = normalize(get(job, "country"));
      const jobLocations = normalize(get(job, "locations"));
      if (jobCountry !== countryNormalized && !jobLocations.includes(countryNormalized)) return false;
    }

    if (filters.city) {
      const cityNormalized = normalize(filters.city);
      const jobCity = normalize(get(job, "city") || get(job, "governmentId") || get(job, "government"));
      const jobLocations = normalize(get(job, "locations"));
      if (jobCity !== cityNormalized && !jobLocations.includes(cityNormalized)) return false;
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

export const resolveQuestionCounts = (values) => {
  const { questionsCount, codingCount, behavioralCount, technicalCount } = values;

  const hasQuestionsCount = questionsCount !== "" && questionsCount !== null && questionsCount !== undefined;
  const hasCoding = codingCount !== "" && codingCount !== null && codingCount !== undefined;
  const hasBehavioral = behavioralCount !== "" && behavioralCount !== null && behavioralCount !== undefined;
  const hasTechnical = technicalCount !== "" && technicalCount !== null && technicalCount !== undefined;

  let totalCount = hasQuestionsCount ? parseInt(questionsCount, 10) : 10;
  if (isNaN(totalCount) || totalCount < 0) totalCount = 10;

  const cCount = hasCoding ? parseInt(codingCount, 10) : 0;
  const bCount = hasBehavioral ? parseInt(behavioralCount, 10) : 0;
  const tCount = hasTechnical ? parseInt(technicalCount, 10) : 0;

  const parsedCoding = isNaN(cCount) || cCount < 0 ? 0 : cCount;
  const parsedBehavioral = isNaN(bCount) || bCount < 0 ? 0 : bCount;
  const parsedTechnical = isNaN(tCount) || tCount < 0 ? 0 : tCount;

  const allTypesEmpty = !hasCoding && !hasBehavioral && !hasTechnical;

  let resolvedCoding, resolvedBehavioral, resolvedTechnical, resolvedTotal;

  if (allTypesEmpty) {
    resolvedTotal = totalCount;
    const p1 = Math.floor(Math.random() * (totalCount + 1));
    const p2 = Math.floor(Math.random() * (totalCount + 1));
    const minP = Math.min(p1, p2);
    const maxP = Math.max(p1, p2);

    resolvedCoding = minP;
    resolvedBehavioral = maxP - minP;
    resolvedTechnical = totalCount - maxP;
  } else {
    const sum = parsedCoding + parsedBehavioral + parsedTechnical;
    resolvedTotal = sum;
    resolvedCoding = parsedCoding;
    resolvedBehavioral = parsedBehavioral;
    resolvedTechnical = parsedTechnical;
  }

  return {
    questionsCount: resolvedTotal,
    codingCount: resolvedCoding,
    behavioralCount: resolvedBehavioral,
    technicalCount: resolvedTechnical,
  };
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
          ...resolveQuestionCounts(values),
          ...(startedAt ? { startedAt: formatDate(startedAt) } : {}),
          ...(endedAt ? { endedAt: formatDate(endedAt) } : {}),
        };
      const data = await postJobApi.refetch({ data: payload });
      if (data) {
        success("Job Posted", "New job opportunity created successfully.");
        const jobId = get(data, "jobId") || get(data, "id") || get(data, "data.jobId") || get(data, "data.id");
        if (jobId) {
          navigateTo(NAVIGATION_ROUTES.company.jobApplicants(jobId));
        } else {
          navigateTo(NAVIGATION_ROUTES.company.dashboard);
        }
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
        ...resolveQuestionCounts(values),
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
        navigateTo(NAVIGATION_ROUTES.candidate.jobs);
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
    const actualData = get(data, "data") || data;
    const isPoor = actualData && (actualData.rejected || actualData.matchLabel === "Poor Match");
    if (isPoor) {
      setMatchResult(actualData);
      setShowRejectionModal(true);
      return false;
    } else if (actualData && jobId) {
      setMatchResult(actualData);
      if (!autoJobId) {
        setShowRejectionModal(true);
      }
      return true;
    }
    return true;
  }, [autoJobId]);

  useEffect(() => {
    if (autoJobId && checkMatchApi.data && !hasHandledAutoResult) {
      handleResult(checkMatchApi.data, autoJobId);
      setHasHandledAutoResult(true);
    }
  }, [autoJobId, checkMatchApi.data, hasHandledAutoResult, handleResult]);

  useEffect(() => {
    if (autoJobId && checkMatchApi.error && !hasHandledAutoResult) {
      const errorData = get(checkMatchApi.error, "response.data");
      const isPoor = errorData && (errorData.rejected || errorData.matchLabel === "Poor Match");
      if (isPoor) {
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
      const isPoor = errorData && (errorData.rejected || errorData.matchLabel === "Poor Match");
      if (isPoor) {
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
    isRejected: !!(matchResult && (matchResult.rejected || matchResult.matchLabel === "Poor Match"))
  };
};
