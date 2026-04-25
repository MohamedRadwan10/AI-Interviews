export const normalizeUrl = (url, baseUrl = "") => {
  if (!url) return "";
  
  const clean = (str) => str?.replace(/^\/+|\/+$/g, "") || "";
  
  const cleanedUrl = clean(url);
  const cleanedBase = clean(baseUrl);
  
  return clean(cleanedUrl.replace(cleanedBase, ""));
};
