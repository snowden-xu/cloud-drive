import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export const rendererConfig: Configuration = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin({ logger: 'webpack-infrastructure' })],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
