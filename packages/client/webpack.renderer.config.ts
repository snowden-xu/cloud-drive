import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// Filter out native module rules that inject __dirname (not available in renderer)
const rendererRules = rules.filter((rule) => {
  if (rule && typeof rule === 'object' && 'use' in rule) {
    const use = rule.use;
    if (use && typeof use === 'object' && 'loader' in use) {
      return use.loader !== '@vercel/webpack-asset-relocator-loader';
    }
  }
  return true;
});

export const rendererConfig: Configuration = {
  module: {
    rules: [
      ...rendererRules,
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
