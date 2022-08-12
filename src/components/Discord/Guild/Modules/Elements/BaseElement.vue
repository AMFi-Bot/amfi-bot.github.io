<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  elementTitle: string;
  elementDescription?: string;
  elementBaseClass?: string;
  elementAboutClass?: string;
  elementBodyClass?: string;
  flexDirection?: "row" | "column";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
}>();

const flexDirection = computed(() => props.flexDirection || "row");
const justifyContent = computed(
  () =>
    props.justifyContent ||
    (flexDirection.value === "column" ? "flex-start" : "space-between")
);
</script>

<template>
  <div :class="$style.element" :style="{ flexDirection, justifyContent }">
    <div :class="$style.element_title">
      <span :class="$style.title">{{ elementTitle }}</span>
      <span :class="$style.description" v-if="elementDescription">{{
        elementDescription
      }}</span>
    </div>
    <div :class="$style.element_body">
      <slot />
    </div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.element {
  display: flex;

  margin-bottom: 5px;

  flex-direction: column;

  &.row {
    flex-direction: row;
    align-items: center;

    &.sbtw {
      justify-content: space-between;
    }
  }

  background-color: $dark_2;
  padding: 10px;
  border-radius: $border_radius_1;

  .element_title {
    margin-right: 10px;
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;

    align-self: flex-start;

    .title {
      font-size: 18px;

      color: $font_color_1;
    }

    .description {
      font-size: 14px;
      color: $font_color_2;
    }
  }
}
</style>
