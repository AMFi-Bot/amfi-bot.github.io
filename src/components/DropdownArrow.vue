<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  arrowStateShow: boolean;
  arrowAnimationSide?: "right" | "left";
  disableArrowAnimation?: boolean;
  sideSize?: string;
  width?: string;
  color?: string;
  animationSpeed?: string;
}>();

const params = computed(() => ({
  arrowStateShow: props.arrowStateShow,
  arrowAnimationSide: props.arrowAnimationSide || "right",
  disableArrowAnimation: props.disableArrowAnimation || false,
  sideSize: props.sideSize || "8px",
  width: props.width || "2px",
  color: props.color || "#ddd",
  animationSpeed: props.animationSpeed || "200ms",
}));
</script>

<template>
  <i
    :class="[
      $style.dropdown_arrow,
      $style[`dropdown_arrow_${params.arrowStateShow ? 'shown' : 'hidden'}`],
      $style[`arrow_animate_${params.arrowAnimationSide}`],
    ]"
  ></i>
</template>

<style module lang="scss">
.dropdown_arrow {
  display: inline-block;
  height: v-bind("params.sideSize");
  width: v-bind("params.sideSize");

  border-left: v-bind("params.width") solid v-bind("params.color");
  border-bottom: v-bind("params.width") solid v-bind("params.color");

  transition: transform v-bind("params.animationSpeed")
    cubic-bezier(0.79, 0.14, 0.15, 0.86);

  margin: 0 10px;

  &.dropdown_arrow_shown {
    transform: rotate(-225deg);

    &.arrow_animate_left {
      transform: rotate(135deg);
    }

    &.arrow_animate_right {
      transform: rotate(-225deg);
    }
  }

  &.dropdown_arrow_hidden {
    transform: rotate(-45deg);
  }
}
</style>
