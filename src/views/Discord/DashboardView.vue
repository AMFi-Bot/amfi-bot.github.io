<script setup lang="ts">
import "@/assets/scss/dashboard.scss";

import { useDiscordGuildsStore } from "../../stores/discordGuilds";
const discordGuildsStore = useDiscordGuildsStore();

discordGuildsStore.loadGuilds();
</script>

<template>
  <div id="discord_dashboard" class="discord_dashboard">
    <div class="guilds_loading" v-if="discordGuildsStore.loading">
      Loading guilds...
    </div>
    <div
      class="guild_list"
      v-else-if="
        discordGuildsStore.loaded && discordGuildsStore.guilds.length !== 0
      "
    >
      <div class="guild_list_text">Please choose a guild to setup</div>
      <div v-for="guild in discordGuildsStore.guilds" :key="guild.id">
        <div class="guild">
          <div class="guild_desc">
            <img
              class="guild_icon"
              v-bind:src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`"
              width="40"
              height="40"
              v-if="guild.icon"
            />
            <div v-else>N</div>
            <div class="guild_name">{{ guild.name }}</div>
          </div>

          <RouterLink
            class="guild_setup setup_button green_button"
            :to="`/discord/guilds/${guild.id}`"
            v-if="guild.bot_exists"
          >
            Set up
          </RouterLink>
          <div
            class="guild_setup setup_button darkblue_button"
            v-else
            @click="
              () => {
                discordGuildsStore.loginGuild(guild.id);
              }
            "
          >
            Login bot
          </div>
        </div>
      </div>
    </div>
    <div
      class="no_guilds"
      v-else-if="
        discordGuildsStore.loaded && discordGuildsStore.guilds.length === 0
      "
    >
      Oops you dont have any guilds
    </div>
    <div class="guilds_load_error" v-else>Something went wrong! Try again</div>
  </div>
</template>
