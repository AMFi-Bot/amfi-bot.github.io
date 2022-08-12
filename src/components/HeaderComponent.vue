<script setup lang="ts">
//import "@/assets/scss/header.scss";
import BaseVue from "./Headers/BaseContent.vue";
import UnloggedVue from "./Headers/NoUser.vue";
import DiscordLogged from "./Headers/DiscordLogged.vue";
import TelegramLogged from "./Headers/TelegramLogged.vue";

import { useUserStore } from "@/stores/user";
import LoadingComponent from "./LoadingComponent.vue";
const userStore = useUserStore();
</script>

<template>
  <BaseVue>
    <DiscordLogged v-if="userStore.discord_id"></DiscordLogged>
    <TelegramLogged v-else-if="userStore.telegram_id"></TelegramLogged>
    <UnloggedVue
      v-else-if="!userStore.loading && !userStore.logged"
    ></UnloggedVue>
    <div v-else>
      <div style="width: 50px">
        <LoadingComponent :loader-type="'line'" />
      </div>
    </div>
  </BaseVue>
</template>
