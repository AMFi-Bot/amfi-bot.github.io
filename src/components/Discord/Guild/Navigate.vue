<script setup lang="ts">
import "@/assets/scss/discord/navigatePage.scss";

import { ref } from "vue";

const leftside_open = ref(false);

const setup_page = ref("");
</script>

<template>
  <div
    class="discord_guild_nav"
    :class="leftside_open ? 'nav_opened' : 'nav_hidden'"
  >
    <div class="toggle_visible" v-on:click="leftside_open = !leftside_open">
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

    <!-- <div class="nav_opened" v-if="leftside_open">
      
    </div>
    <div class="nav_hidden" v-else>
      <div class="toggle_visible" v-on:click="leftside_open = true">
        <img src="/img/menu.svg" />
      </div>
      <i class="separator_1" style="width: 80%"></i>
      <div v-on:click="setup_page = 'general'">
        <img src="/img/home.svg" />
      </div>
      <i class="separator_1" style="width: 93%"></i>
      <div v-on:click="setup_page = 'general'">
        <img src="/img/settings-sliders.svg" />
      </div>
      <div v-on:click="setup_page = 'moderation'">
        <img src="/img/moderation.svg" />
      </div>
      <div v-on:click="setup_page = 'automoderation'">
        <img src="/img/automoderation.svg" />
      </div>
      <div v-on:click="setup_page = 'commands'">
        <img src="/img/terminal.svg" />
      </div>
      <div v-on:click="setup_page = 'features'">
        <img src="/img/star.svg" />
      </div>
    </div> -->
  </div>
</template>
