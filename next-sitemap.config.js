/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'cutopia.app',
  generateRobotsTxt: true, // (optional)
  // ...other options
};

module.exports = config;
