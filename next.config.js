const path = require('path');
const loaderUtils = require('loader-utils');

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

module.exports = {
  trailingSlash: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config, { dev }) {
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

    return config;
  },
};
