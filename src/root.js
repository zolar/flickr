/**
 * Root component used to attach actions
 **/

import React from 'react';
//
import {
  connect,
  Provider,
} from 'react-redux';
//
import { bindActionCreators } from 'redux';

import Main from './views/Main';
import store from './store';
import actions from './actions';

const mapStateToProps = state => ({ store : state });
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const MainWithRedux = connect(mapStateToProps, mapDispatchToProps)(Main);

export default () => (
  <Provider store={store}>
    <MainWithRedux />
  </Provider>
);
