<script setup lang="ts">
import type { DropdownArrowProps } from "@/types/components/dropdowns";
import { toRef } from "vue";

const props = withDefaults(defineProps<DropdownArrowProps>(), {
  arrowAnimationSide: "right",
  sideSize: "8px",
  width: "2px",
  color: "#ddd",
  animationSpeed: "200ms",
});

const arrowState = toRef(props, "arrowState");
</script>

<template>
  <i
    :class="[
      $style.dropdown_arrow,
      $style[`dropdown_arrow_${arrowState ? 'shown' : 'hidden'}`],
      $style[`arrow_animate_${arrowAnimationSide}`],
    ]"
  ></i>
</template>

<style module lang="scss">
.dropdown_arrow {
  display: inline-block;
  height: v-bind("sideSize");
  width: v-bind("sideSize");

  border-left: v-bind("width") solid v-bind("color");
  border-bottom: v-bind("width") solid v-bind("color");

  transition: transform v-bind("animationSpeed")
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
