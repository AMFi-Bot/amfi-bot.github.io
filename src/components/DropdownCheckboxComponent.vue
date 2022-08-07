<script setup lang="ts">
import type { ElementType } from "@/types/components/DropdownComponents";
import { ref, toRef, toRefs, watch, type Ref } from "vue";
import _ from "lodash";

const dropdownShow = ref(false);

const props = defineProps<{
  clickButtonTitle: string;
  dropdownContent: ElementType[];
  initChoosed?: ElementType[];
  /**
   *
   * @param refChoosedElements If choosed ref parameter exists, on choose event won't choose elements as default.
   *  Instead of it, elements choosing will provide outside the element, by changig this parameter.
   *  Also, the initChoosed property won't be used
   */
  refChoosedElements?: ElementType[];
}>();

const { dropdownContent, refChoosedElements } = toRefs(props);

// A vue issue. Waiting for fix.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const choosedElements: Ref<ElementType[]> =
  props.refChoosedElements &&
  refChoosedElements &&
  typeof refChoosedElements.value !== "undefined"
    ? refChoosedElements
    : ref(_.cloneDeep(props.initChoosed || []));

const emit = defineEmits<{
  (e: "choose", elements: ElementType[]): void;
}>();

function onChoose(element: ElementType) {
  /**
   *
   * @function Simple toggler. If element exists in given `elements` property, delete, else, push
   */
  const filter = (elements: ElementType[]): ElementType[] => {
    elements = _.cloneDeep(elements);
    elements.filter((q) => _.isEqual(q, element))[0] // Check if element exists
      ? (elements = elements.filter((q) => !_.isEqual(q, element))) // Delete element
      : elements.push(element); // Push element

    return elements;
  };
  if (!refChoosedElements || typeof refChoosedElements.value === "undefined") {
    choosedElements.value = filter(choosedElements.value);
    emit("choose", _.cloneDeep(choosedElements.value));
  } else {
    const choosed = filter(refChoosedElements.value || []);
    emit("choose", _.cloneDeep(choosed));
  }
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
      <span class="title">{{ clickButtonTitle }}</span>
    </div>
    <div v-show="dropdownShow" class="dropdown_content">
      <div
        class="dropdown_content_elem"
        v-for="element of dropdownContent"
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
