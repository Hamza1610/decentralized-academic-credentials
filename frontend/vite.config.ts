import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath, URL } from 'url';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';
import { componentTagger } from "lovable-tagger";

// Load environment variables
dotenv.config({ path: '../../.env' });

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: true,
    // Add build optimization for better compatibility
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'dfinity-vendor': ['@dfinity/agent', '@dfinity/principal'],
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
    // Add specific dependencies that need to be pre-bundled
    include: [
      'react',
      'react-dom',
      '@dfinity/agent',
      '@dfinity/principal',
    ],
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxy
      },
    },
  },
  plugins: [
    react({
      // Add specific React plugin options
      jsxImportSource: 'react',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
        ],
      },
    }),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "declarations": fileURLToPath(
        new URL("../declarations", import.meta.url)
      ),
    },
    dedupe: ['@dfinity/agent'],
  },
  // Add specific handling for Node.js built-ins
  define: {
    'process.env': process.env,
  },
}));