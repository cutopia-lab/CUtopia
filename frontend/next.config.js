const path = require('path');
const loaderUtils = require('loader-utils');
const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */

// based on https://github.com/vercel/next.js/blob/0af3b526408bae26d6b3f8cab75c4229998bf7cb/packages/next/build/webpack/config/blocks/css/loaders/getCssModuleLocalIdent.ts
const hashOnlyIdent = (context, _, exportName) =>
  loaderUtils
    .getHashDigest(
      Buffer.from(
        `filePath:${path
          .relative(context.rootContext, context.resourcePath)
          .replace(/\\+/g, '/')}#className:${exportName}`
      ),
      'md4',
      'base64',
      7
    )
    .replace(/^(-?\d|--)/, '_$1')
    .split('+')
    .join('_')
    .split('/')
    .join('_');

const moduleExports = {
  env: {
    REACT_APP_ENV_MODE: process.env.REACT_APP_ENV_MODE,
    REACT_APP_LAST_DATA_UPDATE: process.env.REACT_APP_LAST_DATA_UPDATE,
    REACT_APP_CURRENT_TERM: process.env.REACT_APP_CURRENT_TERM,
  },
  trailingSlash: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config, { dev }) {
    if (!dev) {
      const rules = config.module.rules
        .find(rule => typeof rule.oneOf === 'object')
        .oneOf.filter(rule => Array.isArray(rule.use));

      rules.forEach(rule => {
        rule.use.forEach(moduleLoader => {
          if (
            moduleLoader.loader?.includes('css-loader') &&
            !moduleLoader.loader?.includes('postcss-loader')
          )
            moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
        });
      });
    }

    return config;
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
