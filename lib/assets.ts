const getIconPath = (path: string) => `/icons/${path}`;
const getImagePath = (path: string) => `/images/${path}`;

export const ICONS = {
  UPLOAD: getIconPath("upload.svg"),
  CAUTION: getIconPath("caution.svg"),
  SUCCESS: getIconPath("success.svg"),
  PAW: getIconPath("paw.svg"),
  ARROW_RIGHT: getIconPath("arrowRight.svg"),
  SEARCH: getIconPath("search.svg"),
  DOWN_ARROW: getIconPath("arrowDown.svg"),
  ACTIVE: getIconPath("active.svg"),
  EDIT: getIconPath("edit.svg"),
  DELETE: getIconPath("delete.svg"),
  LOGOUT: getIconPath("logout.svg"),
  TRASH: getIconPath("trash.svg"),
  IMAGE_UPLOAD: getIconPath("imageUpload.svg"),
  GALLERY: getIconPath("gallery.svg"),
  VIDEO: getIconPath("video.svg"),
};

export const IMAGES: ImagesType = {
  DOG: getImagePath("dog.png"),
  CAT: getImagePath("cat.png"),
  LIZARD: getImagePath("lizard.png"),
  BIRD: getImagePath("bird.png"),
  RABBIT: getImagePath("rabbit.png"),
  HAMSTER: getImagePath("hamster.png"),
  ETC: getImagePath("squirrel.png"),
};

type ImagesType = {
  [index: string]: string;
  DOG: string;
  CAT: string;
  LIZARD: string;
  BIRD: string;
  RABBIT: string;
  HAMSTER: string;
};
