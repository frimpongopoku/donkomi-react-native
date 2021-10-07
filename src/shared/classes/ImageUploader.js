import storage from "@react-native-firebase/storage";
const STATE_CHANGED = "state_changed";
const makeError = (message) => {
  return { pass: false, error: message };
};
export default class ImageUploader {
  static PROFILE_PHOTOS = "Profile Photos";
  static SHOP_PHOTO_BUCKET = "Shop Cover Photos"
  static PRODUCT_BUCKET = "Product Photos"
  static uploadImageToFirebase(bucket, image, onComplete, onError, inProgress) {
    if (!bucket || !image)
      return onError("Provide a bucket name, and an image");
    const ref = storage().ref(`${bucket}/${Date.now()}`);
    const task = ref.putFile(image, { contentType: "image/jpg" });
    task.on(STATE_CHANGED, (snap) => inProgress && inProgress(snap));
    task.then(() => {
      ref
        .getDownloadURL()
        .then((url) => onComplete(url))
        .catch((e) => onError(e?.toString()));
    });
    task.catch((e) => onError(e));
  }

  static uploadProfilePhoto(image, onComplete, onError, inProgress) {
    return ImageUploader.uploadImageToFirebase(
      ImageUploader.PROFILE_PHOTOS,
      image,
      onComplete,
      onError,
      inProgress
    );
  }
}
