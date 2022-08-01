<script setup lang="ts">
import "@/assets/scss/header.scss";
import BaseVue from "./Headers/BaseContent.vue";
import UnloggedVue from "./Headers/NoUser.vue";
import DiscordLogged from "./Headers/DiscordLogged.vue";
import TelegramLogged from "./Headers/TelegramLogged.vue";

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>

<template>
  <BaseVue>
    <DiscordLogged v-if="userStore.discord_id"></DiscordLogged>
    <TelegramLogged v-else-if="userStore.telegram_id"></TelegramLogged>
    <UnloggedVue
      v-else-if="!userStore.loading && !userStore.logged"
    ></UnloggedVue>
    <div v-else>Loading...</div>
  </BaseVue>
  <!-- <div id="menu">
    <div id="menu_panel">
      <RouterLink id="menu_name" to="/">AMFi-Bot</RouterLink>
      <div class="menu_ops">
        <a href="/tutorials" class="_mn_ops_elem __mn__tutorials">
          <b>{{ $t("tutorials") }}</b>
        </a>

        <a href="/premium" class="_mn_ops_elem __mn__premium">
          <b class="___mn__premium_title">{{ $t("premium") }}</b>
          <img
            height="20px"
            width="20px"
            src="/img/premium-yellow.svg"
            alt=""
            class="__mn__premium_img"
          />
        </a>
      </div>
    </div>
    <div id="user_ops" class="user_ops">
      <div class="user_loading" v-if="!userStore || userStore.loading">
        Loading...
      </div>
      

      <div class="mn_to_auth" v-else>
        <RouterLink to="/login" class="login_link">{{
          $t("log_in")
        }}</RouterLink>
        <RouterLink to="/register" class="register_link darkblue_button">{{
          $t("sign_up")
        }}</RouterLink>
      </div>
    </div>
  </div> -->
</template>
