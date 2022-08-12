<script setup lang="ts">
const props = defineProps<{
  instanceName: string;
  instanceDescription: string;
  instanceBaseClass?: string;
  instanceAboutClass?: string;
  instanceBodyClass?: string;
}>();
</script>

<template>
  <div :class="[$style.instance, instanceBaseClass]">
    <div :class="[$style.instance_title, instanceAboutClass]">
      <h2 :class="$style.title">{{ instanceName }}</h2>
      <p :class="$style.description">{{ instanceDescription }}</p>
    </div>
    <div :class="[$style.instance_body, instanceBodyClass]">
      <slot />
    </div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.instance {
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

  .instance_title {
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

  .instance_body {
    border: 2px solid rgba($color: #000000, $alpha: 0.2);
  }
}
</style>
