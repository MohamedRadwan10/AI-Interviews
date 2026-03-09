import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE_URL = "";

export const useAxiosFetch = ({
  url,
  method = "GET",
  params = {},
  data = null,
  headers = {},
  autoFetch = true,
}) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (override = {}) => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios({
          url: `${BASE_URL}${url}`,
          method,
          params,
          data,
          headers,
          ...override,
        });

        setResponse(res.data);
        return res.data;
      } catch (err) {
        console.error("API Error:", err);
        setError(err.response?.data || err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, method, JSON.stringify(params), JSON.stringify(data)],
  );

  useEffect(() => {
    if (autoFetch) fetchData();
  }, [fetchData, autoFetch]);

  return {
    data: response,
    loading,
    error,
    refetch: fetchData,
  };
};
