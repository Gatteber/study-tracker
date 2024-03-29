import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/users/auth': 'http://localhost:5000',
      '/api/users/logout': 'http://localhost:5000',
      '/api/users/profile': 'http://localhost:5000',
      '/api/users/': 'http://localhost:5000',
      '/api/study-sessions': 'http://localhost:5000',
      '/api/study-sessions/new': 'http://localhost:5000',
    },
  },
});
