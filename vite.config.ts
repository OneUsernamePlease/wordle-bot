import { defineConfig } from 'vite';
export default defineConfig({
    root: 'src',
    // Configure build options
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            input: "index.html",
        },
    },
    //base: "/wordle-bot"
});
