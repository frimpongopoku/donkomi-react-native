const DEFAULT_HEADER = {
  // Accept: "application/json",
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json",
};
export const POST = "POST";
export const GET = "GET";
/**
 * A class that handles all api calls outside of firestore
 *
 */
class InternetExplorer {
  static POST = POST;
  static GET = GET;
  static BACKEND_FAILED = "BACKEND_FAILED";
  /**
   * @async
   * Used when getting data from a url
   * @param {String} URL
   * @param {String} method GET || POST
   * @param {object} body request body
   * @returns {Promise}
   */
  static async roamAndFind(URL, method, body) {
    method = method ? method : POST;
    if (!URL) return null;
    const requestParams = {
      headers: DEFAULT_HEADER,
      method,
      body: JSON.stringify(body),
    };
    const res = await fetch(URL, requestParams);
    return res.json();
  }
  /**
   * @async
   * Performs the same function as roamAndFind, but gives way for headers and other details to be specified
   * @param {String} URL
   * @param {object} paramsAndBody request body
   * @returns {Promise}
   */
  static async rawCall(URL, paramsAndBody) {
    if (!URL) return null;
    const res = await fetch(URL, paramsAndBody);
    return res.json();
  }

  /**
   *@async
   * Used when posting data to a URL
   * @param {String} URL
   * @param {String} method GET || POST
   * @param {object} body request body
   * @returns {Promise}
   */

  static async send(URL, method, body) {
    return await this.roamAndFind(URL, method, body);
  }

  /**
   * Creates a new instance of the InternetExplorer class with
   * a user's idToken.
   * All requests made with this instance will be authenticated
   * on the backend
   * @param {*} userToken
   * A user's firebaseID Token. Can be found on the
   *  firebase object stored in redux
   *
   * @returns {InternetExplorer}
   */
  static newInstance(userToken) {
    if (!userToken) return null;
    return new InternetExplorer(userToken);
  }

  /**
   *
   * @param {string} userToken | A user's firebaseID Token. Can be found on the
   *  firebase object stored in redux
   *
   */
  constructor(userToken) {
    this.userToken = userToken;
  }

  /**
   * @async
   * Used when getting data from a url
   * @param {String} URL
   * @param {String} method GET || POST
   * @param {object} body request body
   * @returns {Promise}
   */
  async roamAndFind(URL, method, body) {
    if (!URL || !method || !body) return null;
    const bodyWithToken = {
      _token: this.userToken,
      ...body,
    };

    return await InternetExplorer.roamAndFind(URL, method, bodyWithToken);
  }

  /**
   *@async
   * Used when posting data to a URL
   * @param {String} URL
   * @param {String} method GET || POST
   * @param {object} body request body
   * @returns {Promise}
   */

  async send(URL, method, body) {
    return await this.roamAndFind(URL, method, body);
  }
}

export default InternetExplorer;
