export const normalizeUrl = (url, baseUrl = "") => {
  if (!url) return "";
  
  const clean = (str) => str?.replace(/^\/+|\/+$/g, "") || "";
  
  const cleanedUrl = clean(url);
  const cleanedBase = clean(baseUrl);
  
  return clean(cleanedUrl.replace(cleanedBase, ""));
};

export const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  
  const baseUrl = "https://intellhire.runasp.net";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${baseUrl}${cleanPath}`;
};
