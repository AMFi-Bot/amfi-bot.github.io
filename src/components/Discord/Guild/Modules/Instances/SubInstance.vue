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

  <!-- <div
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
  </div> -->
</template>

<style module lang="scss">
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
// .subinstance {
//   display: flex;

//   margin-bottom: 5px;

//   flex-direction: column;

//   &.row {
//     flex-direction: row;
//     align-items: center;

//     &.sbtw {
//       justify-content: space-between;
//     }
//   }

//   background-color: $dark_2;
//   padding: 10px;
//   border-radius: $border_radius_1;
//   border: 2px solid rgba($color: #000000, $alpha: 0.2);

//   .subinstance_title {
//     margin-right: 10px;
//     margin-bottom: 10px;

//     display: flex;
//     flex-direction: column;

//     align-self: flex-start;

//     .title {
//       font-size: 18px;

//       color: $font_color_1;
//     }

//     .description {
//       font-size: 14px;
//       color: $font_color_2;
//     }
//   }
// }
</style>
