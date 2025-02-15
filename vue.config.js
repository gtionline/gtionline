module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/gtionline' : '/',
  chainWebpack: (config) => {
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]',
      });
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @use "@/styles/_variables" as *;
          @use "@/styles/_main" as *;
        `,
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.ts', '.vue', '.json'],
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
    devServer: {
      client: {
        logging: 'warn',
      },
      watchFiles: {
        options: {
          usePolling: true,
        },
      },
    },
  },
};
