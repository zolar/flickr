/*
  DATA ACCESS OBJECT
*/

class DAO {
  /**
  * @method getBasicHeaders
  * Returns header object
  *
  * @param promise
  * @returns headers object
  */
  getBasicHeaders = () => ({
    Accept          : 'application/json',
    'cache-Control' : 'no-cache',
    'Content-Type'  : 'application/json',
  })

  /**
   * @method normalizeApiResponse
   * Normalizes an fetch response
   *
   * @param promise
   * @returns data object
   */
  normalizeApiResponse = promise => promise.then(res => res.json(), res => res.data);

  /**
  * @method postRequest
  * Sets post request
  *
  * @param promise
  * @returns request response
  */
  postRequest = (url = '', params = {}) => {
    const postObj = {
      body    : JSON.stringify(params),
      method  : 'POST',
      headers : this.getBasicHeaders(),
    };

    return this.normalizeApiResponse(fetch(url, postObj));
  }
}

const dao = new DAO();
export default dao;
