<script setup lang="ts">
import { useUserStore } from "@/stores/user.js";
import { computed, type ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import DropdownComponent from "../DropdownComponent.vue";
import LanguagesContent from "../LanguagesContent.vue";
import type { BaseUser } from "@/types/user";

const { t, n } = useI18n();

const userStore = useUserStore();

const user: ComputedRef<BaseUser | undefined> = computed(() => {
  return userStore.user.state == "discord" || userStore.user.state == "telegram"
    ? userStore.user
    : undefined;
});
</script>

<template>
  <DropdownComponent
    position="bottom-right"
    :elem_class="$style.user"
    :content_class="$style.cart"
    :title_class="$style.dropdown_title"
    :no-hide-on-click-content="true"
  >
    <template #dropdownTitle>
      <img :class="$style.avatar" :src="user?.avatar" v-if="user?.avatar" />
      <div :class="$style.name">
        {{ user?.name }}
        <div :class="$style.type" v-if="user?.privelege != 0">
          <img
            height="20px"
            width="20px"
            v-bind:src="
              user?.privelege === -1
                ? '/img/administrator.svg'
                : '/img/premium-yellow.svg'
            "
            v-tippy="{
              content:
                user?.privelege === -1
                  ? 'Администратор'
                  : 'Привелегированый пользователь',
            }"
          />
        </div>
      </div>
    </template>
    <template #default>
      <RouterLink to="/dashboard" :class="$style.cart_link">
        {{ t("dashboard") }}
      </RouterLink>
      <RouterLink to="/premium" :class="$style.cart_link">{{
        t("premium")
      }}</RouterLink>
      <RouterLink to="/user/account/settings" :class="$style.cart_link">
        {{ t("user_settings") }}
      </RouterLink>

      <DropdownComponent
        position="left"
        :content_class="$style.cart_languages"
        :title_class="$style.dropdown_title"
      >
        <template #dropdownTitle> {{ t("language") }}/Language </template>
        <template #default><LanguagesContent /></template>
      </DropdownComponent>

      <div
        @click="userStore.logout()"
        :class="[$style.cart_link, $style.logout_link]"
      >
        {{ t("log_out") }}
      </div>
    </template>
  </DropdownComponent>
  <!-- <tippy
    class="user"
    v-tippy="{
      interactive: true,
      arrow: false,
      placement: 'bottom',
    }"
  >
    <template #content>
      <ul id="cart"></ul>
    </template>
  </tippy> -->
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.user {
  display: flex;
  flex-direction: row;
  align-items: center;

  > .dropdown_title {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 5px 10px;

    text-align: center;
    cursor: pointer;

    background-color: dodgerblue;
    border-radius: 10px;

    @include button(
      $lightblue_button_normal,
      $lightblue_button_hover,
      $lightblue_button_hover
    );
    color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;

    .name {
      display: flex;
      align-content: center;
      margin-left: 10px;
      text-align: center;
      height: 100%;
      position: relative;
      padding-right: 10px !important;

      .type {
        height: 100%;
        padding-top: 3px;
      }
    }
    .avatar {
      border-radius: 50%;
      background-size: 40px;
      width: 40px;
      height: 40px;
      min-height: 40px;
      min-width: 40px;
    }
  }

  //display user options(cart)
  .cart {
    background: $dark_3;
    box-shadow: $box_shadow_1;
    border-radius: $border_radius_1;

    padding: 5px 10px;

    * {
      text-align: left;
    }

    > .cart_link,
    .dropdown_title {
      display: flex;
      padding: 5px 10px;
      border-radius: $border_radius_1;
      color: $font_color_2;
      cursor: pointer;

      @include hover($hover_3);

      &.logout_link {
        color: $red_color_1;
      }
    }
    .cart_languages {
      background: $dark_3;
      box-shadow: $box_shadow_1;
      border-radius: $border_radius_1;

      padding: 5px 10px;

      color: $font_color_2;
      & > li {
        display: flex;
        align-items: center;

        border-radius: $border_radius_1;

        padding: 5px 10px;

        @include hover($hover_3);

        cursor: pointer;
      }
    }
  }
}

#logout {
  color: rgb(167, 42, 57);
}
</style>
