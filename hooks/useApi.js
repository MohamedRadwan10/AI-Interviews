import { useEffect, useCallback, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash-es";
import { API_BASE_URL, AUTH_ENDPOINTS } from "@/Config/apiRegistry";
import { fetchApiData } from "@/Store/Slices/apiThunk";
import { UserTokenContext } from "@/Context/UserTokenContext";

export const useApi = ({ type, params = {}, data = null, customHeaders = {}, autoFetch = true, urlSuffix = "" }) => {
  const dispatch = useDispatch();
  const { userToken } = useContext(UserTokenContext);
  const apiState = useSelector((state) => state.api[type]) || {
    data: null,
    loading: autoFetch,
    error: null
  };

  const endpointConfig = get(AUTH_ENDPOINTS, type);

  const fetchData = useCallback(
    async (override = {}) => {
      if (!endpointConfig) {
        console.error(`Endpoint type "${type}" not found in apiRegistry.`);
        return null;
      }

      const headers = {
        ...customHeaders,
        ...(override.headers || {}),
      };

      const tokenToUse = userToken || (typeof window !== "undefined" ? localStorage.getItem("userToken") : null);

      if (tokenToUse) {
        headers.Authorization = `Bearer ${tokenToUse}`;
      }

      let finalData = override.data !== undefined ? override.data : data;
      
      if (data && override.data && !(data instanceof FormData) && !(override.data instanceof FormData)) {
        finalData = { ...data, ...override.data };
      }
      const targetUrl = `${endpointConfig.url}${override.urlSuffix || urlSuffix || ""}`;

      try {
        const result = await dispatch(
          fetchApiData({
            key: type,
            url: targetUrl,
            method: endpointConfig.method,
            params: { ...params, ...(override.params || {}) },
            data: finalData,
            headers,
          })
        ).unwrap();
        return result;
      } catch (error) {
        console.error(`[useApi] Request Failed [${type}]:`, error);
        throw error;
      }
    },
    [dispatch, type, endpointConfig, userToken, JSON.stringify(params), data, JSON.stringify(customHeaders), urlSuffix]
  );


  useEffect(() => {
    if (autoFetch && endpointConfig) {
      fetchData();
    }
  }, [fetchData, autoFetch, endpointConfig]);

  return useMemo(() => ({
    data: apiState.data,
    loading: apiState.loading,
    error: apiState.error,
    refetch: fetchData,
  }), [apiState.data, apiState.loading, apiState.error, fetchData]);
};
