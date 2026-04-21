import { useRouter, usePathname } from "next/navigation";

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

  return {
    router,
    pathname,
    navigateTo,
    navigateBack,
    navigateForward,
    replaceUrl,
    reload,
  };
};
