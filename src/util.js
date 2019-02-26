export const genMarkdown = () => "# Hello World";

export const genSlide = () => [
  {
    html: "<h1>Hello World</h1>",
    title: "Hello World",
    meta: { bg: "", type: "", style: "" },
    visited: false
  },
  {
    html: "<p>content</p>",
    title: "content",
    meta: { bg: "", type: "", style: "" },
    visited: false
  }
];

export const setHash = page => location.replace(`#${page}`);

export const getHash = () => {
  const matched = location.hash.match(/^\#(\d+)$/);
  return matched ? matched[1] : "";
};

export const parseMarkdown = markdown => {
  // todo
  return genSlide();
};
export const parseFontSize = () => {
  const area = window.innerWidth * window.innerHeight;
  const fontSize = parseInt(Math.sqrt(area / 240), 10);
  // console.log('font size', fontSize);
  return fontSize;
};

export const defaultFontSize = 14;

export const mixinInjected = {
  props: { slides: Array, current: Number },
  inject: {
    injectedSlides: {
      from: "slides",
      default: genSlide()
    },
    injectedCurrent: {
      from: "currentPage",
      default: 1
    }
  },
  computed: {
    computedSlides() {
      const { slides, injectedSlides } = this;
      return slides || injectedSlides || genSlide();
    },
    computedCurrentPage() {
      const { current, injectedCurrent } = this;
      return current || injectedCurrent || 1;
    }
  }
};

export const genMixinGlobalEvents = (type, handler, host = window) => {
  let finalHandler = null;
  return {
    mounted() {
      finalHandler = handler.bind(this);
      host.addEventListener(type, finalHandler);
    },
    destroyed() {
      if (finalHandler) {
        host.removeEventListener(type, finalHandler);
      }
    }
  };
};

export const keydownHandler = function(event) {
  const vm = this;
  if (!vm.keyboardCtrl) {
    return;
  }
  switch (event.keyCode) {
    case 13:
      // console.log('enter');
      break;
    case 33:
      // console.log('left');
      vm.goPrev();
      break;
    case 34:
      // console.log('left');
      vm.goNext();
      break;
    case 37:
      // console.log('left');
      vm.goPrev();
      break;
    case 38:
      // console.log('up');
      vm.goPrev();
      break;
    case 39:
      // console.log('right');
      vm.goNext();
      break;
    case 40:
      // console.log('down');
      vm.goNext();
      break;
    case 71:
      // console.log('Ctrl+G')
      if (event.ctrlKey) {
        vm.promptJump();
      }
    default:
  }
};

export const resizeHandler = function() {
  const vm = this;
  if (!vm.autoFontSize) {
    // vm.fontSize = defaultFontSize;
    return;
  }
  vm.fontSize = parseFontSize();
};
