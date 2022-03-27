/** @type {import('next').NextConfig} */
import { ProvidePlugin } from "webpack";

export const reactStrictMode = true;
export const i18n = {
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
};
export const trailingSlash = true;
export function webpack(config) {
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
              new ProvidePlugin({
                fetch: path.resolve(
                  path.join(__dirname, "node_modules/isomorphic-fetch/fetch-npm-node")
                ),
              }),
            ],
          },
        },
      },
    ],
  });

  return config;
}
