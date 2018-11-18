<template>
  <Slides :slides="slides"></Slides>
</template>

<script>
import Slides from "../src/markshow.vue";
export default {
  components: { Slides },
  data() {
    return {
      slides: [
        { meta: { style: { color: "#f90" } }, html: "<h1>Hello World</h1>" }
      ]
    };
  }
};
</script>

<style></style>
