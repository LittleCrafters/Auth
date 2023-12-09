import { ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import svgLoader from 'vite-svg-loader';
import { createHtmlPlugin } from 'vite-plugin-html';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { APP_PORT, APP_NAME } = loadEnv(mode, __dirname, '');
  return {
    base: './',
    plugins: [
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: APP_NAME,
          },
        },
      }),
      vue(),
      svgLoader(),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@root': __dirname,
      },
    },
    envPrefix: 'APP_',
    server: {
      port: Number(APP_PORT),
    },
    build: {
      target: 'ESNext',
      chunkSizeWarningLimit: 2000,
    },
  };
};
