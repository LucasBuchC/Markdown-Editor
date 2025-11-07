import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  
  build: {
    // Otimizações de bundle
    minify: 'esbuild',
    target: 'esnext',
    
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'editor': ['@uiw/react-md-editor'],
          'charts': ['chart.js', 'react-chartjs-2'],
        }
      }
    },
    
    // Assets
    assetsInlineLimit: 4096,
    assetsDir: 'assets',
    
    // Reportar tamanho final
    reportCompressedSize: true,
    
    // Sourcemaps apenas em desenvolvimento
    sourcemap: false,
  },
  
  // Otimizações de servidor de desenvolvimento
  server: {
    headers: {
      'Cache-Control': 'public, max-age=0'
    }
  },
  
  // Otimizações de pré-processamento
  optimizeDeps: {
    include: ['react', 'react-dom', '@uiw/react-md-editor']
  }
})
