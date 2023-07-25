import type { StorybookConfig } from '@storybook/react-webpack5';
import { VanillaExtractPlugin } from '@vanilla-extract/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true,
  },
  // Add this for Vanilla Extract
  webpackFinal(config) {
    // Add Vanilla-Extract and MiniCssExtract Plugins
    config.plugins?.push(
      new VanillaExtractPlugin(),
      new MiniCssExtractPlugin(),
    );
    // Exclude vanilla extract's "*.vanilla.css" files from other "*.css" processing
    config.module?.rules?.forEach((rule) => {
      if (
        typeof rule !== 'string' &&
        rule.test instanceof RegExp &&
        rule.test.test('test.css')
      ) {
        rule.exclude = /\.vanilla\.css$/i;
      }
    });
    config.module?.rules?.push({
      // Targets only CSS files generated by vanilla-extract
      test: /\.vanilla\.css$/i,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: require.resolve('css-loader'),
          options: {
            // Required as image imports should be handled via JS/TS import statements
            url: false,
          },
        },
      ],
    });
    return config;
  },
};
export default config;
