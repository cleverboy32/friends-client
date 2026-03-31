import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'https://www.meetu.online',
                changeOrigin: true,
            },
            '/ws': {
                target: 'wss://www.meetu.online',
                ws: true,
            },
        },
    },
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/components': path.resolve(__dirname, './src/components'),
            '@/pages': path.resolve(__dirname, './src/pages'),
            '@/assets': path.resolve(__dirname, './src/assets'),
            '@/types': path.resolve(__dirname, './src/types'),
            '@/enum': path.resolve(__dirname, './src/enum'),
        },
    },
    build: {
        // 减少内存使用的构建配置
        target: 'es2015',
        minify: 'esbuild', // esbuild比terser内存使用更少
        rollupOptions: {
            output: {
                manualChunks: {
                    // 分割大模块，减少单个chunk的内存使用
                    vendor: ['react', 'react-dom'],
                    ui: ['@headlessui/react', '@heroicons/react'],
                    utils: ['axios', 'zustand'],
                },
            },
        },
        // 禁用source map以节省内存
        sourcemap: false,
        // 减少chunk大小限制
        chunkSizeWarningLimit: 1000,
    },
});
