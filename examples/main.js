import Vue from "vue";
import App from "./app.vue";

// import { setHighlighter } from "vue-mark-display";
import { setHighlighter } from "../index";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

// setHighlighter(code => hljs.highlightAuto(code).value);
setHighlighter((code, lang) => {
  if (lang) {
    try {
      return hljs.highlight(lang, code).value;
    } catch (e) {}
  }
  return code;
});

new Vue({
  el: "#app",
  render: h => h(App)
});
