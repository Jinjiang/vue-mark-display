<!--
  - inject: current, slides
  - data: visible, adminMode
  - methods: toggle(), change(page)
  - events: change({ page })
-->

<template>
  <div class="ctrl">
    <transition name="ctrl-list">
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
.ctrl {
  position: absolute;
  left: 20px;
  bottom: 20px;
  font-size: 16px;
  opacity: 0.5;
  transition: opacity 0.3s;
}
.ctrl:hover {
  opacity: 1;
}
.ctrl-btn {
  display: block;
}
.ctrl-list-enter {
  opacity: 0;
  transform: translateY(20px);
}
.ctrl-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.ctrl-list {
  transition: opacity 0.3s, transform 0.3s;
  overflow: auto;
  width: 160px;
  max-height: 300px;
  border: 1px solid gray;
  box-shadow: 0 0 3px 3px silver;
  padding: 3px;
  background-color: white;
}
.ctrl-list li {
  padding: 3px;
  list-style-position: inside;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.ctrl-list li:hover {
  background-color: #f0f0f0;
}
.ctrl-list li.current {
  background-color: silver;
  color: white;
}
</style>
