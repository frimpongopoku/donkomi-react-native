import image from "./../images/photo_default.png";
import notFound from "./../images/not_found.png";
import burger from "./../images/burger.jpg";
import soon from "./../images/coming_soon.png";
import locked from "./../images/locked.png";
import motor from "./../images/motor.png";

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
  static getComingSoonImage() {
    return soon;
  }

  static getPadLockImage() {
    return locked;
  }

  static getMotorImage() {
    return motor;
  }
}
