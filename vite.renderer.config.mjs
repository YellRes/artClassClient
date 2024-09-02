import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config.mjs';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config
export default defineConfig((env) => {
  /** @type {import('vite').ConfigEnv<'renderer'>} */
  const forgeEnv = env;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';

  /** @type {import('vite').UserConfig} */
  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [pluginExposeRenderer(name), vue()],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
    server: {
      proxy: {
        "/client": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/client/, ''),
        },
      },
    }
  };
});
