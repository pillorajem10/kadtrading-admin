const CracoLessPlugin = require('craco-less');
const path = require('path');

const target = 'http://localhost:3007';

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@layout-body-background': '#f4f6fa',
              '@heading-1-size': '30px',
              '@heading-2-size': '20px',
              '@heading-3-size': '15px',
              '@typography-title-margin-top': '0px',
              '@typography-title-margin-bottom': '0px',

              '@disabled-bg': '#cccccc',

              '@input-disabled-color': '#555',

              '@primary-color': '#1479FF',
              '@error-color': '#EE5253',
              '@success-color': '#1DD1A1',

              '@btn-border--base': '0px',
              '@btn-default-color': '@primary-color',
              '@btn-default-border': '@primary-color',
              '@btn-primary-color': '#fff',
              '@btn-primary-bg': '@primary-color',

              '@btn-danger-bg': '@error-color',
              '@btn-danger-border': ' @error-color',

              '@select-item-selected-bg': '@primary-color',
              '@select-item-selected-color': '#fff',
              '@select-selection-item-border-color': '@primary-color',

              '@menu-item-height': '48px',
              '@menu-item-active-bg': '@primary-color',
              '@menu-item-color': '@primary-color',

              '@table-header-bg': '#BBBBBB',
              '@table-header-color': '#fff',
              '@table-header-sort-bg': '#BBB',
              '@table-border-color': '#eee',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule: (lessRule) => {
          lessRule.test = /\.(module)\.(less)$/;
          lessRule.exclude = /node_modules/;

          return lessRule;
        },
        cssLoaderOptions: {
          modules: { localIdentName: '[folder]__[local]_[hash:base64:5]' },
        },
      },
    },
  ],
  webpack: {
    alias: {
      '@images': path.resolve(__dirname, 'src/assets/images'),
      '@styles': path.resolve(__dirname, 'src/assets/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@service': path.resolve(__dirname, 'src/service'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    },
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: '@svgr/webpack',
        options: {
          babel: false,
          icon: true,
        },
      },
    ],
  },
  devServer: {
    proxy: [
      {
        context: [
          '/account',
          '/stripe',
          '/vsers',
          '/common-api',
          '/product-api-v2',
          '/merchants',
          '/categories',
          '/feed',
          '/transactions',
          '/calcv',
          '/curr',




        ],
        target,
        changeOrigin: true,
      },
    ],
  },
};
