<!--
  - props: markdown, current.sync, !autoresize
  - data: slides[{ html, meta{ bg, type }, visited }], current, fontSize
  - provide: current, slides
  - methods: goto({ page }), goNext(), goPrev(), goFirst(), goLast()
  - computed: currentBg, currentType
  - events: change({ from, to })
-->

<template>
  <div
    :class="['stage', `stage-${currentType}`]"
    :style="{ fontSize: `${fontSize}px`, backgroundImage: currentBg }"
  >
    <m-slides @preview="preview" />
    <m-ctrl @change="change" />
    <m-preview ref="preview" />
  </div>
</template>

<script>
import { genSlide, genMarkdown, parseMarkdown, parseFontSize } from "./util";
import MSlides from "./slides.vue";
import MCtrl from "./ctrl.vue";
import MPreview from "./preview.vue";

export default {
  components: {
    MSlides,
    MCtrl,
    MPreview
  },
  props: {
    markdown: { type: String, default: genMarkdown() },
    page: { type: Number, default: 1 },
    autosize: { type: Boolean, default: false }
  },
  data() {
    const { markdown, page, autosize } = this;
    return {
      slides: parseMarkdown(markdown),
      currentPage: page,
      fontSize: autosize ? parseFontSize() : 14
    };
  },
  provide() {
    const { slides, currentPage } = this;
    return { slides, currentPage };
  },
  methods: {
    goto(page) {
      const { currentPage, slides } = this;
      const length = slides.length;
      if (page >= length) {
        this.currentPage = length;
      } else if (page <= 1) {
        this.currentPage = 1;
      } else {
        this.currentPage = page;
      }
    },
    // events
    preview({ url }) {
      this.$refs.preview.$emit("preview", { url });
    },
    change({ page }) {
      this.goto(page);
    },
    // prompts
    promptJump: function() {
      const { currentPage } = this;
      const input = prompt(
        "Please input a number you wanna jump to:",
        currentPage
      );
      if (input) {
        this.goto(parseInt(input, 10));
      }
    },
    // shortcuts
    goNext() {
      this.goto(this.currentPage + 1);
    },
    goPrev() {
      this.goto(this.currentPage - 1);
    },
    goFirst() {
      this.goto(1);
    },
    goLast() {
      this.goto(this.slides.length);
    }
  },
  computed: {
    // todo: removed?
    currentBgImg() {
      const { slides, currentPage } = this;
      return slides[currentPage].meta.bg || "none";
    },
    currentType() {
      const { slides, currentPage } = this;
      return slides[currentPage].meta.type || "normal";
    }
  },
  watch: {
    currentPage(to, from) {
      const { slides } = this;
      const slide = slides[to];
      if (slide) {
        slide.visited = true;
      }
      // todo: update hash
      this.$emit("change", { from, to });
    }
  },
  created() {
    // todo: read hash and set current page
  }
};
</script>

<style>
/* todo */
</style>
