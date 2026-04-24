import { useState, useMemo, useEffect } from "react";
import { map, get, take, drop } from "lodash-es";
import { useApi } from "@/hooks/useApi";

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


  const rawJobs = get(
    data,
    "jobs",
    Array.isArray(data) ? data : get(data, "items", get(data, "data", [])),
  );
  const totalCount = get(
    data,
    "totalCount",
    get(data, "total", rawJobs?.length || 0),
  );
  const isServerPaginated = !!get(data, "totalCount");
  const displayJobs = useMemo(() => {
    return isServerPaginated ? rawJobs : take(drop(rawJobs, (page - 1) * 9), 9);
  }, [isServerPaginated, rawJobs, page]);

  const jobsData = useMemo(() => ({
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

  return jobsData;
};

export const useJobDetails = (jobId) => {
  const { data, loading, error, refetch } = useApi({
    type: "jobsDetails",
    urlSuffix: `/${jobId}`,
    autoFetch: !!jobId,
  });

  const job = useMemo(() => get(data, "job", data), [data]);

  return useMemo(() => ({
    job,
    loading,
    error,
    refetch,
  }), [job, loading, error, refetch]);
};
