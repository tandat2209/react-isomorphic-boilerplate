import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app/App.react';
import NotFound from './components/app/NotFound.react';

const routes = (
  <Route path="/" component={ App }>
    {/* Your routes here */}
    <Route path="*" component={ NotFound } />
  </Route>
)

export default routes;
