/**
 * a class for api response
 */
class ResponseGenerator {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = [] || {};
    this.message = null;
  }

  /**
   * @description set Api response for 200 & 201
   *  @param{int} statusCode
   * @param {object} data
   */

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    if (message != null) {
      this.message = message;
    }
    if (data != null) {
      this.data = data;
    }
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
    if (this.type === 'success') {
      return res.status(this.statusCode).json({
        status: this.type,
        message: this.message,
        data: this.data,
      });
    }
    // Here this.type === 'failure'
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
  }

  exec() {}
}

export default ResponseGenerator;
