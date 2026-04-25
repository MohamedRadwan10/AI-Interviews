"use client";
import { useContext, useMemo } from "react";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useApi } from "@/hooks/useApi";
import { uniqBy } from "lodash-es";

export const useInterviewSessions = () => {
  const { userToken } = useContext(UserTokenContext);

  const { data, loading, error, refetch } = useApi({
    type: "ActiveSessions",
    autoFetch: !!userToken || (typeof window !== "undefined" && !!localStorage.getItem("refreshToken")),
  });

  const activeSessions = useMemo(() => {
    const rawData = Array.isArray(data) ? data : [];
    return uniqBy(rawData, (item) => item.jobid);
  }, [data]);

  return useMemo(() => ({
    activeSessions,
    activeSessionsCount: activeSessions.length,
    isLoading: loading,
    error,
    refetch,
  }), [activeSessions, loading, error, refetch]);
};
