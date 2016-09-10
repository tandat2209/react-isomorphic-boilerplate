import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';

const app = express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {

  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    // pretty colored output
    stats: { colors: true }
  }));
  app.use(webpackHotMiddleware(compiler));
} else{
  // Include static assets. Not advised for production
  app.use(express.static(path.join(__dirname, 'public')));
}

import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../src/routes';
import configureStore from '../src/configureStore';

const renderPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title> React Isomorphic Boilerplate </title>
        <!-- roboto google font for material-ui -->
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="${config.output.publicPath ? config.output.publicPath : ""}${config.output.filename}"></script>
      </body>
    </html>
  `
}


app.use((req, res, next)=>{
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }
    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }
    if (!renderProps) {
      return next();
    }
    const store = configureStore();
    const initialView = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );
    const finalState = store.getState();

    try{
      const html = renderPage(initialView, finalState);
      const status = renderProps.routes.some(route => route.path === '*') ? 404 : 200;
      res.status(status).send(html);
    } catch(err){
      next(err);
    }
  })
})

app.listen(8000, (error) => {
  if (!error) {
    console.info(`Server is running on 8000!`);
  }
});

export default app;
