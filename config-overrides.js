const { injectBabelPlugin } = require('react-app-rewired');
const { resolve } = require('path');


module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }, 'antd'],
    config,
  );
  config = injectBabelPlugin(
    ['import', { libraryName: 'ant-design-pro', libraryDirectory: 'lib', style: 'css', camel2DashComponentName: false }, 'ant-design-pro'], 
    config,
  );
  config = injectBabelPlugin(
    ["@babel/plugin-proposal-decorators", { "legacy": true }], 
    config,
  );
  let alias = config.resolve.alias;
  alias['@'] = resolve(__dirname, './src');
  alias['@l'] = resolve(__dirname, './src/layouts');
  alias['@c'] = resolve(__dirname, './src/components');
  alias['@u'] = resolve(__dirname, './src/utils');
  alias['@a'] = resolve(__dirname, './src/api');
  alias['@p'] = resolve(__dirname, './src/pages');
  alias['@cm'] = resolve(__dirname, './src/styles/modules');
  alias['@m'] = resolve(__dirname, './src/models');
  return config;
};