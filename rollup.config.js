import vue from "rollup-plugin-vue";

export default {
  input: "src/markshow.vue",
  output: {
    file: "dist/markshow.js",
    format: "esm"
  },
  external: ["vue"],
  plugins: [vue()]
};
