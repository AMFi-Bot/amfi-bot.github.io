<script setup lang="ts">
import _ from "lodash";
import { ref, toRefs, type Ref } from "vue";

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
}>();

const emit = defineEmits<{
  (e: "choose", elements: ElementType): void;
}>();

const { dropdownContent, refChoosedElement } = toRefs(props);

const choosedElement: Ref<ElementType | undefined> =
  props.refChoosedElement && refChoosedElement
    ? refChoosedElement
    : ref(_.cloneDeep(props.initChoosedElement || undefined));

function onChoose(element: ElementType) {
  if (!props.refChoosedElement || !refChoosedElement) {
    choosedElement.value = element;
    emit("choose", _.cloneDeep(choosedElement.value));
  } else {
    const choosed = element;
    emit("choose", _.cloneDeep(choosed));
  }
}

function clickAway() {
  dropdownShow.value = false;
}
</script>

<template>
  <div class="dropdown_elem" v-click-away="clickAway">
    <div
      class="dropdown_title"
      @click="dropdownShow = !dropdownShow"
      @focusout="dropdownShow = !dropdownShow"
    >
      <i
        class="dropdown_arrow"
        :class="dropdownShow ? 'dropdown_arrow_shown' : 'dropdown_arrow_hidden'"
      ></i>
      <span class="title">{{
        useChoosedElementAsTitle && choosedElement
          ? typeof choosedElement === "string"
            ? choosedElement
            : choosedElement.name
          : clickButtonTitle
      }}</span>
    </div>
    <div v-show="dropdownShow" class="dropdown_content">
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
    </div>
  </div>
</template>
