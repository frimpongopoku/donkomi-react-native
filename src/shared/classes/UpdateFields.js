export default class UpdateFields {
  static PRODUCTS = ["name", "size", "variation", "price", "shop_id", "image"];
  static SHOP = ["name", "description", "image"]
  static getOnlyModelFields(modelFields = [], data) {
    if (!modelFields || !data) return {};
    const form = {};
    for (let i = 0; i < modelFields.length; i++) {
      const key = modelFields[i];
      form[key] = data[key];
    }
    return form;
  }
}
