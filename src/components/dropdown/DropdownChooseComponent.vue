<script setup lang="ts">
import {
  computed,
  ref,
  toRefs,
  type Ref,
  type ComputedRef,
  type WritableComputedRef,
} from "vue";
import DropdownComponent from "./DropdownComponent.vue";
import type { DropdownChooseComponentProps } from "@/types/components/dropdowns";

import {
  dropdownChoosableComponentDefaults,
  getKeyOfElement,
} from "@/helpers/components/dropdown";

type ElementType =
  | string
  | {
      name: string;
      value?: string;
      icon?: string;
      id?: string | number;
    };

const props = withDefaults(
  defineProps<DropdownChooseComponentProps>(),
  dropdownChoosableComponentDefaults
);

const emit = defineEmits<{
  (e: "choose", element: ElementType): void;
}>();

const propsRefs = toRefs(props);
const { dropdownContent, refChoosedElement } = propsRefs;
const localChoosedElement: Ref<ElementType | undefined> = ref(
  propsRefs.initChoosedElement?.value
);

/**
 * If the refChoosedElement variable is provided,
 * the local choosed element mechanic is being disabled
 * and the choosedElement is being regulate ONLY via updates of the refChoosedElement prop.
 */
const choosedElement: WritableComputedRef<ElementType | undefined> = computed({
  get: () =>
    refChoosedElement ? refChoosedElement.value : localChoosedElement.value,
  set: (elem) => !refChoosedElement && (localChoosedElement.value = elem),
});

const choosedElementKey = computed(() =>
  choosedElement.value === undefined
    ? undefined
    : getKeyOfElement(choosedElement.value)
);

function onChoose(element: ElementType) {
  choosedElement.value = element;
  emit("choose", element);
}

const title: ComputedRef<string> = computed(() => {
  return propsRefs.useChoosedElementAsTitle.value && choosedElement.value
    ? typeof choosedElement.value === "string"
      ? choosedElement.value
      : choosedElement.value.name
    : propsRefs.clickButtonTitle.value;
});
</script>

<template>
  <DropdownComponent v-bind="props">
    <template #dropdownTitle>
      <span class="title">{{ title }}</span>
    </template>
    <template #default>
      <div
        class="dropdown_content_elem"
        v-for="element of dropdownContent"
        :key="getKeyOfElement(element)"
        @click="onChoose(element)"
        :class="{ choosed: choosedElementKey == getKeyOfElement(element) }"
      >
        <img
          class="icon"
          v-if="typeof element !== 'string' && element.icon"
          :src="element.icon"
        />
        <span class="name" v-if="typeof element !== 'string' && element.name">
          {{ element.name }}
        </span>
        <span class="value" v-if="typeof element !== 'string' && element.value">
          {{ element.value }}
        </span>
        <span class="name" v-if="typeof element === 'string'">
          {{ element }}
        </span>
      </div>
    </template>
  </DropdownComponent>
</template>
