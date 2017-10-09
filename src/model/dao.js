/*
  DATA ACCESS OBJECT
*/

class DAO {
  getBasicHeaders = () => ({
    Accept          : 'application/json',
    'cache-Control' : 'no-cache',
    'Content-Type'  : 'application/json',
  })

  /* Normalizes an fetch response */
  normalizeApiResponse = promise => promise.then(res => res.json(), res => res.data);

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
