<script setup lang="ts">
import { setI18nLanguage } from "@/i18n";
import { useI18n } from "vue-i18n";
const i18n = useI18n();
</script>

<template>
  <li class="en" @click="setI18nLanguage(i18n, 'en')">
    <span aria-label="🇬🇧, uk, flag-uk">🇬🇧</span>
    English
  </li>
  <li class="ru" @click="setI18nLanguage(i18n, 'ru')">
    <span aria-label="🇷🇺, ru, flag-ru">🇷🇺</span>
    Русский
  </li>
</template>

<style lang="scss">
@import "@/assets/scss/library";
li {
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    margin-right: 5px;
  }
}
</style>
