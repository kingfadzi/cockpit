import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external access
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE || 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/audit': {
        target: process.env.VITE_AUDIT_API_BASE || 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
