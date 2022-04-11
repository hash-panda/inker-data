import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import copy from 'rollup-plugin-copy'

export default defineConfig({
    mode: 'production',
    plugins: [
        vue(),
        vueJsx(),
        svgLoader({ svgoConfig: {} }),
        // copy({
        //   targets: [
        //     {
        //       src: 'src/assets/favicon.ico',
        //       dest: 'dist/',
        //     }, //执行拷贝
        //   ],
        //   hook: 'writeBundle',
        // }),
    ],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, '../src'),
            },
            {
                find: 'assets',
                replacement: resolve(__dirname, '../src/assets'),
            },
            {
                find: 'vue-i18n',
                replacement: 'vue-i18n/dist/vue-i18n.cjs.js', // Resolve the i18n warning issue
            },
            {
                find: 'vue',
                replacement: 'vue/dist/vue.esm-bundler.js', // compile template. you can remove it, if you don't need.
            },
        ],
        extensions: ['.ts', '.js'],
    },
    define: {
        'process.env': {},
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                //生产环境时移除console
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
})
