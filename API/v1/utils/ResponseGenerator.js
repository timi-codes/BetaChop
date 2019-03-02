import Utility from './helpers';
/**
 * a class for api response
 */
class ResponseGenerator {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  /**
   * @description set Api response for 200 & 201
   *  @param{int} statusCode
   * @param {object} data
   */

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;

    this.type = 'success';
  }

  /**
   * @description set Api response for 400, 401, 403, 404, 503
   *  @param{int} statusCode
   * @param {object} data
   */

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  /**
   * Sends response
   * @param {object} res
   * @returns {object} responseObject
   */
  send(res) {
    const filteredResponse = Utility.stripNull({
      status: this.type,
      message: this.message,
      data: this.data,
    });

    if (this.type === 'success') {
      return res.status(this.statusCode).json(filteredResponse);
    }
    // Here this.type === 'error'
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
  }
}

export default ResponseGenerator;
