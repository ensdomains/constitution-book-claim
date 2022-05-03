const withTM = require("next-transpile-modules")(["@mapbox/search-js-react"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      include: [options.dir],
      use: [
        "next-swc-loader",
        {
          loader: "@svgr/webpack",
          options: {
            babel: false,
            svgo: true,
            replaceAttrValues: {
              "#000": "currentColor",
              black: "currentColor",
            },
            svgoConfig: {
              multipass: true,
            },
            titleProp: true,
            jsx: {
              babelConfig: {
                plugins: [
                  [
                    "@svgr/babel-plugin-remove-jsx-attribute",
                    {
                      elements: ["path"],
                      attributes: ["className", "strokeWidth"],
                    },
                  ],
                ],
              },
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = withTM(nextConfig);
