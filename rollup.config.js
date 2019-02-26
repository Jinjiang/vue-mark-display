import vue from "rollup-plugin-vue";

export default {
  input: "index.js",
  output: {
    file: "dist/v-mark-display.js",
    format: "esm"
  },
  external: ["vue"],
  plugins: [vue()]
};
