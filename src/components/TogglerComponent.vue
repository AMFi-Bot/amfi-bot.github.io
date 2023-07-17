<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{ state: boolean; togglerClass?: string }>();

const { state } = toRefs(props);

const emit = defineEmits<{ (e: "stateChanged", state: boolean): void }>();
</script>

<template>
  <div
    :class="[
      $style.toggler,
      $style[state ? 'enabled' : 'disabled'],
      togglerClass,
      'toggler',
    ]"
    @click="emit('stateChanged', !state)"
  ></div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.toggler {
  position: relative;

  width: 100px;
  height: 50px;
  margin: 0;

  vertical-align: top;

  background: $dark_2;
  border-radius: 30px;
  outline: none;
  cursor: pointer;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  transition: all 0.2s ease-out;

  &::after {
    content: "";

    position: absolute;
    left: 5px;
    top: 5px;

    width: 40px;
    height: 40px;
    background-color: #ff3535;
    border-radius: $circle;

    transform: translateX(0);

    transition: all 0.2s ease-out;
  }

  &.enabled::after,
  &:checked::after {
    // in this case percent element = this element
    // In our case elements width = 40px
    // And the parents width = 100px
    // So sides-margin is 5px
    // element have left-side margin = 5px
    // 5px+40px(100%) = 45px - leftside margin for translateX(100%)
    // If include this element = 45px+40px = 85px
    // and 100-5px(rightside margin) = 95px
    // So 95px - 85px = 10px
    // So transform: translateX(calc(100% + 10px))
    transform: translateX(calc(100% + 10px));
    background-color: #fff;
  }

  &.enabled,
  &:checked {
    background-color: $green_button_normal;
  }
}
</style>
