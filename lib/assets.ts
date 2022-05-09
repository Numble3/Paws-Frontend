const getIconPath = (path: string) => `/icons/${path}`;
const getImagePath = (path: string) => `/images/${path}`;

export const ICONS = {
  UPLOAD: getIconPath("upload.svg"),
  CAUTION: getIconPath("caution.svg"),
  SUCCESS: getIconPath("success.svg"),
  PAW: getIconPath("paw.svg"),
  ARROW_RIGHT: getIconPath("arrowRight.svg"),
  SEARCH: getIconPath("search.svg"),
  BACK: getIconPath("back.svg"),
  EMPTY_HEART: getIconPath("empty_heart.svg"),
  FULL_HEART: getIconPath("full_heart.svg"),
  DOWN_ARROW: getIconPath("down_arrow.svg"),
  ACTIVE: getIconPath("active.svg"),
  EDIT: getIconPath("edit.svg"),
  TRASH: getIconPath("trash.svg"),
  IMAGE_UPLOAD: getIconPath("image_upload.svg"),
  GALLERY: getIconPath("gallery.svg"),
};

export const IMAGES: ImagesType = {
  DOG: getImagePath("dog.png"),
  CAT: getImagePath("cat.png"),
  LIZARD: getImagePath("lizard.png"),
  BIRD: getImagePath("bird.png"),
  RABBIT: getImagePath("rabbit.png"),
  HAMSTER: getImagePath("hamster.png"),
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
