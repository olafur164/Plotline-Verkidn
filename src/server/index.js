// @flow
import path from 'path';
import express from 'express';
import { templateString } from './template';
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


app.get('/*', (req, res) => { 

  const t = templateString.replace('{{BUNDLE_URL}}', bundleUrl);
  res.set('content-type', 'text/html');
  res.send(t);
});

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
