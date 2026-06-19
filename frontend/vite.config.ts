import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Speiler Caddy i prod: /api -> backend, og strip /api-prefikset
  // (backend serverer /users, /experiences uten prefiks).
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5007',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
