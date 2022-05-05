const getIconPath = (path: string) => `/icons/${path}`;

export const ICONS = {
  HOME: getIconPath("home.svg"),
  CATEGORY: getIconPath("category.svg"),
  LIKE: getIconPath("like.svg"),
  PROFILE: getIconPath("profile.svg"),
  UPLOAD: getIconPath("upload.svg"),
  CAUTION: getIconPath("caution.svg"),
  SUCCESS: getIconPath("success.svg"),
  PAW: getIconPath("paw.svg"),
  ARROW_RIGHT: getIconPath("arrowRight.svg"),
};
