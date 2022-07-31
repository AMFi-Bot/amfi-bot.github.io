<script setup lang="ts">
import DiscordGuildHeaderVue from "@/components/Discord/Guild/DiscordGuildHeader.vue";
import FooterComponent from "@/components/FooterComponent.vue";

import NavigateVue from "@/components/Discord/Guild/Navigate.vue";

import "@/assets/scss/discord/base.scss";
</script>

<template>
  <DiscordGuildHeaderVue></DiscordGuildHeaderVue>

  <div class="content">
    <div class="discord_guild">
      <NavigateVue></NavigateVue>
      <slot />
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>
