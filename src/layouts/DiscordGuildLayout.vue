<script setup lang="ts">
import DiscordGuildHeaderVue from "@/components/Discord/Guild/DiscordGuildHeader.vue";
import FooterComponent from "@/components/FooterComponent.vue";

import NavigateVue from "@/components/Discord/Guild/Navigate.vue";

import "@/assets/scss/discord/base.scss";
</script>

<template>
  <DiscordGuildHeaderVue></DiscordGuildHeaderVue>

  <main class="discord_guild">
    <NavigateVue></NavigateVue>
    <slot />
  </main>
  <FooterComponent></FooterComponent>
</template>
