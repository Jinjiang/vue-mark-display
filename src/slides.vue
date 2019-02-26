<!--
  - inject: current, slides
  - events: preview({ url })
-->

<template>
  <transition-group tag="div" class="slides" name="slide" @click="catchPreview">
    <div
      v-for="(slide, index) in computedSlides"
      :key="index"
      v-show="computedCurrentPage === index + 1"
      class="slide"
    >
      <div :style="slide.meta.style" v-html="slide.html" />
    </div>
  </transition-group>
</template>

<script>
import injectedMixin from "./injected";

export default {
  mixins: [injectedMixin],
  methods: {
    catchPreview(event) {
      const {
        target: { tagName, href },
        altKey
      } = event;
      if (altKey) {
        if (tagName === "A") {
          event.preventDefault();
          this.$emit("preview", { url: href });
        }
      }
    }
  }
};
</script>

<style>
/* todo */
</style>
