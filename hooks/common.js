import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
    searchParams,
    navigateTo,
    navigateBack,
    navigateForward,
    replaceUrl,
    reload,
  };
};
