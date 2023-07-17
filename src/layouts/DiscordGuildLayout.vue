<script setup lang="ts">
import DiscordGuildHeaderVue from "@/components/Discord/Guild/DiscordGuildHeader.vue";
import SaveChangesVue from "@/components/Discord/Guild/SaveChanges.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <DiscordGuildHeaderVue />

  <div :class="['content']">
    <div :class="[$style.discord_guild, 'discord_guild']">
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

  padding: 10px;
}
</style>

<style lang="scss">
@import "@/assets/scss/library";

.discord_guild {
  .dropdown_elem {
    user-select: none;

    position: relative;

    .dropdown_title {
      min-height: 50px;
      padding: 10px;

      display: flex;
      align-items: center;

      cursor: pointer;

      background-color: $dark_3;
      border: 2px solid black;
      border-radius: 5px;

      @extend %hover_2;
    }

    .dropdown_content {
      display: flex;
      flex-direction: column;

      max-height: 200px;
      border-radius: 5px;

      background-color: $dark_3;
      border: 2px solid black;

      padding: 10px;

      overflow-y: auto;

      z-index: 2400;

      .dropdown_content_elem {
        min-height: 30px;
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;

        cursor: pointer;

        padding: 5px;

        font-size: 16px;
        color: $font_color_1;

        @extend %hover_1;
        border-radius: 5px;

        .checkbox {
          @include checkbox();
        }
      }
    }
  }
}
</style>
