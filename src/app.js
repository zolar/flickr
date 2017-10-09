/* eslint global-require: "off" */
import React from 'react';
import ReactDOM from 'react-dom';

import es6promise from 'es6-promise';
import { AppContainer } from 'react-hot-loader';

import Root from './root';

if (process.env.NODE_ENV === 'development') { require('react-hot-loader/patch'); }

require('isomorphic-fetch');

es6promise.polyfill();

const HotLoadRoot = require('./root');
// Needed React DevTools
if (typeof window !== 'undefined') { window.React = React; }


const mainElement = document.getElementById('main');

const renderApp = RootComponent => ReactDOM.render(
  <AppContainer>
    <RootComponent />
  </AppContainer>,
  mainElement,
);

// Call render to attach app to the main element
renderApp(Root);

if (module.hot) {
  module.hot.accept('./root', () => renderApp(HotLoadRoot.default));
}
