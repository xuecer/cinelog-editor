import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React 核心
          "react-vendor": ["react", "react-dom"],
          // Slate 编辑器核心
          "slate-vendor": ["slate", "slate-react", "slate-history"],
          // UI 组件库
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tabs",
            "lucide-react",
          ],
        },
      },
    },
    // 启用压缩
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除 console
        drop_debugger: true,
      },
    },
  },
});
