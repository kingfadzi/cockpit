import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  // Dev server proxy only during `vite dev`
  const devServer = (command === 'serve')
      ? {
        host: '0.0.0.0',
        port: 5174,
        proxy: {
          '/api': {
            target: env.VITE_API_BASE || 'http://mars:8181',
            changeOrigin: true,
            secure: false,
          },
          '/audit': {
            target: env.VITE_AUDIT_API_BASE || 'http://localhost:8081',
            changeOrigin: true,
            secure: false,
          },
        },
      }
      : undefined;

  return {
    plugins: [react()],
    server: devServer,
  };
});
