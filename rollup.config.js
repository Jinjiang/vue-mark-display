import vue from "rollup-plugin-vue";

export default {
  input: "index.js",
  output: {
    file: "dist/markshow.js",
    format: "esm"
  },
  external: ["vue"],
  plugins: [vue()]
};
