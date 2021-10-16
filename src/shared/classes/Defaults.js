import image from "./../images/photo_default.png";
import notFound from "./../images/not_found.png";
import burger from "./../images/burger.jpg";
export class Defaults {
  static getDefaultImage() {
    return image;
  }

  static getNotFoundImage() {
    return notFound;
  }
  static getBurgerImage() {
    return burger;
  }
}
