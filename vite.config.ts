/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { always, equals, ifElse, propEq, replace } from 'ramda'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'
import { swcReactRefresh } from 'vite-plugin-swc-react-refresh'

const getProxyConfig = ifElse(
  propEq('LOCAL', 'VITE_CURRENT_ENV'),
  // @ts-ignore
  (env: ImportMeta['env']) => ({
    [env.VITE_PROXY]: {
      target: env.VITE_TICKETS_BASE_API_URL,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      secure: false,
      cookiePathRewrite: '/',
      rewrite: replace(/^\/[^/]+/, '')
    }
  }),
  always(undefined)
)

const externalDependencies = [
  'react',
  'react-dom',
  'react-router-dom',
  'react-router',
  'effector',
  'effector-react'
]

const plugins = [
  react(),
  svgr({
    svgrOptions: {
      exportType: 'named',
      ref: true,
      svgo: false,
      titleProp: true
    },
    include: '**/*.svg?react'
  })
]

export default ({ mode }: { mode: string }) => {
  // @ts-ignore
  const env = loadEnv(mode, process.cwd(), '') as ImportMeta['env']

  return defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './setupTests.ts',
      css: true
    },
    base: ifElse(
      equals('production'),
      always('/react-app/'),
      always('/')
    )(mode),
    define: {
      'process.env': env
    },
    plugins: [...plugins, mode === 'development' ? null : swcReactRefresh()],
    server: {
      port: 3000,
      strictPort: true,
      proxy: getProxyConfig(env)
    },
    envPrefix: 'VITE_',
    resolve: {
      alias: [{ find: '@', replacement: '/src' }]
    },
    esbuild: {
      jsx: 'automatic'
    },
    build: {
      cssCodeSplit: true,
      assetsDir: 'assets',
      emptyOutDir: false,
      rollupOptions: {
        input: 'src/example-react.tsx',
        external: externalDependencies,
        output: {
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name].[ext]',
          format: 'module'
        },
        preserveEntrySignatures: 'strict'
      }
    }
  })
}
