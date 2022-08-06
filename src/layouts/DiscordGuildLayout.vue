<script setup lang="ts">
import DiscordGuildHeaderVue from "@/components/Discord/Guild/DiscordGuildHeader.vue";
import FooterComponent from "@/components/FooterComponent.vue";

import NavigateVue from "@/components/Discord/Guild/NavigateBar.vue";

import "@/assets/scss/discord/base.scss";
import SaveChanges from "../components/Discord/Guild/SaveChanges.vue";
</script>

<template>
  <DiscordGuildHeaderVue />

  <div class="content">
    <div class="discord_guild">
      <NavigateVue />
      <slot />

      <SaveChanges />
    </div>
  </div>
  <FooterComponent />
</template>
