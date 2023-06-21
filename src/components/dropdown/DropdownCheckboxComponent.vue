<script setup lang="ts">
import type {
  DropdownCheckboxComponentProps,
  ElementType,
} from "@/types/components/dropdowns";
import {
  ref,
  toRefs,
  type Ref,
  computed,
  type WritableComputedRef,
  type ComputedRef,
} from "vue";
import _ from "lodash";
import DropdownComponent from "./DropdownComponent.vue";
import { dropdownCheckboxComponentDefaults } from "@/helpers/components/dropdown";

const props = withDefaults(
  defineProps<DropdownCheckboxComponentProps>(),
  dropdownCheckboxComponentDefaults
);

const propsRefs = toRefs(props);
const { dropdownContent } = propsRefs;

const refChoosedElements: ComputedRef<ElementType[] | undefined> = computed(
  () => props.refChoosedElements
);

const localChoosedElements: Ref<ElementType[]> = ref(
  propsRefs.initChoosed?.value || []
);

/**
 * If the `refChoosedElements` variable is provided,
 * the local choosed elements mechanic is being disabled
 * and the choosedElements is being regulate ONLY via updates of the refChoosedElements prop.
 */
const choosedElements: WritableComputedRef<ElementType[]> = computed({
  get: () => refChoosedElements.value ?? localChoosedElements.value,
  set: (elem) =>
    !refChoosedElements.value && (localChoosedElements.value = elem),
});

const emit = defineEmits<{
  (e: "choose", elements: ElementType[]): void;
}>();

function onChoose(element: ElementType) {
  /**
   * A simple toggler.
   * If an element exists in the given `elements` property do delete, else do push
   */
  const toggler = (elements: ElementType[]): ElementType[] => {
    const l = elements.length;

    // First of all delete the current element from the array
    elements = elements.filter((q) => !_.isEqual(q, element));

    // If the length of the array did not change
    // no elements was deleted
    // So push the element to the array
    if (elements.length === l) elements.push(element);

    return elements;
  };

  const newElements = toggler(choosedElements.value);
  choosedElements.value = newElements;
  emit("choose", newElements);
}
</script>

<template>
  <DropdownComponent v-bind="props">
    <template #dropdownTitle>
      <span class="title">{{ clickButtonTitle }}</span>
    </template>
    <template #default>
      <div
        class="dropdown_content_elem"
        v-for="element of dropdownContent"
        :key="typeof element == 'string' ? element : element.name"
        @click="onChoose(element)"
      >
        <i
          class="checkbox"
          :class="
            choosedElements.find((q) => _.isEqual(q, element))
              ? 'checked'
              : 'unchecked'
          "
        >
        </i>
        <div class="element">
          <img
            class="icon"
            v-if="typeof element !== 'string' && element.icon"
            :src="element.icon"
          />
          <span class="name" v-if="typeof element === 'string'">
            {{ element }}
          </span>
          <span class="name" v-else>
            {{ element.name }}
          </span>
          <span
            class="value"
            v-if="typeof element !== 'string' && element.value"
          >
            {{ element.value }}
          </span>
        </div>
      </div>
    </template>
  </DropdownComponent>
</template>
@/types/components/dropdowns
