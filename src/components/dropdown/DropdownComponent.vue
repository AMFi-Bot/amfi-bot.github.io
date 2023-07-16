<script setup lang="ts">
import { directive as vClickAway } from "vue3-click-away";
import {
  computed,
  ref,
  toRefs,
  type WritableComputedRef,
  type ComputedRef,
} from "vue";
import DropdownArrow from "./DropdownArrow.vue";
import type { DropdownComponentProps } from "@/types/components/dropdowns";
import {
  dropdownComponentDefaults,
  styles,
} from "@/helpers/components/dropdown";

const props = withDefaults(
  defineProps<DropdownComponentProps>(),
  dropdownComponentDefaults
);

const propsRefs = toRefs(props);

const refDropdownShown: ComputedRef<boolean | undefined> = computed(
  () => propsRefs.refDropdownShown?.value?.state
);
const localDropdownShown = ref(false);

/**
 * If the `refDropdownShown` prop is provided,
 * the local dropdown toogle visibility mechanic is being disabled
 * and the visibility of the dropdown content is being regulate ONLY via updates of the refDropdownShown prop.
 */
const dropdownShown: WritableComputedRef<boolean> = computed({
  get: () => refDropdownShown.value ?? localDropdownShown.value,
  set: (b) =>
    refDropdownShown.value === undefined && (localDropdownShown.value = b),
});

const positionStyle = computed(() => {
  const position = props.position ?? "bottom-right";

  const style = styles[position];

  return style;
});

const emit = defineEmits<{
  (e: "dropdownStateSwitched", state: boolean): void;
}>();

function setDropdownState(state = !dropdownShown.value) {
  dropdownShown.value = state;
  emit("dropdownStateSwitched", state);
}

const switchDropdownState = () => setDropdownState();

const onClickAway = () =>
  dropdownShown.value &&
  propsRefs.hideOnClickAway.value &&
  setDropdownState(false);
const onClickContent = () =>
  dropdownShown.value &&
  propsRefs.hideOnClickContent.value &&
  setDropdownState(false);
</script>

<template>
  <div class="dropdown_elem" :class="elem_class" v-click-away="onClickAway">
    <div
      class="dropdown_title"
      :class="title_class"
      @click="switchDropdownState"
    >
      <DropdownArrow
        v-if="useArrow"
        v-bind="props"
        :arrow-state="dropdownShown"
      />
      <slot name="dropdownTitle" />
    </div>
    <Transition name="dropdown">
      <div
        class="dropdown_content"
        :class="[content_class]"
        :style="positionStyle"
        v-show="dropdownShown"
        @click="onClickContent"
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
