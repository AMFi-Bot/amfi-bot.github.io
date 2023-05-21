<script setup lang="ts">
import SaveChanges from "@/components/Discord/Guild/SaveChanges.vue";

defineProps<{
  moduleName: string;
  moduleDescriprion: string;
  moduleBaseClass?: string;
  moduleAboutClass?: string;
  moduleBodyClass?: string;
}>();
</script>

<template>
  <div class="discord-guild-module" :class="[$style.module, moduleBaseClass]">
    <div :class="[$style.module_about, moduleAboutClass]">
      <h1>{{ moduleName }}</h1>
      <p>
        {{ moduleDescriprion }}
      </p>
    </div>
    <div :class="[$style.module_body, moduleBodyClass]">
      <slot />
    </div>
  </div>

  <SaveChanges />
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.module {
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin-bottom: 50px;

  .module_about {
    display: flex;
    flex-direction: column;

    width: 100%;

    margin: 10px;
    padding: 10px;

    background-color: $dark_2;

    border-radius: 5px;
    align-self: center;

    align-items: flex-start;
    h1 {
      color: $font_color_1;
      font-size: 26px;
      margin-bottom: 15px;
    }
    p {
      color: $font_color_2;
      font-size: 16px;
    }
  }

  .module_body {
    display: flex;
    flex-direction: column;

    width: 100%;

    margin-top: 10px;
  }
}
</style>

<style global lang="scss">
@import "@/assets/scss/library";

.discord-guild-module {
  .dropdown_elem {
    user-select: none;

    position: relative;

    .dropdown_title {
      min-height: 50px;
      padding: 10px;

      display: flex;
      align-items: center;

      cursor: pointer;

      background-color: $dark_3;
      border: 2px solid black;
      border-radius: 5px;

      @extend %hover_2;
    }

    .dropdown_content {
      display: flex;
      flex-direction: column;

      max-height: 200px;
      border-radius: 5px;

      background-color: $dark_3;
      border: 2px solid black;

      padding: 10px;

      overflow-y: auto;

      z-index: 60;

      .dropdown_content_elem {
        height: 30px;
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;

        cursor: pointer;

        padding: 5px 10px;

        font-size: 16px;
        color: $font_color_1;

        @extend %hover_1;
        border-radius: 5px;

        .checkbox {
          @include checkbox();
        }
      }
    }
  }

  .state_checkbox {
    position: relative;

    width: 100px;
    height: 50px;
    margin: 0;

    vertical-align: top;

    background: $dark_1;
    border-radius: 30px;
    outline: none;
    cursor: pointer;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    transition: all 0.2s ease-out;

    &::after {
      content: "";

      position: absolute;
      left: 5px;
      top: 5px;

      width: 40px;
      height: 40px;
      background-color: #ff3535;
      border-radius: $circle;

      transform: translateX(0);

      transition: all 0.2s ease-out;
    }

    &.enabled::after,
    &:checked::after {
      // in this case percent element = this element
      // In our case elements width = 40px
      // And the parents width = 100px
      // So sides-margin is 5px
      // element have left-side margin = 5px
      // 5px+40px(100%) = 45px - leftside margin for translateX(100%)
      // If include this element = 45px+40px = 85px
      // and 100-5px(rightside margin) = 95px
      // So 95px - 85px = 10px
      // So transform: translateX(calc(100% + 10px))
      transform: translateX(calc(100% + 10px));
      background-color: #fff;
    }

    &.enabled,
    &:checked {
      background-color: $green_button_normal;
    }
  }
}
</style>
