<script setup lang="ts">
import { ref } from "vue";

const leftside_open = ref(false);
</script>

<template>
  <div
    :class="[
      $style.discord_guild_nav,
      $style[leftside_open ? 'nav_opened' : 'nav_hidden'],
    ]"
  >
    <div
      :class="$style.toggle_visible"
      v-on:click="leftside_open = !leftside_open"
    >
      <img src="/img/menu.svg" />
      <span>Visible</span>
    </div>
    <i class="separator_1" style="width: 93%"></i>
    <RouterLink to="dashboard">
      <img src="/img/home.svg" />
      <span>Dashboard</span>
    </RouterLink>
    <i class="separator_1" style="width: 93%"></i>
    <RouterLink to="general">
      <img src="/img/settings-sliders.svg" />
      <span>General</span>
    </RouterLink>
    <RouterLink to="moderation">
      <img src="/img/moderation.svg" />
      <span>Moderation</span>
    </RouterLink>
    <RouterLink to="automoderation">
      <img src="/img/automoderation.svg" />
      <span>Automoderation</span>
    </RouterLink>
    <RouterLink to="commands">
      <img src="/img/terminal.svg" />
      <span>Commands</span>
    </RouterLink>
    <RouterLink to="features">
      <img src="/img/star.svg" />
      <span>Features</span>
    </RouterLink>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";

.discord_guild_nav {
  display: flex;
  flex-direction: column;

  position: fixed;
  left: 10px;

  border-radius: 10px;

  background-color: $dark_3;

  & > div,
  & > a {
    display: flex;
    flex-direction: row;

    padding: 5px 10px;
    max-width: 50px;
    height: 50px;
    border-radius: 10px;
    align-items: center;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
    }

    &.toggle_visible {
      margin-bottom: 10px !important;
    }

    @extend %hover_2;
  }

  @keyframes animateOpen {
    from {
    }
    to {
    }
  }

  // @keyframes animateHide {
  //   from {
  //   }
  //   to {
  //   }
  // }

  &.nav_opened {
    padding: 10px;
    & > div,
    & > a {
      max-width: none;

      span {
        margin-left: 15px;
      }

      img {
        height: 30px;
        width: 30px;
      }
    }
  }

  &.nav_hidden {
    padding: 10px 2px;

    span {
      display: none;
    }
  }
}
</style>
