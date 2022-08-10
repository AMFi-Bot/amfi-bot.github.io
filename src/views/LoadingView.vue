<script setup lang="ts">
import LoadingComponentVue from "../components/LoadingComponent.vue";
</script>

<template>
  <LoadingComponentVue></LoadingComponentVue>
</template>

<style lang="scss">
@import "@/assets/scss/library";

.loader {
  min-width: 100px;
  min-height: 100px;

  @media (min-width: 300px) {
    width: 100px;
    height: 100px;
  }
  @media (min-width: 600px) {
    width: 300px;
    height: 300px;

    @include dottedLoader($font_color_1, 10px, 15s);
  }
  @media (min-width: 900px) {
    width: 500px;
    height: 500px;

    @include dottedLoader($font_color_1, 20px, 15s);
  }
}
</style>
