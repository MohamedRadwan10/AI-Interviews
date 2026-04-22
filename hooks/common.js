import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path) => {
    router.push(path);
  };

  const navigateBack = () => {
    router.back();
  };

  const navigateForward = () => {
    router.forward();
  };

  const replaceUrl = (path) => {
    router.replace(path);
  };

  const reload = () => {
    router.refresh();
  };

  return useMemo(() => ({
    router,
    pathname,
    navigateTo,
    navigateBack,
    navigateForward,
    replaceUrl,
    reload,
  }), [router, pathname, navigateTo, navigateBack, navigateForward, replaceUrl, reload]);
};
