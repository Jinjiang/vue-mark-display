<!--
  - inject: current, slides
  - data: visible, adminMode
  - methods: toggle(), change(page)
  - events: change({ page })
-->

<template>
  <div class="ctrl">
    <transition name="ctrl-list">
      <ol v-if="visible" class="ctrl-list" ref="list">
        <li
          v-for="(slide, index) in computedSlides"
          :key="index"
          ref="items"
          :class="{ current: computedCurrentPage === index + 1 }"
          @click="change(index + 1);"
        >
          {{ getTitle(slide) }}
        </li>
      </ol>
    </transition>
    <button class="ctrl-btn" @click="toggle">
      {{ computedCurrentPage }} / {{ computedSlides.length }}
    </button>
  </div>
</template>

<script>
import { mixinInjected, genMixinGlobalEvents } from "./util";

export default {
  mixins: [
    mixinInjected,
    genMixinGlobalEvents("click", function() {
      this.visible = false;
    })
  ],
  data() {
    return {
      visible: false,
      adminMode: false,
      mounted: false
    };
  },
  updated() {
    if (this.visible && this.$refs.items) {
      const currentElement = this.$refs.items[this.computedCurrentPage - 1];
      if (currentElement) {
        currentElement.scrollIntoView();
      }
    }
  },
  methods: {
    toggle(event) {
      this.visible = !this.visible;
      this.adminMode = event.altKey;
      event.stopPropagation();
    },
    change(page) {
      this.$emit("change", { page });
    },
    getTitle({ visited, meta: { title } }) {
      const { adminMode } = this;
      const output = adminMode || visited ? title : "";
      return output || "[slide]";
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
@media print {
  .ctrl {
    display: none;
  }
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
  max-width: 30vw;
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
