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
      <div
        class="slide-content"
        :style="slide.meta.slideStyle"
        v-html="slide.html"
      ></div>
    </div>
  </transition-group>
</template>

<script>
import { mixinInjected } from "./util";

export default {
  mixins: [mixinInjected],
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
.slide {
  transform-origin: center center;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.slide-enter {
  opacity: 0; /* transform: scale(0.8); */
}
.slide-leave-to {
  opacity: 0; /* transform: scale(1.2); */
}
@media print {
  /* @page {size: landscape; margin: 0;} */
  .slide {
    page-break-after: always;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    display: block !important;
    opacity: 1 !important;
  }
}
.slide-content {
  height: 100%;
  box-sizing: border-box;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  transition: background 0.3s;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
