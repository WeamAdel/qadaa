/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en-US", "ar"],
    defaultLocale: "en-US",
    domains: [
      {
        domain: process.env.DOMAIN,
        defaultLocale: "en-US",
      },
      {
        domain: process.env.DOMAIN + "/ar",
        defaultLocale: "ar",
        http: true,
      },
    ],
  },
};
