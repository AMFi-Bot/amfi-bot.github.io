<script setup lang="ts">
import { useUserStore } from "@/stores/user.js";
import { setI18nLanguage } from "@/i18n";
import { useI18n } from "vue-i18n";

const userStore = useUserStore();

const i18n = useI18n();
</script>

<template>
  <tippy
    class="user"
    v-tippy="{
      interactive: true,
      arrow: false,
      placement: 'bottom',
    }"
  >
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
    <template #content>
      <ul id="cart">
        <RouterLink to="/dashboard" class="cart_link">
          {{ $t("dashboard") }}
        </RouterLink>
        <RouterLink to="/premium" class="cart_link">{{
          $t("premium")
        }}</RouterLink>
        <RouterLink to="/user/account/settings" class="cart_link">
          {{ $t("user_settings") }}
        </RouterLink>
        <tippy
          class="cart_link"
          v-tippy="{
            interactive: true,
            placement: 'left',
            arrow: false,
            theme: 'right-10',
          }"
        >
          {{ $t("language") }}/Language
          <template #content>
            <ul id="cart_languages">
              <li class="en" @click="setI18nLanguage(i18n, 'en')">
                <span aria-label="🇺🇸, us, flag-us" class="emoji-mart-emoji">
                  <span
                    style="
                      width: 20px;
                      height: 20px;
                      display: inline-block;
                      background-image: url('https://unpkg.com/emoji-datasource-twitter@5.0.1/img/twitter/sheets-256/64.png');
                      background-size: 5700% 5700%;
                      background-position: 7.14286% 76.7857%;
                    "
                  >
                  </span>
                </span>
                English
              </li>
              <li class="ru" @click="setI18nLanguage(i18n, 'ru')">
                <span aria-label="🇷🇺, ru, flag-ru" class="emoji-mart-emoji">
                  <span
                    style="
                      width: 20px;
                      height: 20px;
                      display: inline-block;
                      background-image: url('https://unpkg.com/emoji-datasource-twitter@5.0.1/img/twitter/sheets-256/64.png');
                      background-size: 5700% 5700%;
                      background-position: 5.35714% 100%;
                    "
                  >
                  </span>
                </span>
                Русский
              </li>
            </ul>
          </template>
        </tippy>

        <div @click="userStore.logout()" class="cart_link logout_link">
          {{ $t("log_out") }}
        </div>
      </ul>
    </template>
  </tippy>
</template>
