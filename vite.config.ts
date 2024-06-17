import react from '@vitejs/plugin-react-swc'
import { always, equals, ifElse, propEq, replace } from 'ramda'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

const getProxyConfig = ifElse(
  propEq('LOCAL', 'VITE_CURRENT_ENV'),
  // @ts-ignore
  (env: ImportMeta['env']) => ({
    [env.VITE_PROXY]: {
      target: env.VITE_BASE_API_URL,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
      secure: false,
      cookiePathRewrite: '/',
      rewrite: replace(/^\/[^/]+/, ''),
    },
  }),
  always(undefined)
)

const externalDependencies = [
  'react',
  'react-dom',
  'react-router-dom',
  'react-router'
]

const plugins = [
  react(),
  svgr({
    svgrOptions: {
      exportType: 'named',
      ref: true,
      svgo: false,
      titleProp: true,
    },
    include: '**/*.svg?react',
  }),
]

export default ({ mode }: { mode: string }) => {
  // @ts-ignore
  const env = loadEnv(mode, process.cwd(), '') as ImportMeta['env']

  return defineConfig({
    base: ifElse(
      equals('production'),
      always('/example-app1/'),
      always('http://localhost:3001/')
    )(mode),
    define: {
      'process.env': env,
    },
    plugins: plugins,
    server: {
      port: 3000,
      strictPort: true,
      proxy: getProxyConfig(env),
    },
    envPrefix: 'VITE_',
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    build: {
      cssCodeSplit: true,
      assetsDir: 'assets',
      emptyOutDir: false,
      rollupOptions: {
        input: 'src/example-service.tsx',
        external: externalDependencies,
        output: {
          entryFileNames: 'example-service.js',
          format: 'system',
        },
        preserveEntrySignatures: 'strict',
      },
    },
  })
}
