<script setup lang="ts">
defineProps<{
  subinstanceName: string;
  subinstanceDescription: string;
  subinstanceBaseClass?: string;
  subinstanceAboutClass?: string;
  subinstanceBodyClass?: string;
}>();
</script>

<template>
  <div :class="[$style.instance, subinstanceBaseClass]">
    <div :class="[$style.instance_title, subinstanceAboutClass]">
      <h2 :class="$style.title">{{ subinstanceName }}</h2>
      <p :class="$style.description">{{ subinstanceDescription }}</p>
    </div>
    <div :class="[$style.instance_body, subinstanceBodyClass]">
      <slot />
    </div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.subinstance {
  display: flex;

  flex-direction: column;
  &.row {
    flex-direction: row;
    align-items: center;
  }

  background-color: $dark_2;
  padding: 10px;
  border-radius: 5px;

  margin-bottom: 20px;

  .subinstance_title {
    margin-bottom: 10px;

    display: flex;
    flex-direction: column;

    align-self: center;

    align-items: center;

    .title {
      font-size: 26px;

      color: $font_color_1;
    }

    .description {
      font-size: 16px;
      color: $font_color_2;
    }
  }
}
</style>
