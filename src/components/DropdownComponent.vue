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
      class="dropdown_content"
      :class="[content_class, dropdownShow ? 'visible' : 'hidden']"
      :style="positionStyle"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/library";
.dropdown_elem {
  user-select: none;
  position: relative;

  padding: 0;

  .dropdown_title {
    .dropdown_arrow {
      @include dropdownArrow(8px, 2px, $font_color_1, 200ms);
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
    @keyframes animateVisible {
      from {
        opacity: 0;
        visibility: hidden;
      }
      to {
        opacity: 1;
        visibility: visible;
      }
    }

    @keyframes animateHide {
      from {
        visibility: visible;
        opacity: 1;
      }
      to {
        visibility: hidden;
        opacity: 0;
      }
    }

    &.hidden {
      animation: animateHide 200ms ease-out forwards;
      pointer-events: none;
    }

    &.visible {
      animation: animateVisible 200ms ease-out forwards;
      pointer-events: unset;
    }

    position: absolute;

    border-radius: 5px;

    padding: 10px;

    z-index: 60;
  }
}
</style>
