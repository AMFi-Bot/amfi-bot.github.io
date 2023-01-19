<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { computed, type ComputedRef } from "vue";
import LoadingComponent from "../LoadingComponent.vue";

import Unlogged from "./NoUser.vue";
import DiscordLogged from "./NoUser.vue";
import TelegramLogged from "./NoUser.vue";

const userStore = useUserStore();
userStore.loadUser();
const userState: ComputedRef<"loading" | "unLogged" | "discord" | "telegram"> =
  computed(() => {
    if (userStore.loading) return "loading";
    else if (userStore.user?.discordUser) return "discord";
    else if (userStore.user?.telegramUser) return "telegram";
    else return "unLogged";
  });
</script>

<template>
  <div v-if="userState == 'loading'">
    <div style="width: 50px">
      <LoadingComponent :loader-type="'line'" />
    </div>
  </div>
  <Unlogged v-else-if="userState == 'unLogged'"></Unlogged>
  <DiscordLogged v-else-if="userState == 'discord'"></DiscordLogged>
  <TelegramLogged v-else-if="userState == 'telegram'"></TelegramLogged>
</template>
