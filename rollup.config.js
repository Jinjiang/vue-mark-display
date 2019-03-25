import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import vue from "rollup-plugin-vue";

export default {
  input: "index.js",
  output: {
    file: "dist/vue-mark-display.js",
    format: "esm"
  },
  external: ["vue"],
  plugins: [nodeResolve({ jsnext: true }), commonjs(), vue()]
};
