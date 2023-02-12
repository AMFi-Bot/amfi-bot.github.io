<script setup lang="ts">
import DropdownComponent from "../DropdownComponent.vue";
import { useI18n } from "vue-i18n";

const { t, n } = useI18n();
</script>

<template>
  <div :class="$style.header">
    <div :class="$style.menu_panel">
      <DropdownComponent
        position="bottom-left"
        :elem_class="$style.menu_dropdown"
        :title_class="$style.dropdown_title"
        :content_class="$style.menu_ops"
      >
        <template #dropdownTitle>...</template>
        <template #default>
          <a href="/tutorials">
            <span>{{ t("tutorials") }}</span>
          </a>

          <a href="/premium" :class="$style.premium">
            <span>{{ t("premium") }}</span>
            <img
              src="/img/premium-yellow.svg"
              :class="$style.premium_icon"
              alt=""
            />
          </a>
        </template>
      </DropdownComponent>
      <RouterLink :class="$style.bot_name" to="/">AMFi-Bot</RouterLink>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.header {
  display: flex;
  background-color: $dark_2;
  height: 75px;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
}
.menu_panel {
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 100%;

  .menu_dropdown {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media (min-width: 510px) {
    flex-direction: row-reverse;
    .dropdown_title {
      display: none !important;
    }
    .menu_ops {
      display: flex !important;
      position: static !important;
      padding: 0 10px !important;
    }
  }

  .dropdown_title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;

    height: 30px !important;

    background: $dark_3;

    border: 2px solid black;
    border-radius: $border_radius_1;

    cursor: pointer;
  }

  .bot_name {
    @media (max-width: 510px) {
      border: none;
    }
    border-inline-end: 0.5px solid rgba(255, 255, 255, 0.65);
    padding-inline-end: 30px;

    padding-left: 20px;
    font-weight: bold;
    font-size: 25px;
    cursor: pointer;
    color: white;
    display: inline;
    white-space: nowrap;
  }

  .menu_ops {
    display: flex;
    flex-direction: row !important;

    height: 100%;

    & > * {
      display: flex;
      align-items: center;
      text-align: center;
      height: 100%;
      border-bottom: 2px solid rgba(0, 0, 0, 0);

      padding: 0 10px;

      cursor: pointer;

      * {
        color: #fff;
        font-weight: 500;
        padding: 0 10px;
      }

      &:hover {
        border-bottom: 2px solid #ddd;
      }

      &.premium {
        position: relative;

        .premium_icon {
          width: 20px;
          height: 20px;
          padding: 0;
          position: absolute;
          top: 13px;
          right: -5px;
        }
      }
    }
  }

  @media (max-width: 510px) {
    .menu_ops {
      background: $dark_3;

      border: 2px solid black;
      border-radius: $border_radius_1;

      padding: 10px 30px !important;
      margin-top: 10px;
    }
  }
}
</style>
