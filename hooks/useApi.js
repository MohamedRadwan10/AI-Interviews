import { useEffect, useCallback, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash-es";
import { API_BASE_URL, AUTH_ENDPOINTS } from "../Config/apiRegistry";
import { fetchApiData } from "../Store/Slices/apiThunk";
import { UserTokenContext } from "../Context/UserTokenContext";

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

      // Support FormData and avoid sending empty objects if no data is provided
      let finalData = override.data !== undefined ? override.data : data;
      
      // Merge only if both are plain objects
      if (data && override.data && !(data instanceof FormData) && !(override.data instanceof FormData)) {
        finalData = { ...data, ...override.data };
      }

      try {
        const result = await dispatch(
          fetchApiData({
            key: type,
            url: `${API_BASE_URL}${endpointConfig.url}${urlSuffix || ""}`,
            method: endpointConfig.method,
            params: { ...params, ...(override.params || {}) },
            data: finalData,
            headers,
          })
        ).unwrap();
        return result;
      } catch (error) {
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

  return {
    data: apiState.data,
    loading: apiState.loading,
    error: apiState.error,
    refetch: fetchData,
  };
};
