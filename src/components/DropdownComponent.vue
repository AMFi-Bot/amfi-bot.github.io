<script setup lang="ts">
import { ref, type Ref } from "vue";

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
  config: {
    clickButtonTitle: string;
    dropdownContent: ElementType[];
    initChoosedElement?: ElementType;
    useChoosedElementAsTitle?: boolean;
    onChoose: (element: ElementType) => void;
  };
}>();

const choosedElement: Ref<undefined | ElementType> = props.config
  .initChoosedElement
  ? ref(props.config.initChoosedElement)
  : ref();

function onChoose(element: ElementType) {
  if (choosedElement.value === element) return;

  choosedElement.value = element;
  props.config.onChoose(element);
}
</script>

<template>
  <div class="dropdown_elem">
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
        config.useChoosedElementAsTitle && choosedElement
          ? typeof choosedElement === "string"
            ? choosedElement
            : choosedElement.name
          : config.clickButtonTitle
      }}</span>
    </div>
    <div v-show="dropdownShow" class="dropdown_content">
      <div
        class="dropdown_content_elem"
        v-for="element of config.dropdownContent"
        :key="typeof element == 'string' ? element : element.name"
        @click="onChoose(element)"
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
