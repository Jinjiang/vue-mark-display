<template>
  <v-mark-display
    keyboard-ctrl
    url-hash-ctrl
    auto-font-size
    base-url="http://github.com/"
    support-preview
    :markdown="data"
    @title="setTitle"
  ></v-mark-display>
</template>

<script>
import VMarkDisplay from "../index";
import data from "./data.js";

export default {
  components: { VMarkDisplay },
  data() {
    return { data };
  },
  methods: {
    setTitle({ title }) {
      document.title = [title, "Example"].filter(Boolean).join(" - ");
    }
  }
};
</script>

<style>
body {
  margin: 0;
  overflow: hidden;
}
</style>

<style>
.slides {
  background-color: #f5f5f5;
  font-family: Eurostile, Optima, Helvetica;
  color: #444;
  text-shadow: 0 0 0.25em #ccc;
}
.slides blockquote,
q {
  font-family: Skia;
}
.slides blockquote,
.slides small {
  font-size: 0.6em;
}
</style>
