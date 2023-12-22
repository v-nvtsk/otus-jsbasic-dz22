// const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");
const path = require("path");

module.exports = (env) => {
  const blogPages = {
    about: "Об авторе",
    catalog: "Статьи",
    article: "Статья",
    feedback: "Обратная связь",
  };

  const pages = Object.entries(blogPages).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: {
        import: `src/views/pages/${key}.hbs`,
        data: { title: value },
        filename: `${key}/index.html`,
      },
    };
  }, {});

  return {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      clean: true,
      path: path.resolve(__dirname, "dist"),
      filename: "bundle-[contenthash].js",
      assetModuleFilename: "assets/[name]-[contenthash][ext]",
    },
    devServer: {
      port: 3000,
      client: {
        logging: "info",
      },
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|svg|webp|ico)$/i,
          oneOf: [
            // inline image using `?inline` query
            {
              resourceQuery: /inline/,
              type: "asset/inline",
            },
            // auto inline by image size
            {
              type: "asset",
              parser: {
                dataUrlCondition: {
                  maxSize: 1024,
                },
              },
              generator: {
                filename: "assets/img/[name].[hash:8][ext]",
              },
            },
          ],
        },
        {
          test: /\.html$/i,
          include: path.join(__dirname, "src", "pages"),
          loader: "html-loader",
          options: {
            minimize: true,
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            // "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new HtmlBundlerPlugin({
        entry: {
          // define templates here

          index: {
            import: "src/views/pages/index.hbs", // => dist/index.html
            // pass data to template as an object
            data: { title: "Блог" },
            // OR define the data file
            // data: 'src/views/pages/homeData.js',
          },
          ...pages,
        },
        js: {
          // adds JavaScript to the DOM by injecting a `<script>` tag
          inline: true,
          // output filename of compiled JavaScript, used if inline is false
          filename: "[name].[contenthash].js",
        },
        css: {
          // adds CSS to the DOM by injecting a `<style>` tag
          inline: false,
          // output filename of extracted CSS, used if inline is false
          filename: "style.[contenthash].css",
        },
        // use handlebars templating engine
        preprocessor: "handlebars",
        // define handlebars options
        preprocessorOptions: {
          partials: [
            "src/views/partials",
            path.join(__dirname, "src/views/partials"), // absolute path
          ],
          files: ["src/views/pages/partials/*.{partial}"],
          views: [
            "src/views/partials", // relative path
            path.join(__dirname, "src/views/partials"), // absolute path
          ],
        },
      }),
    ],
  };
};
