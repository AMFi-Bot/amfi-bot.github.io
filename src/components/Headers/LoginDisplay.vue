<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import LoadingComponent from "../LoadingComponent.vue";

import Unlogged from "./NoUser.vue";
import DiscordLogged from "./DiscordLogged.vue";
import TelegramLogged from "./TelegramLogged.vue";

const userStore = useUserStore();
</script>

<template>
  <div v-if="userStore.user.state == 'loading'">
    <div style="width: 50px">
      <LoadingComponent :loader-type="'line'" />
    </div>
  </div>
  <DiscordLogged v-else-if="userStore.user.state == 'discord'"></DiscordLogged>
  <Unlogged v-else-if="userStore.user.state == 'unauthenticated'"></Unlogged>
  <TelegramLogged
    v-else-if="userStore.user.state == 'telegram'"
  ></TelegramLogged>
</template>
