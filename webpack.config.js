// const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  return {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle-[contenthash].js',
      assetModuleFilename: "assets/[name]-[contenthash][ext]",
    },
    devServer: {
      port: 3000,
      client: {
        logging: 'info',
      },
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          include: path.join(__dirname, 'src', 'pages'),
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
        }
      ]
    },
    plugins: [
      new HtmlBundlerPlugin({
        entry: {
          // define templates here
          index: {
            import: 'src/views/pages/index.hbs', // => dist/index.html
            // pass data to template as an object
            data: { title: 'Главная' },
            // OR define the data file
            // data: 'src/views/pages/homeData.js',
          },
          article: {
            import: 'src/views/pages/article.hbs',
            data: { title: 'Статья' },
            filename: "article/index.html"
          },
          catalog: {
            import: 'src/views/pages/catalog.hbs',
            data: { title: 'Статьи' },
            filename: "catalog/index.html"
          },
          feedback: {
            import: 'src/views/pages/feedback.hbs',
            data: { title: 'Обратная связь' },
            filename: "feedback/index.html"
          }
        },
        css: {
          // adds CSS to the DOM by injecting a `<style>` tag
          inline: false,
          // output filename of extracted CSS, used if inline is false
          filename: 'style.[contenthash].css',
        },
        // use handlebars templating engine
        preprocessor: 'handlebars',
        // define handlebars options
        preprocessorOptions: {
          partials: ['src/views/partials'],
          // helpers: {
          //   arraySize: (array) => array.length,
          // },
        },
      }),
    ]
  }
};