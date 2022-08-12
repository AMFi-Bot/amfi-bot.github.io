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
      <div :class="[$style.icon]">
        <div :class="[$style.show_hide_icon_wrapper]">
          <div :class="$style.show_hide_icon"></div>
        </div>
      </div>
      <!-- <span>Visible</span> -->
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
  gap: 5px;

  position: fixed;
  left: 10px;
  z-index: 1000;

  border-radius: 10px;

  background-color: $dark_3;

  transition: all 200ms ease;

  .icon .show_hide_icon_wrapper {
    width: 100%;
    height: 100%;

    position: relative;

    .show_hide_icon,
    .show_hide_icon::after,
    .show_hide_icon::before {
      background: $font_color_2;
      content: "";
      display: block;
      height: 4px;
      position: absolute;
      transition: background ease 0.3s, top ease 0.3s 0.3s, transform ease 0.3s;
      width: 30px;
      border-radius: 100px;
    }

    .show_hide_icon {
      left: 0;
      top: 15px;
    }

    .show_hide_icon::before {
      top: -9px;
    }

    .show_hide_icon::after {
      top: 9px;
    }
  }

  &.nav_opened {
    .icon .show_hide_icon_wrapper {
      .show_hide_icon {
        background: transparent;

        &::before {
          transform: rotate(45deg);
        }
        &::after {
          transform: rotate(-45deg);
        }

        &::after,
        &::before {
          top: 0;
          transition: top ease 0.3s, transform ease 0.3s 0.3s;
        }
      }
    }
  }

  & > div,
  & > a {
    display: flex;
    flex-direction: row;

    padding: 5px 10px;
    height: 50px;
    border-radius: 10px;
    align-items: center;
    cursor: pointer;

    .icon,
    img {
      height: 30px;
      width: 30px;
      min-width: 30px;
    }

    span {
      overflow: hidden;
      white-space: nowrap;
      margin-left: 15px;
    }

    @extend %hover_2;
  }

  &.nav_opened {
    padding: 10px;
    width: 200px;
  }

  &.nav_hidden {
    padding: 10px 2px;
    width: 54px;
  }
}
</style>
