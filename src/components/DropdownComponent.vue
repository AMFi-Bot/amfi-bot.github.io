<script setup lang="ts">
import { computed, ref } from "vue";
import DropdownArrow from "./DropdownArrow.vue";

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
      <DropdownArrow
        v-if="useArrow"
        :arrow-state-show="dropdownShow"
        :arrow-animation-side="props.arrowAnimationSide"
        :disable-arrow-animation="props.disableArrowAnimation"
      />
      <slot name="dropdownTitle" />
    </div>
    <Transition name="dropdown">
      <div
        class="dropdown_content"
        :class="[content_class]"
        :style="positionStyle"
        v-show="dropdownShow"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.dropdown_elem {
  user-select: none;
  position: relative;

  padding: 0;

  .dropdown_title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;

    height: 100%;
    width: 100%;
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: opacity 200ms ease-out;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
  }

  .dropdown_content {
    position: absolute;

    border-radius: 5px;

    padding: 10px;

    z-index: 60;
  }
}
</style>
