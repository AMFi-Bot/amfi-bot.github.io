<script setup lang="ts">
import DiscordGuildHeaderVue from "@/components/Discord/Guild/DiscordGuildHeader.vue";
import SaveChangesVue from "@/components/Discord/Guild/SaveChanges.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <DiscordGuildHeaderVue />

  <div :class="['content']">
    <div :class="$style.discord_guild">
      <slot />
    </div>
    <SaveChangesVue />
  </div>
  <FooterComponent />
</template>

<style module lang="scss">
@import "@/assets/scss/library";

.discord_guild {
  display: flex;
  flex-direction: row;

  position: relative;
  align-items: center;

  width: 100%;
}
</style>
