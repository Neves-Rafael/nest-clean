import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.e2e-test.ts"],
    globals: true,
    root: "./",
    setupFiles: ["./test/setup-e2e.ts"],
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
});
