<script setup lang="ts">
import { useUserStore } from "@/stores/user.js";
import DropdownComponent from "../DropdownComponent.vue";
import LanguagesContent from "../LanguagesContent.vue";

const userStore = useUserStore();
</script>

<template>
  <DropdownComponent
    position="bottom-right"
    elem_class="user"
    content_class="cart"
    :no-hide-on-click-content="true"
  >
    <template #dropdownTitle>
      <img class="avatar" :src="userStore.avatar" v-if="userStore.avatar" />
      <div class="name">
        {{ userStore.name }}
        <div class="type" v-if="userStore.privilege !== 0">
          <img
            height="20px"
            width="20px"
            v-bind:src="
              userStore.privilege === -1
                ? '/img/administrator.svg'
                : '/img/premium-yellow.svg'
            "
            v-tippy="{
              content:
                userStore.privilege === -1
                  ? 'Администратор'
                  : 'Привелегированый пользователь',
            }"
          />
        </div>
      </div>
    </template>
    <template #default>
      <RouterLink to="/dashboard" class="cart_link">
        {{ $t("dashboard") }}
      </RouterLink>
      <RouterLink to="/premium" class="cart_link">{{
        $t("premium")
      }}</RouterLink>
      <RouterLink to="/user/account/settings" class="cart_link">
        {{ $t("user_settings") }}
      </RouterLink>

      <DropdownComponent position="left" content_class="cart_languages">
        <template #dropdownTitle> {{ $t("language") }}/Language </template>
        <template #default><LanguagesContent /></template>
      </DropdownComponent>

      <div @click="userStore.logout()" class="cart_link logout_link">
        {{ $t("log_out") }}
      </div>
    </template>
  </DropdownComponent>
  <tippy
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
  </tippy>
</template>
