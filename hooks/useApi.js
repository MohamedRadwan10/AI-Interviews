import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash-es";
import { API_BASE_URL, AUTH_ENDPOINTS } from "../Config/apiRegistry";
import { fetchApiData } from "../Store/Slices/apiThunk";

export const useApi = ({ type, params = {}, data = null, customHeaders = {}, autoFetch = true }) => {
  const dispatch = useDispatch();
  const apiState = useSelector((state) => state.api[type]) || {
    data: null,
    loading: autoFetch,
    error: null
  };

  const endpointConfig = get(AUTH_ENDPOINTS, type);

  const fetchData = useCallback(
    (override = {}) => {
      if (!endpointConfig) {
        console.error(`Endpoint type "${type}" not found in apiRegistry.`);
        return;
      }

      dispatch(
        fetchApiData({
          key: type,
          url: `${API_BASE_URL}${endpointConfig.url}`,
          method: endpointConfig.method,
          params: { ...params, ...(override.params || {}) },
          data: { ...data, ...(override.data || {}) },
          headers: { ...customHeaders, ...(override.headers || {}) },
        })
      );
    },
    [dispatch, type, endpointConfig, JSON.stringify(params), JSON.stringify(data), JSON.stringify(customHeaders)]
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
