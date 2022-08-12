<script setup lang="ts">
import DiscordGuildHeaderVue from "@/components/Discord/Guild/DiscordGuildHeader.vue";
import FooterComponent from "@/components/FooterComponent.vue";

import NavigateVue from "@/components/Discord/Guild/NavigateBar.vue";

import SaveChanges from "../components/Discord/Guild/SaveChanges.vue";
</script>

<template>
  <DiscordGuildHeaderVue />

  <div class="content">
    <div :class="$style.discord_guild">
      <NavigateVue />
      <slot />

      <SaveChanges />
    </div>
  </div>
  <FooterComponent />
</template>

<style module lang="scss">
@import "@/assets/scss/library";

.discord_guild {
  display: flex;
  flex-direction: row;

  position: relative;
  justify-content: center;

  margin-top: 10px;
}
</style>
