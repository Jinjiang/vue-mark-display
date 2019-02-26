<template>
  <v-markshow
    keyboard-ctrl
    url-hash-ctrl
    auto-font-size
    :markdown="data"
    @title="setTitle"
  ></v-markshow>
</template>

<script>
import VMarkshow from "../src/markshow.vue";
import data from "./data.js";

export default {
  components: { VMarkshow },
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
