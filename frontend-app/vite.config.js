import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import copy from 'rollup-plugin-copy'; // Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Copy the folders to the dist directory
    copy({
      targets: [
        { src: 'src/resources/Sneaker-Images/**/*', dest: 'dist/assets/Sneaker-Images' },
        { src: 'src/resources/Text/**/*', dest: 'dist/assets/Text' },
        { src: 'src/views/automations/**/*', dest: 'dist/automations' }
      ],
      hook: 'writeBundle' // Hook it during the writeBundle phase
    })
  ],
  base: '/helios-sole/', // Ensure the base path matches your repository name
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
