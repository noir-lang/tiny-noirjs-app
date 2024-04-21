import { defineConfig } from "vite";
import copy from "rollup-plugin-copy";

export default defineConfig({
  esbuild: {
    target: "esnext",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
    },
  },
  plugins: [
    copy({
      targets: [
        { src: "node_modules/**/*.wasm", dest: "node_modules/.vite/dist" },
      ],
      copySync: true,
      hook: "buildStart",
    }),
  ],
  server: {
    port: 3000,
  },
});
