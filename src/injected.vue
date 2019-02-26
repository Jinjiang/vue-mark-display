<script>
import { genSlide } from "./util";

export default {
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
</script>
