/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
/**
 * This lib is to be used to call services of server.
 * To change default url, change constant in setUrl.
 * @module config/api
 * @see components
 */

import Axios from 'axios';
import Constants from '../constants/api';

export default {
  /**
   * Define server url.
   * @function
   * @param {object} input - Server service parameters.
   * @return {string} url with service.
   */
  setUrl(input) {
    return Constants.url.local + input.service + '/';
  },

  /**
   * Define any method which is needed, like:
   * fetch, delete, head, options, post, put, patch
   * @function
   * @param {object} input - Server service parameters.
   * @return {string} Axios request by service url
   */
  useMethod(input) {
    let result = null;
    switch (input.method) {
      case 'get':
        result = Axios.get(this.setUrl(input))
        break;
      case 'post':
        const data = new FormData();
        data.append('file', input.file);
        result = Axios.post(this.setUrl(input), data)
        break;
      default:
        result = 'Axios method is not allowed'
    }
    return result;
  },

  /**
   * Method call get service.
   * @function
   * @param {object} input - Server service parameters.
   * @return {any} Axios request by service url.
   */
  async callService(input) {
    try {
      return await this.useMethod(input);
    } catch (error) {
      // error handler
      return null;
    } finally {
      // hide loading component
    }
  }
}
