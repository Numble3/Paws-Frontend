const getIconPath = (path: string) => `/icons/${path}`;
const getImagePath = (path: string) => `/images/${path}`;

export const ICONS = {
  HOME: getIconPath("home.svg"),
  CATEGORY: getIconPath("category.svg"),
  LIKE: getIconPath("like.svg"),
  PROFILE: getIconPath("profile.svg"),
  UPLOAD: getIconPath("upload.svg"),
  SEARCH: getIconPath("search.svg"),
};

export const IMAGES = {
  DOG: getImagePath("dog.png"),
  CAT: getImagePath("cat.png"),
  LIZARD: getImagePath("lizard.png"),
  BIRD: getImagePath("bird.png"),
  RABBIT: getImagePath("rabbit.png"),
  HAMSTER: getImagePath("hamster.png"),
};
