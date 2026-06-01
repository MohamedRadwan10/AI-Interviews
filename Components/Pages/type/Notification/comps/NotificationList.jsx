"use client";
import React, { useCallback } from "react";
import { map, isEmpty, get } from "lodash-es";
import { useNotifications } from "@/hooks/useNotifications";
import MainText from "@/Components/Common/MainText";
import MainButton from "@/Components/Common/MainButton";
import { CheckCheck, Trash2, Bell, CheckCircle, XCircle, Info, PlayCircle, Briefcase } from "lucide-react";
import { formatDate } from "@/Utils/Func/Common";
import RouteLoading from "@/Components/Common/LoadingSkeleton/RouteLoading";
import { useUserAccount } from "@/Context/UserAccountContext";
import { useNavigation } from "@/hooks/common";

const NotificationCard = ({ item, onDelete }) => {
  const isRead = item.isRead;
  const titleLower = String(item.title).toLowerCase();
  const { userId } = useUserAccount();
  const { navigateTo } = useNavigation();
  const sessionId = get(item, 'sessionId');
  const jobId = get(item, 'jobId');
  let Icon = Info;
  let iconColor = "text-brand-primary";

  const goTo = useCallback(() => {
    if(sessionId !== null){
      navigateTo(`interview/report/${sessionId}/${userId}`);
    }
    if(jobId !== null){
      navigateTo(`/job-applicants/${jobId}`);
    }
  }, [sessionId, jobId, navigateTo]);

  if (titleLower.includes("accepted") || titleLower.includes("completed")) {
    Icon = CheckCircle;
    iconColor = "text-green-500";
  } else if (titleLower.includes("rejected")) {
    Icon = XCircle;
    iconColor = "text-red-500";
  } else if (titleLower.includes("started")) {
    Icon = PlayCircle;
    iconColor = "text-blue-500";
  } else if (titleLower.includes("interview") || titleLower.includes("job")) {
    Icon = Briefcase;
    iconColor = "text-brand-primary";
  }

  return (
    <div onClick={goTo} className={`p-4 mb-4 rounded-xl border transition-all duration-200 flex gap-4 items-start cursor-pointer hover:scale-[102%] hover:bg-light-main   dark:hover:bg-dark-primary-4 ${
      isRead 
        ? "bg-white dark:bg-dark-primary-3 border-ui-borderLight dark:border-ui-border" 
        : "bg-brand-primary/5 dark:bg-brand-primary/10 border-brand-primary/30"
    }`}>
      <div className={`p-2 rounded-full bg-white dark:bg-dark-primary-4 shadow-sm ${iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start gap-2">
          <MainText title={item.title} className="font-semibold text-ui-textMain dark:text-white text-lg" />
          <span className="text-xs text-ui-textMuted dark:text-ui-muted whitespace-nowrap">
            {formatDate(item.createdAt)}
          </span>
        </div>
        <MainText title={item.body} className="text-sm text-ui-textMuted dark:text-ui-muted mt-1 leading-relaxed" />
      </div>
      <button 
        onClick={() => onDelete(item.id)}
        className="text-ui-textMuted dark:text-ui-muted hover:text-red-500 dark:hover:text-red-400 transition-colors p-2"
        title="Delete"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export const NotificationList = ({ emptyDescription }) => {
  const { notifications, loading, markAllAsRead, markAsDeleted, isMarkingRead } = useNotifications();

  const handleMarkAll = useCallback(() => markAllAsRead(), [markAllAsRead]);
  const handleDelete = useCallback((id) => markAsDeleted(id), [markAsDeleted]);

  if (loading && isEmpty(notifications)) {
    return (
      <div className="mt-8">
        <RouteLoading type="Notifications" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <MainText title={`You have ${notifications.filter(n => !n.isRead).length} unread notifications`} className="text-brand-primary font-medium" />
        <MainButton 
          onClick={handleMarkAll}
          disabled={isMarkingRead || isEmpty(notifications)}
          className="flex items-center gap-2 bg-white dark:bg-dark-primary-3 border border-ui-borderLight dark:border-ui-border text-ui-textMain dark:text-white px-4 py-2 rounded-lg hover:bg-light-main dark:hover:bg-dark-primary-4 transition-colors"
          title={isMarkingRead ? "Marking..." : "Mark all as read"}
          icon={<CheckCheck className="w-4 h-4" />}
        />
      </div>
      
      {isEmpty(notifications) ? (
        <div className="text-center py-16 bg-white dark:bg-dark-primary-3 rounded-2xl border border-ui-borderLight dark:border-ui-border">
          <Bell className="w-12 h-12 text-ui-muted mx-auto mb-4" />
          <MainText title="No notifications yet" className="text-xl font-semibold text-ui-textMain dark:text-white" />
          <MainText tag="p" title={emptyDescription} className="text-ui-muted mt-2" />
        </div>
      ) : (
        <div className="space-y-4">
          {map(notifications, (item) => (
            <NotificationCard key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
