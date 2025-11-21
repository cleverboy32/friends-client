import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        server: {
            host: '0.0.0.0',
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    // 使用环境变量 VITE_APP_API_URL 作为目标地址
                    target: env.VITE_APP_API_URL,
                    // 3. 路径重写（去除代理前缀，转发给后端）
                    rewrite: (path) => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
                    // 4. 支持跨域
                    changeOrigin: true,
                    // 5. 如果是 HTTPS 目标，需要设置 secure: false
                    // secure: false,
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
    };
});
