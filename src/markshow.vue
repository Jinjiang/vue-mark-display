<template>
  <div :class="stage.type" :has-bg="!!stage.bg">
    <div ref="stage" @click="clickStage">
      <transition v-for="(slide, $index) in slides" :key="$index">
        <div v-show="current === $index" class="slide">
          <div :style="slide.meta.style" v-html="slide.html"></div>
        </div>
      </transition>
      <div ref="ctrl">
        <transition>
          <ol v-if="ctrl.shown" ref="ctrl-list">
            <li
              v-for="(slide, $index) in slides"
              :key="$index"
              :active="current === $index"
              @click="current = $index;"
            >
              {{ ctrl.brighten || visited ? slide.title : "[slide]" }}
            </li>
          </ol>
        </transition>
        <button @click="toggleCtrl">
          {{ current + 1 }} / {{ slides.length }}
        </button>
      </div>
      <transition>
        <div v-if="iframe.shown" ref="iframe">
          <button @click="iframe.shown = false;">Close</button>
          <iframe :src="iframe.url"></iframe>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slides: Array
  },
  data() {
    return {
      current: 0,
      stage: { type: "", style: "", fontSize: 16, bg: false, visited: true },
      ctrl: { shown: false, brighten: false },
      iframe: { url: "", shown: false }
    };
  },
  methods: {
    clickStage: function(e) {
      var target = e.target;
      this.ctrl.shown = false;
      if (e.altKey) {
        if (target.tagName === "A") {
          e.preventDefault();
          this.iframe.url = target.href;
          this.iframe.shown = true;
        }
      }
    },
    toggleCtrl: function(e) {
      this.ctrl.shown = !this.ctrl.shown;
      this.ctrl.brighten = e.altKey;
      e.stopPropagation();
    },
    update: function() {
      this.updateType();
      this.updateHash();
      this.ctrl.shown = false;
    },
    updateType: function() {
      var meta;
      var current = this.current;
      var slides = this.slides;
      var length = slides.length;
      if (current >= length) {
        meta = slides[length - 1];
        this.stage.type = "";
        this.stage.bg = null;
      } else {
        meta = slides[current].meta;
        this.stage.type = meta.cover ? "cover" : "";
        this.stage.bg = meta.backgroundStyle;
      }
    },
    updateHash: function() {
      var current = this.current;
      var slides = this.slides;
      var length = slides.length;
      location.replace("#" + (current + 1));
      if (current < length) {
        slides[current].visited = true;
      }
    },
    jumpNext: function() {
      if (this.current < this.slides.length - 1) {
        this.current++;
      }
    },
    jumpPrev: function() {
      if (this.current > 0) {
        this.current--;
      }
    },
    promptJump: function() {
      var page = prompt(
        "Please input a number you wanna jump to:",
        this.current + 1
      );
      var length = this.slides.length;

      if (page) {
        page = parseInt(page, 10);
        if (page > length) {
          page = length;
        }
        if (page < 1) {
          page = 1;
        }
        if (page - 1 !== this.current) {
          this.current = page - 1;
        }
      }
    },
    initCurrentPage: function() {
      var hash = location.hash;
      var matched = hash.match(/\#(\d+)/);
      if (matched) {
        this.current = matched[1] - 1;
      }
    }
  },
  watch: {
    current() {
      this.update();
    },
    slides() {
      this.update();
    }
  },
  created() {
    this.initCurrentPage();
    this.update();
  }
};
</script>

<style></style>
