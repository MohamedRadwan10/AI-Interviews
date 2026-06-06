import { useCallback, useMemo, useContext, useState, useEffect } from "react";
import { useApi } from "@/hooks/useApi";
import { useMainNotify, useConfirmation } from "@/hooks/common";
import { UserTokenContext } from "@/Context/UserTokenContext";
import { useSignalR } from "@/hooks/useSignalR";

export const useNotifications = () => {
  const { userData, userToken } = useContext(UserTokenContext);
  const { success, error: notifyError } = useMainNotify();
  const { confirm } = useConfirmation();
  const { on } = useSignalR(userToken);

  const [realtimeNotifications, setRealtimeNotifications] = useState([]);
  
  const getApi = useApi({ 
    type: "GetNotifications", 
    autoFetch: !!userData 
  });
  
  const readAllApi = useApi({ 
    type: "MarkAllAsRead", 
    autoFetch: false 
  });
  
  const deleteApi = useApi({ 
    type: "MarkAsDeleted", 
    autoFetch: false 
  });

  const readOneApi = useApi({ 
    type: "MarkAsRead", 
    autoFetch: false 
  });

  const markAsRead = useCallback(async (id) => {
    try {
      await readOneApi.refetch({ urlSuffix: `/${id}`, data: {} });
      setRealtimeNotifications((prev) => 
        prev.map((n) => n.id === id ? { ...n, isRead: true } : n)
      );
      getApi.refetch({ silent: true });
    } catch (err) {
      console.error("MarkAsRead Error:", err);
    }
  }, [readOneApi, getApi]);

  useEffect(() => {
    const handleNewNotification = (data) => {
      if (!data) return;
      setRealtimeNotifications((prev) => {
        const alreadyExists = prev.some((n) => n.id === data.id);
        if (alreadyExists) return prev;
        return [{ ...data, isRead: false }, ...prev];
      });
    };

    on("ReceiveUserNotification", handleNewNotification);
    on("ReceiveCompanyNotification", handleNewNotification);
  }, [on]);

  const fetchedNotifications = useMemo(() => {
    if (Array.isArray(getApi.data)) return getApi.data;
    if (getApi.data?.data && Array.isArray(getApi.data.data)) return getApi.data.data;
    if (getApi.data?.items && Array.isArray(getApi.data.items)) return getApi.data.items;
    return [];
  }, [getApi.data]);

  const notifications = useMemo(() => {
    const fetchedIds = new Set(fetchedNotifications.map((n) => n.id));
    const uniqueRealtime = realtimeNotifications.filter((n) => !fetchedIds.has(n.id));
    return [...uniqueRealtime, ...fetchedNotifications];
  }, [realtimeNotifications, fetchedNotifications]);

  const markAllAsRead = useCallback(async () => {
    try {
      await readAllApi.refetch({ data: {} });
      success("Success", "All notifications marked as read");
      setRealtimeNotifications([]);
      getApi.refetch({ silent: true });
    } catch (err) {
      console.error("MarkAllAsRead Error full:", err);
      const errorMsg = err?.response?.data?.message || (typeof err?.response?.data === 'string' ? err?.response?.data : err?.message) || "Failed to mark notifications as read";
      notifyError("Error", errorMsg);
    }
  }, [readAllApi, getApi, success, notifyError]);

  const markAsDeleted = useCallback((id) => {
    confirm({
      message: "Are you sure you want to delete this notification?",
      header: "Confirm Deletion",
      icon: "pi pi-exclamation-triangle",
      acceptClassName: "p-button-danger",
      accept: async () => {
        try {
          await deleteApi.refetch({ urlSuffix: `/${id}`, data: {} });
          success("Success", "Notification deleted");
          setRealtimeNotifications((prev) => prev.filter((n) => n.id !== id));
          getApi.refetch({ silent: true });
        } catch (err) {
          console.error("Delete Error full:", err);
          const errorMsg = err?.response?.data?.message || (typeof err?.response?.data === 'string' ? err?.response?.data : err?.message) || "Failed to delete notification";
          notifyError("Error", errorMsg);
        }
      }
    });
  }, [deleteApi, getApi, success, notifyError, confirm]);

  return useMemo(() => ({
    notifications,
    loading: getApi.loading,
    error: getApi.error,
    refetch: getApi.refetch,
    markAllAsRead,
    isMarkingRead: readAllApi.loading,
    markAsDeleted,
    isDeleting: deleteApi.loading,
    markAsRead,
    isMarkingOneRead: readOneApi.loading
  }), [
    notifications, 
    getApi.loading, 
    getApi.error, 
    getApi.refetch, 
    markAllAsRead, 
    readAllApi.loading, 
    markAsDeleted, 
    deleteApi.loading,
    markAsRead,
    readOneApi.loading
  ]);
};
