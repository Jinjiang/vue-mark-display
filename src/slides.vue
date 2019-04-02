<template>
  <transition-group
    tag="div"
    class="slides"
    name="slide"
    @click.native="catchPreview"
  >
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: all 0.3s;
}
.slide-enter {
  opacity: 0;
}
.slide-leave-to {
  opacity: 0;
}

@page {
  size: legal landscape;
  margin: 0;
}
@media print {
  .slide {
    break-after: always;
    page-break-after: always;
    overflow: hidden;
    position: relative;
    display: block !important;
    opacity: 1 !important;
  }
}

.slide-content {
  height: 100vh;
  box-sizing: border-box;
  padding: 5vh 5vw;
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
