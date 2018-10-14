const { injectBabelPlugin } = require('react-app-rewired');
const { resolve } = require('path');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], // change importing css to less
    config,
  );
  let alias = config.resolve.alias;
  alias['@'] = resolve(__dirname, './src');
  alias['@c'] = resolve(__dirname, './src/components');
  alias['@u'] = resolve(__dirname, './src/utils');
  alias['@a'] = resolve(__dirname, './src/api');
  alias['@p'] = resolve(__dirname, './src/pages');
  alias['@cm'] = resolve(__dirname, './src/styles/modules');
  return config;
};