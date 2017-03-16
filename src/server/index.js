// @flow
import path from 'path';
import express from 'express';
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { templateString } from './template';
import movieApp from '../client/reducers';
import { renderToString } from 'react-dom/server';

const app = express();
const port: number = +(process.env.PORT || '4000');

let bundleUrl = `http://localhost:${port}/static/client.js`;

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const config = require('../../webpack.client-hot.config');
  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true },
  }));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  const staticDir = path.join(__dirname, 'dist/client');
  app.use('/static', express.static(staticDir));
}

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(counterApp)

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
}


app.get('/*', (req, res) => { 

  const t = templateString.replace('{{BUNDLE_URL}}', bundleUrl);
  res.set('content-type', 'text/html');
  res.send(t);
});

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
