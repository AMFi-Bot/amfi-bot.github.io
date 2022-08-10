<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  loaderType?: "dotted" | "dualRing";
}>();

const loaderType = computed(() => props.loaderType || "dotted");
</script>

<template>
  <div class="loader">
    <div class="dotted-loader-wrapper" v-if="loaderType === 'dotted'">
      <div class="dotted-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="dual-ring-loader" v-else></div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/library";

@include dottedLoader($font_color_1, 5px, 15s);
</style>
