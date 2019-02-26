<!--
  - inject: current, slides
  - data: visible, adminMode
  - methods: toggle(), change(page)
  - events: change({ page })
-->

<template>
  <div class="ctrl">
    <transition>
      <ol v-if="ctrl.shown" class="ctrl-list">
        <li
          v-for="(slide, index) in computedSlides"
          :key="index"
          :class="{ current: computedCurrentPage === index + 1 }"
          @click="change(computedCurrentPage);"
        >
          {{ adminMode || slide.visited ? slide.title : "[slide]" }}
        </li>
      </ol>
    </transition>
    <button class="ctrl-btn" @click="toggle">
      {{ current + 1 }} / {{ slides.length }}
    </button>
  </div>
</template>

<script>
import injectedMixin from "./injected";

export default {
  mixins: [injectedMixin],
  data() {
    return {
      visible: false,
      adminMode: false,
      mounted: false
    };
  },
  methods: {
    toggle(event) {
      this.visible = !this.visible;
      this.adminMode = event.altKey;
      event.stopPropagation();
    },
    change(page) {
      this.$emit("change", { page });
    }
  },
  mounted() {
    const clickHandler = event => {
      this.visible = false;
    };
    document.addEventListener("click", this.clickHandler);
    this.clickHandler = clickHandler;
  },
  destroyed() {
    const { clickHandler } = this;
    if (clickHandler) {
      delete this.clickHandler;
      document.removeEventListener("click", clickHandler);
    }
  }
};
</script>

<style>
/* todo */
</style>
