import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    optimizeDeps: {
        include: ['@powersync/web > js-logger'],
        exclude: ['@journeyapps/wa-sqlite', '@powersync/web'],
    },
    plugins: [wasm(), topLevelAwait(), tailwindcss()],
    worker: {
        format: 'es',
        plugins: () => [wasm(), topLevelAwait()],
    },
});
