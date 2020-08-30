import express from 'express';
import webpack from 'webpack';
import path from 'path';
import MemoryFs from 'memory-fs';
import requireFromString from 'require-from-string';
import ssrConfig from '../config/webpack.server.dev';

const app = express();
const fs = new MemoryFs();

const compiler = webpack(ssrConfig);
compiler.outputFileSystem = fs;

const outputErrors = (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();
  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
};

compiler.run((err, stats) => {
  outputErrors(err, stats);

  const contents = fs.readFileSync(
    path.resolve(ssrConfig.output.path, ssrConfig.output.filename),
    'utf8'
  );

  const result = requireFromString(contents, ssrConfig.output.filename);
//   console.log('result:', result);
  app.get('*', result.default);

  app.listen('3000', () => {
    console.log('Server is listening on port 3000');
  });
});
