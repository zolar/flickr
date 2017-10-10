import { Map as iMap } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  FLICKR_GET_DATA,
  FLICKR_SET_CURRENT_INDEX,
} from './../actions/flickr';

/**
 * Flickr Reducer
 * state domain: /flickr
 *
 */
export const INITIAL_STATE = iMap({
  currentIndex  : 0,
  data          : [],
  requestParams : iMap({
    method   : 'flickr.photos.search',
    page     : 1,
    per_page : 10,
    text     : 'Seattle',
  }),
});

/**
* @method flickrGetDataBegin
* Sets loading state
*
* @param state
* @returns {Object}
*/
const flickrGetDataBegin = state => state.merge({
  error     : null,
  isLoading : true,
});

/**
 * @method flickrGetDataError
 * Stores error response and stops loading state
 *
 * @param state
 * @param actions
 * @returns {Object}
 */
const flickrGetDataError = (state, actions) => state.merge({
  error     : actions.error,
  isLoading : false,
});

/**
 * @method flickrGetDataSuccess
 * Stores response data and increments the request params for next request
 *
 * @param state
 * @param actions
 * @returns {Object}
 */
const flickrGetDataSuccess = (state, actions) => {
  const requestParams = state.get('requestParams');
  return state.merge({
    data          : [...state.get('data'), ...actions.data],
    error         : null,
    isLoading     : false,
    requestParams : requestParams.merge({ page : requestParams.get('page') + 1 }),
    totalPages    : actions.total,
  });
};

/**
 * @method flickrSetCurrentIndex
 * Stores new index
 *
 * @param state
 * @param actions
 * @returns {Object}
 */
const flickrSetCurrentIndex = (state, action) => state.merge({ currentIndex : action.index });

/**
 * Export all actions you want handled
 */
export default handleActions({
  [FLICKR_GET_DATA.begin]    : flickrGetDataBegin,
  [FLICKR_GET_DATA.error]    : flickrGetDataError,
  [FLICKR_GET_DATA.success]  : flickrGetDataSuccess,
  [FLICKR_SET_CURRENT_INDEX] : flickrSetCurrentIndex,
}, INITIAL_STATE);
