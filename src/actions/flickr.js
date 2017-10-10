/**
 *
 *  Copyright (c) 2015, House of Stylist L.L.C.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 **/

import _get from 'lodash/get';
import dao from './../model/dao';
import { asyncMessageFactory } from './../utils';

const flickrHelper = asyncMessageFactory('flickr');

export const FLICKER_URI = '/flickr';
export const FLICKR_GET_DATA = flickrHelper('GET');
export const FLICKR_SET_CURRENT_INDEX = 'FLICKR_SET_CURRENT_INDEX';

/**
 * @method flickrGetSuccess
 * Handles dispatching request results
 *
 * @param response
 * @param dispatch
 * @returns {Object}
 */
const flickrGetSuccess = (response, dispatch) => {
  if (response && _get(response, 'stat') === 'ok') {
    const data = _get(response, 'photos.photo');
    const total = _get(response, 'photos.pages');
    dispatch({ data, total, type : FLICKR_GET_DATA.success });
    return data;
  }

  dispatch({ error : response, type : FLICKR_GET_DATA.error });
  return response;
};

/**
 * @method flickrGetData
 * async get flickr data action
 *
 * @returns dispatch promise
 */
const flickrGetData = () =>
  (dispatch, getState) => {
    const flickr = _get(getState(), 'flickr');
    const params = flickr.get('requestParams').toJSON();

    dispatch({ type : FLICKR_GET_DATA.begin });

    return dao.postRequest(FLICKER_URI, params)
      .then(response => flickrGetSuccess(response, dispatch))
      .catch((error) => {
        dispatch({ error, type : FLICKR_GET_DATA.error });
        return error;
      });
  };

/**
* @method flickrGetNext
* sets next image to displays index
*
* @returns {Promise}
*/
const flickrGetNext = () =>
  (dispatch, getState) => {
    const flickr = _get(getState(), 'flickr');
    const currentIndex = flickr.get('currentIndex');
    const index = (currentIndex < flickr.get('data').size - 1) ? currentIndex + 1 : currentIndex;
    dispatch({ index, type : FLICKR_SET_CURRENT_INDEX });
  };

/**
* @method flickrGetNext
* sets previous image to displays index
*
* @returns {Promise}
*/
const flickrGetPrevious = () =>
  (dispatch, getState) => {
    const flickr = _get(getState(), 'flickr');
    const currentIndex = flickr.get('currentIndex');
    const index = (currentIndex === 0) ? flickr.get('data').size - 1 : currentIndex - 1;
    dispatch({ index, type : FLICKR_SET_CURRENT_INDEX });
  };

export default {
  flickrGetData,
  flickrGetNext,
  flickrGetPrevious,
};
