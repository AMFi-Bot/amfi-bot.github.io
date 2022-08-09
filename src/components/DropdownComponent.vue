<script setup lang="ts">
import { computed, ref } from "vue";

const dropdownShow = ref(false);

const props = defineProps<{
  position?:
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left";
  elem_class?: string;
  title_class?: string;
  content_class?: string;
  noHideOnClickContent?: boolean;
  useArrow?: boolean;
  arrowAnimationSide?: "right" | "left";
  disableArrowAnimation?: boolean;
}>();

const positionStyle = computed(() => {
  const topStyle = "bottom: 100%; margin-bottom:5px;";
  const leftStyle = "right: 100%; margin-right: 5px;";
  const rightStyle = "left: 100%; margin-left: 5px;";
  const leftCombinatedStyle = "left: 0;";
  const rightCombinatedStyle = "right: 0;";
  const bottomStyle = "top: 100%; margin-top:5px;";

  const position = props.position || "bottom-right";

  return position === "left"
    ? leftStyle
    : position === "right"
    ? rightStyle
    : position === "bottom"
    ? bottomStyle
    : position === "top-right"
    ? topStyle + rightCombinatedStyle
    : position === "top-left"
    ? topStyle + leftCombinatedStyle
    : position === "bottom-right"
    ? bottomStyle + rightCombinatedStyle
    : position === "bottom-left"
    ? bottomStyle + leftCombinatedStyle
    : topStyle;
});

const arrowAnimationClass = computed(() =>
  props.arrowAnimationSide === "left"
    ? "arrow_animate_left"
    : props.arrowAnimationSide === "right"
    ? "arrow_animate_right"
    : props.disableArrowAnimation
    ? ""
    : "arrow_animate_right"
);

const arrowState = computed(() =>
  dropdownShow.value ? "dropdown_arrow_shown" : "dropdown_arrow_hidden"
);

const emit = defineEmits<{
  (e: "dropdownStateSwitched", state: boolean): void;
}>();

function switchDropdownState() {
  dropdownShow.value = !dropdownShow.value;
  emit("dropdownStateSwitched", dropdownShow.value);
}

function clickAwayFromElem() {
  if (!props.noHideOnClickContent) return;
  dropdownShow.value = false;
}
function clickAwayFromTitle() {
  if (props.noHideOnClickContent) return;
  dropdownShow.value = false;
}
</script>

<template>
  <div
    class="dropdown_elem"
    :class="elem_class"
    v-click-away="clickAwayFromElem"
  >
    <div
      class="dropdown_title"
      :class="title_class"
      v-click-away="clickAwayFromTitle"
      @click="switchDropdownState"
    >
      <i
        v-if="useArrow"
        class="dropdown_arrow"
        :class="[arrowState, arrowAnimationClass]"
      ></i>
      <slot name="dropdownTitle" />
    </div>
    <div
      v-show="dropdownShow"
      class="dropdown_content"
      :class="content_class"
      :style="positionStyle"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.dropdown_elem {
  user-select: none;
  position: relative;

  padding: 0;

  .dropdown_title {
    .dropdown_arrow {
      margin: 5px 10px 7px 5px;

      &.dropdown_arrow_shown {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);

        border: solid white;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
      }

      &.dropdown_arrow_hidden {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);

        border: solid white;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
      }

      // &.arrow_animate_left {
      //   animation: arrow_left_animation 1s ease-out 1 alternate 0 forwards;
      // }

      // &.arrow_animate_right {
      //   animation: arrow_right_animation 1s ease-out 1 alternate 0 forwards;
      // }

      // @keyframes arrow_left_animation {
      //   from {
      //   }

      //   50% {
      //   }

      //   to {
      //   }
      // }
      // @keyframes arrow_right_animation {
      //   from {
      //   }

      //   50% {
      //   }

      //   to {
      //   }
      // }
    }
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;

    height: 100%;
    width: 100%;
  }

  .dropdown_content {
    position: absolute;

    display: flex;
    flex-direction: column;

    border-radius: 5px;

    padding: 10px;

    z-index: 60;
  }
}
</style>
