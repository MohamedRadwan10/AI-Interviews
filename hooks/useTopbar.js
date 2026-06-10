// ─── Imports ────────────────────────────────────
import { useState, useEffect, useCallback, useMemo } from "react";
import { useInterviewSessions } from "@/hooks/useActiveSessions";
import { useNotifications } from "@/hooks/useNotifications";
import { useNavigation } from "@/hooks/common";
import { useUserAccount } from "@/Context/UserAccountContext";
import { NAVIGATION_ROUTES } from "@/Config/navigationConfig";
import { get, filter, map } from "lodash-es";
import { navigation } from "@/Config/LayoutConfig";
// ─── Hook ───────────────────────────────────────
const useTopBar = () => {

  // State
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // External hooks
  const { activeSessionsCount } = useInterviewSessions();
  const { notifications } = useNotifications();
  const { navigateTo } = useNavigation();
  const { accountData } = useUserAccount();

  // Computed
  const userType = get(accountData, "userType");

  const unreadNotificationsCount = useMemo(
    () => filter(notifications, (n) => !n.isRead).length,
    [notifications]
  );

  const isCandidate = useMemo(() => userType !== "Company", [userType]);

  // Callbacks
  const handleSessionsClick = useCallback(() => {
    navigateTo(NAVIGATION_ROUTES.candidate.activeSessions);
  }, [navigateTo]);

  const handleNotificationsClick = useCallback(() => {
    navigateTo(NAVIGATION_ROUTES.common.notifications);
  }, [navigateTo]);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Effects
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Return
  const result = useMemo(() => ({
    scrolled,
    mobileMenuOpen,
    activeSessionsCount,
    unreadNotificationsCount,
    isCandidate,
    handleSessionsClick,
    handleNotificationsClick,
    handleMobileMenuToggle,
    handleMobileMenuClose,
  }), [
    scrolled,
    mobileMenuOpen,
    activeSessionsCount,
    unreadNotificationsCount,
    isCandidate,
    handleSessionsClick,
    handleNotificationsClick,
    handleMobileMenuToggle,
    handleMobileMenuClose,
  ]);

  return result;
};

export default useTopBar;




export const useNavMenu = () => {

  // State
  const [isMounted, setIsMounted] = useState(false);

  // External
  const { accountData } = useUserAccount();
  const userType = get(accountData, "userType");

  // Computed
  const filteredNavigation = useMemo(() => {
    return map(
      filter(navigation, (item) => {
        if (item.label === "Post Job" && userType === "Individual") return false;
        if (item.label === "Jobs" && userType === "Company") return false;
        return true;
      }),
      (item) => {
        if (item.label !== "Dashboard") return item;
        return {
          ...item,
          path: userType === "Individual"
            ? "/intelliHire/dashboard"
            : "/intelliHire/company-dashboard",
        };
      }
    );
  }, [userType]);

  const displayNavigation = useMemo(
    () => (isMounted ? filteredNavigation : navigation),
    [isMounted, filteredNavigation]
  );

  // Effects
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return
  const result = useMemo(() => ({
    displayNavigation,
  }), [displayNavigation]);

  return result;
};
