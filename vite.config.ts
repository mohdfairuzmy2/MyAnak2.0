import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.svg'],
      manifest: {
        name: 'MyAnak',
        short_name: 'MyAnak',
        description: 'Urusan awal, lebih mudah bersama kerajaan',
        theme_color: '#0c2d57',
        background_color: '#eef2f7',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        lang: 'ms',
        icons: [
          {
            src: 'apple-touch-icon.svg',
            sizes: '180x180',
            type: 'image/svg+xml',
          },
          {
            src: 'favicon.svg',
            sizes: '64x64',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
})
