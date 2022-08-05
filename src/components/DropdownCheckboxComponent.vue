<script setup lang="ts">
import type { ElementType } from "@/types/components/DropdownComponents";
import { queuePostFlushCb, ref, type Ref } from "vue";
import _ from "lodash";

const dropdownShow = ref(false);

const props = defineProps<{
  config: {
    clickButtonTitle: string;
    dropdownContent: ElementType[];
    initChoosed?: ElementType[];
    onChoose: (elements: ElementType[]) => void;
  };
}>();

const choosedElements: Ref<ElementType[]> = ref([
  ...(props.config.initChoosed || []),
]);

function onChoose(element: ElementType) {
  choosedElements.value.filter((q) => _.isEqual(q, element))[0]
    ? (choosedElements.value = choosedElements.value.filter(
        (q) => !_.isEqual(q, element)
      ))
    : choosedElements.value.push(element);

  props.config.onChoose(choosedElements.value);
}

function clickAway() {
  dropdownShow.value = false;
}
</script>

<template>
  <div class="dropdown_elem" v-click-away="clickAway">
    <div class="dropdown_title" @click="dropdownShow = !dropdownShow">
      <i
        class="dropdown_arrow"
        :class="dropdownShow ? 'dropdown_arrow_shown' : 'dropdown_arrow_hidden'"
      ></i>
      <span class="title">{{ config.clickButtonTitle }}</span>
    </div>
    <div v-show="dropdownShow" class="dropdown_content">
      <div
        class="dropdown_content_elem"
        v-for="element of config.dropdownContent"
        :key="typeof element == 'string' ? element : element.name"
        @click="onChoose(element)"
      >
        <i
          class="checkbox"
          :class="
            choosedElements.filter((q) => _.isEqual(q, element))[0]
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
    </div>
  </div>
</template>
