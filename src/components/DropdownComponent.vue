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

const choosedElement: Ref<undefined | ElementType> = ref();

defineProps<{
  config: {
    clickButtonTitle: string;
    dropdownContent: ElementType[];
    dropdownElemClass?: string;
    dropdownTitleClass?: string;
    dropdownContentClass?: string;
    dropdownContentElemClass?: string;
    useChoosedElementAsTitle?: boolean;
    onChoose: (element: ElementType) => void;
  };
}>();
</script>

<template>
  <div
    :class="
      config.dropdownElemClass ? config.dropdownElemClass : 'dropdown_elem'
    "
  >
    <div
      :class="
        config.dropdownTitleClass ? config.dropdownTitleClass : 'dropdown_title'
      "
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
    <div
      v-show="dropdownShow"
      :class="
        config.dropdownContentClass
          ? config.dropdownContentClass
          : 'dropdown_content'
      "
    >
      <div
        :class="
          config.dropdownContentElemClass
            ? config.dropdownContentElemClass
            : 'dropdown_content_elem'
        "
        v-for="element of config.dropdownContent"
        :key="typeof element == 'string' ? element : element.name"
        @click="
          choosedElement = element;
          config.onChoose(element);
        "
      >
        <span class="icon" v-if="typeof element !== 'string' && element.icon">
          {{ element.icon }}
        </span>
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
