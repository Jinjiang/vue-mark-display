<template>
  <v-markshow keyboard-ctrl url-hash-ctrl auto-font-size></v-markshow>
</template>

<script>
import VMarkshow from "../src/markshow.vue";
export default {
  components: { VMarkshow }
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
