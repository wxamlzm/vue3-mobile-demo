import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import postPxToRem from 'postcss-pxtorem'

// https://vite.dev/config/
export default defineConfig(({}) => {
  return {
    plugins: [vue(), vueDevTools()],
    css: {
      postcss: {
        plugins: [
          postPxToRem({
            rootValue: ({ file }) => {
              return file?.includes('vant') ? 5 : 10
            },
            unitPrecision: 2,
            propList: ['*'],
            selectorBlackList: ['.ignore'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 2,
            exclude: 'node_modules/(?!vant)',
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
