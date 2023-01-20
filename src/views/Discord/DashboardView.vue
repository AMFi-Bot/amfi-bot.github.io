<script setup lang="ts">
import loadUserGuilds from "@/helpers/discord/loadUserGuilds";
import { useErrorsStore } from "@/stores/errors";
import type { DiscordUserGuild } from "@/types/discord/guild";
import { ref, type Ref } from "vue";
import { RouterLink } from "vue-router";
import { loginGuild } from "@/helpers/discord/loginGuild";

const userGuilds: Ref<DiscordUserGuild[] | "loading" | "error"> =
  ref("loading");

loadUserGuilds("bot")
  .then((g) => (userGuilds.value = g))
  .catch((error) => {
    console.error(error);

    useErrorsStore().addError(
      "Oops something went wrong and we cannot get your guilds list."
    );

    userGuilds.value = "error";
  });
</script>

<template>
  <div :class="$style.discord_dashboard">
    <div :class="$style.guilds_loading" v-if="userGuilds == 'loading'">
      Loading guilds...
    </div>
    <div :class="$style.guilds_load_error" v-else-if="userGuilds == 'error'">
      Something went wrong! Try again
    </div>
    <div :class="$style.guild_list" v-else-if="userGuilds.length !== 0">
      <div :class="$style.guild_list_title">Please choose a guild to setup</div>
      <div v-for="guild in userGuilds" :key="guild.id">
        <div :class="$style.guild">
          <div :class="$style.guild_desc">
            <img
              :class="$style.guild_icon"
              v-bind:src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`"
              width="40"
              height="40"
              v-if="guild.icon"
            />
            <div v-else>N</div>
            <div :class="$style.guild_name">{{ guild.name }}</div>
          </div>

          <RouterLink
            :class="[
              $style.guild_setup,
              $style.green_button,
              $style.setup_button,
            ]"
            :to="`/discord/guilds/${guild.id}`"
            v-if="guild.bot_exists"
          >
            Set up
          </RouterLink>
          <div
            :class="[
              $style.guild_setup,
              $style.darkblue_button,
              $style.setup_button,
            ]"
            v-else
            @click="
              () => {
                loginGuild(guild.id);
              }
            "
          >
            Login bot
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.no_guild_alert" v-else-if="userGuilds.length == 0">
      Oops you dont have any guilds
    </div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.discord_dashboard {
  display: flex;
  flex-direction: column;

  align-items: center;

  .guild_list {
    display: flex;
    flex-direction: column;
    width: 600px;
    padding: 5px;
    margin: 20px 0;
    border-radius: 5px;
    background-color: #212426;

    .guild_list_title {
      margin: 10px 0;
      font-size: 22px;
      font-weight: bold;
      text-align: center;
    }

    .guild {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      width: 100%;
      height: 50px;
      border: 1px dotted rgba(216, 216, 216, 0.5);
      border-radius: 5px;
      margin: 10px 0;
      padding: 5px;

      .guild_desc {
        display: flex;
        flex-direction: row;
        height: 100%;
        align-items: center;
        text-align: center;

        .guild_icon {
          border-radius: 500px;
          margin-right: 10px;
        }
      }
      .setup_button {
        @include setup_button();
        margin-right: 5px;

        padding: 5px 15px;

        &.green_button {
          @extend %green_button;
        }
        &.darkblue_button {
          @extend %darkblue_button;
        }
      }
    }
  }
}
</style>
