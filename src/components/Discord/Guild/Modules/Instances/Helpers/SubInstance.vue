<script setup lang="ts">
defineProps<{
  subinstanceTitle: string;
  subinstanceDescription?: string;
  flexDirectrion?: "row" | "column";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
}>();
</script>

<template>
  <div
    class="subinstance"
    :style="`flex-direction: ${flexDirectrion || 'row'}; justify-content: ${
      justifyContent ||
      (flexDirectrion === 'column' ? 'flex-start' : 'space-between')
    }`"
  >
    <div class="subinstance_title">
      <span class="title">{{ subinstanceTitle }}</span>
      <span class="description" v-if="subinstanceDescription">{{
        subinstanceDescription
      }}</span>
    </div>
    <div class="subinstance_body">
      <slot />
    </div>
  </div>
</template>
