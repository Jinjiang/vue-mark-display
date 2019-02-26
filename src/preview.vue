<!--
  - emit: open(url)
  - data: visible, url
-->

<template>
  <transition>
    <div v-if="visible" class="preview">
      <button class="preview-btn" @click="close">Close</button>
      <iframe class="preview-main" :src="url"></iframe>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      url: ""
    };
  },
  methods: {
    close() {
      this.visible = false;
      this.url = "";
    }
  },
  created() {
    this.$on("open", ({ url }) => {
      this.visible = true;
      this.url = url;
    });
  }
};
</script>

<style>
/* todo */
</style>
