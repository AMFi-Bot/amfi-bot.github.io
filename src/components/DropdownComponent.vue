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
}>();

const positionStyle = computed(() => {
  const topStyle = "bottom: 100%;";
  const leftStyle = "right: 100%;";
  const rightStyle = "left: 100%;";
  const leftCombinatedStyle = "left: 0;";
  const rightCombinatedStyle = "right: 0;";
  const bottomStyle = "top: 100%;";

  const position = props.position || "top-left";

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
