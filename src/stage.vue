<!--
  - props: markdown, page, autoFontSize, keyboardCtrl, urlHashCtrl
  - data: slides[{ html, meta{ bg, type }, visited }], current, fontSize
  - provide: current, slides
  - methods: goto({ page }), goNext(), goPrev(), goFirst(), goLast()
  - computed: currentBg, currentType
  - events: change({ from, to })
-->

<template>
  <div
    class="v-mark-display stage"
    :class="[`stage-${currentType}`]"
    :style="[`font-size: ${fontSize}px`, currentBg].join('; ')"
  >
    <m-slides @preview="preview" :current="currentPage"></m-slides>
    <m-ctrl @change="change" :current="currentPage"></m-ctrl>
    <m-preview ref="preview"></m-preview>
  </div>
</template>

<script>
import {
  genSlide,
  genLoadingSlide,
  genMarkdown,
  parseMarkdown,
  parseFontSize,
  genMixinGlobalEvents,
  keydownHandler,
  resizeHandler,
  hashHandler,
  defaultFontSize,
  getHash,
  setHash,
  request
} from "./util";
import MSlides from "./slides.vue";
import MCtrl from "./ctrl.vue";
import MPreview from "./preview.vue";

export default {
  components: {
    MSlides,
    MCtrl,
    MPreview
  },
  mixins: [
    genMixinGlobalEvents("keydown", keydownHandler),
    genMixinGlobalEvents("resize", resizeHandler),
    genMixinGlobalEvents("hashchange", hashHandler)
  ],
  props: {
    markdown: { type: String },
    src: { type: String },
    page: { type: Number },
    baseUrl: { type: String },
    autoFontSize: { type: Boolean, default: false },
    autoBaseUrl: { type: Boolean, default: false },
    autoBlankTarget: { type: Boolean, default: false },
    keyboardCtrl: { type: Boolean, default: false },
    urlHashCtrl: { type: Boolean, default: false },
    supportPreview: { type: Boolean, default: false }
  },
  data() {
    const { markdown, src, page, autoFontSize, urlHashCtrl } = this;
    if (src) {
      request(src, (error, md) => {
        if (error) {
          console.error(error);
        }
        if (md) {
          this.raw = md;
        }
      });
    }
    return {
      raw: markdown,
      currentPage: page || (urlHashCtrl ? parseInt(getHash(), 10) || 1 : 1),
      fontSize: autoFontSize ? parseFontSize() : defaultFontSize
    };
  },
  provide() {
    return { stage: this };
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
      if (this.supportPreview) {
        this.$refs.preview.$emit("preview", { url });
      }
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
    },
    initBaseElement() {
      const defaultBaseElement = document.querySelector("head base");
      const baseElement = defaultBaseElement || document.createElement("base");
      this.defaultBaseHref = defaultBaseElement
        ? baseElement.getAttribute("href") || ""
        : "";
      this.defaultBaseTarget = defaultBaseElement
        ? baseElement.getAttribute("target") || ""
        : "";
      this.defaultBaseElement = defaultBaseElement;
      this.baseElement = baseElement;
      this.checkBaseElement();
    },
    checkBaseElement() {
      // already has base element?
      // - already has href?
      // - already has target?
      // props
      // - has base href?
      // - has base target?
      // todo
      // - create base element if not existed
      // - (set or remove) (href or default href) and (target or default target)
      // - if no href no target no element remove else attach
      const {
        finalBaseUrl,
        autoBlankTarget,
        baseElement,
        defaultBaseElement,
        defaultBaseHref,
        defaultBaseTarget
      } = this;
      if (
        (!finalBaseUrl || !autoBlankTarget || !defaultBaseElement) &&
        baseElement.parentNode === document.head
      ) {
        document.head.removeChild(baseElement);
      } else {
        const baseHref = finalBaseUrl || defaultBaseHref;
        if (baseHref) {
          baseElement.setAttribute("href", baseHref);
        } else {
          baseElement.removeAttribute("href");
        }
        const baseTarget =
          (autoBlankTarget ? "_blank" : "") || defaultBaseTarget;
        if (baseTarget) {
          baseElement.setAttribute("target", baseTarget);
        } else {
          baseElement.removeAttribute("target");
        }
        document.head.appendChild(baseElement);
      }
    },
    visit(page) {
      const slide = this.slides[page - 1];
      if (slide && !slide.visited) {
        slide.visited = true;
      }
    }
  },
  computed: {
    slides() {
      const { raw } = this;
      return raw ? parseMarkdown(raw) : genLoadingSlide();
    },
    title() {
      const first = this.slides[0];
      return (first && first.meta ? first.meta.title : null) || "Slides";
    },
    currentMeta() {
      const { slides, currentPage } = this;
      const currentSlide = slides[currentPage - 1] || {};
      return currentSlide.meta || {};
    },
    currentBg() {
      const { currentMeta } = this;
      return currentMeta.bgStyle || "";
    },
    currentType() {
      const { currentMeta } = this;
      return currentMeta.type || "normal";
    },
    finalBaseUrl() {
      const { baseUrl, autoBaseUrl, src } = this;
      return baseUrl || (autoBaseUrl ? src : "");
    }
  },
  created() {
    const { title, currentPage } = this;
    this.$emit("title", { title });
    this.initBaseElement();
    this.visit(currentPage);
  },
  watch: {
    title() {
      const { title } = this;
      this.$emit("title", { title });
    },
    autoBlankTarget() {
      this.checkBaseElement();
    },
    finalBaseUrl() {
      this.checkBaseElement();
    },
    currentPage(to, from) {
      if (this.urlHashCtrl) {
        setHash(to);
      }
      this.visit(to);
      this.$emit("change", { from, to });
    }
  }
};
</script>

<style>
.stage {
  width: 100vw;
  height: 100vh;
  line-height: 1.25;
  color: #444;
  text-shadow: 0 0 0.25em #ccc;
  background-color: #f5f5f5;
  background-size: cover;
  background-position: center;
}
</style>

<style>
h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0.25em 0;
  font-weight: 500;
}
li {
  text-align: initial;
}
blockquote {
  font-size: 0.75em;
  text-align: initial;
  background-color: rgba(127, 127, 127, 0.2);
  padding: 0.25em 1em;
  border-radius: 0.25em;
}
pre {
  text-align: initial;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5vw;
  padding: 0 0.125em;
}

img {
  max-width: 100%;
  max-height: 80vh;
}

a {
  font-size: 0.75em;
  padding: 0.125em 0.25em;
  background-color: gray;
  color: white;
  border-radius: 0.25em;
  transition: all 0.3s;
  text-decoration: none;
}
a:hover {
  background-color: blue;
  color: white;
}

small {
  font-size: 0.6em;
}
strong {
  color: red;
}
em {
  color: blue;
}
s,
strike {
  color: gray;
}
code {
  font-size: 0.75em;
}
mark {
  border-radius: 0.5vw;
  padding: 0 0.125em;
}

table {
  border-collapse: collapse;
  margin: 0.25em 0;
  background-color: white;
  font-size: inherit;
}
th,
td {
  border: 1px solid gray;
  padding: 0.25em;
}
thead {
  background-color: #f0f0f0;
}
tbody > tr:nth-child(2n) {
  background-color: #f0f0f0;
}

hr {
  width: 90%;
  border-width: 2px;
  border-style: dashed;
}
</style>
