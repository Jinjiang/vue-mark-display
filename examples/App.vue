<template>
  <v-mark-display
    keyboard-ctrl
    url-hash-ctrl
    auto-font-size
    base-url="http://github.com/"
    support-preview
    :markdown="data"
    @title="setTitle"
    ref="display"
  ></v-mark-display>
</template>

<script>
import Hammer from "hammerjs";
import VMarkDisplay from "../index";
import data from "./data.js";

export default {
  components: { VMarkDisplay },
  data() {
    return { data };
  },
  mounted() {
    const mc = new Hammer(this.$el);
    const display = this.$refs.display;
    mc.on("swipe", event => {
      if (event.pointerType === "mouse") {
        return;
      }
      switch (event.direction) {
        case Hammer.DIRECTION_LEFT:
          display.goNext();
          return;
        case Hammer.DIRECTION_RIGHT:
          display.goPrev();
          return;
      }
    });
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
