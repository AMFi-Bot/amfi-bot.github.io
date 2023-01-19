<script setup lang="ts">
import _ from "lodash";
import { computed, ref, toRefs, type Ref } from "vue";
import DropdownComponent from "./DropdownComponent.vue";

const dropdownShow = ref(false);

type ElementType =
  | string
  | {
      name: string;
      value?: string;
      icon?: string;
      id?: string | number;
    };

const props = defineProps<{
  clickButtonTitle: string;
  dropdownContent: ElementType[];
  initChoosedElement?: ElementType;
  useChoosedElementAsTitle?: boolean;
  /**
   *
   * @param refChoosedElements If choosed ref parameter exists, onChoose event won't choose element as default.
   *  Instead of it, elements choosing will provide outside the element, by changig this parameter.
   *  Also, the initChoosed property won't be used
   */
  refChoosedElement?: ElementType | undefined;

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

const emit = defineEmits<{
  (e: "choose", elements: ElementType): void;
}>();

const dropdownComponentProps = computed(() => ({
  position: props.position,
  elem_class: props.elem_class,
  title_class: props.title_class,
  content_class: props.content_class,
  noHideOnClickContent: props.noHideOnClickContent,
  useArrow: props.useArrow || true,
  arrowAnimationSide: props.arrowAnimationSide,
  disableArrowAnimation: props.disableArrowAnimation,
}));

const { dropdownContent, refChoosedElement } = toRefs(props);

const choosedElement: Ref<ElementType | undefined> =
  props.refChoosedElement && refChoosedElement
    ? refChoosedElement
    : ref(_.cloneDeep(props.initChoosedElement || undefined));

function onChoose(element: ElementType) {
  if (!props.refChoosedElement || !refChoosedElement.value) {
    choosedElement.value = element;
    emit("choose", _.cloneDeep(choosedElement.value));
  } else {
    const choosed = element;
    emit("choose", _.cloneDeep(choosed));
  }
}
</script>

<template>
  <DropdownComponent v-bind="{ ...dropdownComponentProps }">
    <template #dropdownTitle>
      <span class="title">{{
        useChoosedElementAsTitle && choosedElement
          ? typeof choosedElement === "string"
            ? choosedElement
            : choosedElement.name
          : clickButtonTitle
      }}</span>
    </template>
    <template #default>
      <div
        class="dropdown_content_elem"
        v-for="element of dropdownContent"
        :key="typeof element == 'string' ? element : element.name"
        @click="onChoose(element)"
        :class="_.isEqual(choosedElement, element) && 'choosed'"
      >
        <img
          class="icon"
          v-if="typeof element !== 'string' && element.icon"
          :src="element.icon"
        />
        <span class="name" v-if="typeof element !== 'string' && element.name">
          {{ element.name }}
        </span>
        <span class="name" v-if="typeof element === 'string'">
          {{ element }}
        </span>
        <span class="value" v-if="typeof element !== 'string' && element.value">
          {{ element.value }}
        </span>
      </div>
    </template>
  </DropdownComponent>
</template>
