import { defineConfig, mergeConfig } from 'vite';
import {
  getBuildConfig,
  getBuildDefine,
  external,
  pluginHotRestart,
} from './vite.base.config.mjs';

// https://vitejs.dev/config
export default defineConfig((env) => {
  /** @type {import('vite').ConfigEnv<'build'>} */
  const forgeEnv = env;
  const { forgeConfigSelf } = forgeEnv;
  const define = getBuildDefine(forgeEnv);
  const config = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry,
        fileName: () => '[name].js',
        formats: ['cjs'],
      },
      rollupOptions: {
        external,
      },
    },
    plugins: [pluginHotRestart('restart')],
    define,
    resolve: {
      // Load the Node.js entry.
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
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

  console.log('++++++', mergeConfig(getBuildConfig(forgeEnv), config));

  return mergeConfig(getBuildConfig(forgeEnv), config);
});
