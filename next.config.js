/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
    domains: [
      {
        domain: process.env.DOMAIN,
        defaultLocale: "en",
      },
      {
        domain: process.env.DOMAIN + "/ar",
        defaultLocale: "ar",
        http: true,
      },
    ],
    trailingSlash: true,
  },
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};
