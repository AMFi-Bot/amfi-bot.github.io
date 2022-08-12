<script setup lang="ts">
import { onMounted } from "vue";

import { useUserStore } from "@/stores/user";
import DropdownComponent from "../DropdownComponent.vue";
const userStore = useUserStore();

onMounted(() => {
  userStore.load_telegram_widget_script("telegram_auth_mount_point");
});
</script>

<template>
  <!-- Adaptive design support -->
  <DropdownComponent
    :position="'bottom-right'"
    :elem_class="$style.login_dropdown"
    :title_class="$style.dropdown_title"
    :content_class="$style.login_panel"
  >
    <template #dropdownTitle> Login </template>
    <template #default>
      <div
        :class="[
          $style.login_type,
          $style.telegram,
          'telegram_auth_mount_point',
        ]"
      >
        <div>Loading telegram auth form...</div>
      </div>
      <div
        :class="[$style.login_type, $style.discord]"
        @click="userStore.login_discord()"
      >
        <img src="/img/dslogo_white.svg" alt="" />
        <label :class="$style.login_title">Log in with Discord</label>
      </div>
    </template>
  </DropdownComponent>
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.login_dropdown {
  @media (min-width: 870px) {
    .dropdown_title {
      display: none !important;
    }
    .login_panel {
      display: flex !important;
      position: static !important;
    }
  }

  .dropdown_title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;

    background: $dark_3;

    border: 2px solid black;
    border-radius: $border_radius_1;

    cursor: pointer;
  }

  .login_panel {
    display: flex;
    flex-direction: row !important;
    align-items: center;
    @media (max-width: 870px) {
      background: $dark_3;

      padding: 10px 20px;
      margin: 20px;

      border-radius: $border_radius_1;
    }
    @media (max-width: 480px) {
      flex-direction: column !important;
      justify-content: center;

      > * {
        margin-right: 0 !important;
        &.discord {
          margin-top: 10px;
        }
      }
    }
    .login_type {
      margin-right: 20px;

      &.discord {
        display: flex;
        flex-direction: row;
        background-color: $dark_3;
        border-radius: 5px;
        border: 1px solid rgba(255, 255, 255, 0.3);

        margin-right: 0;

        padding: 5px;
        white-space: nowrap;
        &,
        * {
          cursor: pointer;
        }

        .login_title {
          padding: 5px;
          color: $font_color_1;
        }
        img {
          margin-left: 5px;
          margin-right: 10px;
          width: 25px;
        }
      }
    }
  }
}
</style>
