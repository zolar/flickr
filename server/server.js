import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import compression from 'compression';

import Flickr from 'flickrapi';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import createDll from '../createDll';
import webpackConfig from './../webpack/config';
import {
  FLICKR_OPTIONS,
  FLICKER_URI,
  SERVICE_IP,
  SERVICE_PORT,
} from './../config';

const IP = process.env.IP || SERVICE_IP;
const PORT = process.env.PORT || SERVICE_PORT;
const DEVELOPMENT = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined);
const MIDDLEWARE_LOGS_OFF = (process.env.MIDDLEWARE_LOGS_OFF === 'true');

const server = express();
// enable gzip compression
server.use(compression());
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'pug');
server.use(morgan('combined'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));

if (DEVELOPMENT) { server.use(express.static('server')); }

Flickr.authenticate(FLICKR_OPTIONS, (error, flickr) => {
  flickr.proxy(server, FLICKER_URI);
});
// only use the webpack middleware during development mode
const useWebpack = (app) => {
  if (DEVELOPMENT) {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
      historyApiFallback : true,
      hot                : true,
      noInfo             : true,
      publicPath         : webpackConfig.output.publicPath,
      stats              : { colors: true },
    }));
    app.use(webpackHotMiddleware(compiler, {
      heartbeat : 10 * 1000,
      log       : console.log,
      path      : '/__webpack_hmr',
    }));
  }
};
// Handle GET request
const catchAll = (app) => {
  app.get('*', (req, res) => {
    const appConfig = {
      development       : DEVELOPMENT,
      middlewareLogsOff : (MIDDLEWARE_LOGS_OFF || !DEVELOPMENT),
    };

    const serverConfig = {
      appConfig,
      pageTitle : 'Welcome to Flickr',
    };

    res.render('index', serverConfig);
  });
};

// start the server when use directly
if (!module.parent) {
  createDll().then(() => {
    useWebpack(server);
    server.use('/js', express.static(path.resolve(__dirname, 'js')));

    catchAll(server);

    const appServer = server.listen(PORT, IP, (err) => {
      if (err) {
        console.error(err);
      }
      if (DEVELOPMENT) {
        console.info(`flickr 🌎  running at http://${appServer.address().address}:${appServer.address().port}`);
      }
    });
  });
}

// export the app as module
export default server;
