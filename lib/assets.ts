const getIconPath = (path: string) => `public/icons/${path}`;

export const ICONS = {
  HOME: getIconPath("home.svg"),
  CATEGORY: getIconPath("category.svg"),
  LIKE: getIconPath("like.svg"),
  PROFILE: getIconPath("profile.svg"),
  UPLOAD: getIconPath("upload.svg"),
};
