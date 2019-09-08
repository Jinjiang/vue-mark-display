import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import vue from "rollup-plugin-vue";

const genConfig = (format = "cjs") => ({
  input: "index.js",
  output: {
    file: `dist/vue-mark-display.${format}.js`,
    format
  },
  external: ["vue"],
  plugins: [nodeResolve({ jsnext: true }), commonjs(), vue()]
});

export default [genConfig("cjs"), genConfig("esm")];
