<script setup>
import axios from "axios";

import { useUserStore } from "../stores/user";
const userStore = useUserStore();

const backend_url = import.meta.env.VITE_BACKEND_URL;
</script>

<template>
  <div class="login">
    <h2 class="log-title">Вход</h2>
    <div class="register_extras">
      <div class="relem with-discord">
        <a class="wrapper" @click="userStore.login_discord">
          <img src="/img/dslogo_white.svg" alt="" width="25px" />
          <label class="srvname discord-srvname">Sign up with Discord</label>
        </a>
      </div>
      <div class="relem with-tg" id="telegram_load">
        <div>Loading telegram authenticating...</div>
      </div>
    </div>

    <form class="login-form" @submit.prevent="submit">
      <div class="form-body-wrapper">
        <div class="form-input">
          <label class="form-name">E-mail</label>
          <div class="input-wrapper">
            <input
              type="email"
              placeholder="Enter your email here"
              v-model="form.email"
            />
          </div>
        </div>

        <div class="form-input">
          <label class="form-name">Password</label>
          <div class="input-wrapper">
            <input
              type="password"
              placeholder="Enter your password here"
              v-model="form.password"
            />
          </div>
        </div>

        <div class="submit-wrapper">
          <button type="submit" class="submit-button">
            <label>Next</label>
          </button>
        </div>
        <a href="/register" class="not-registered link">Not registered yet?</a>
      </div>
    </form>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";

export default {
  mounted() {
    this.userStore.load_telegram_widget_script(document);
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async submit() {
      console.log(await this.userStore.login(this.form));
    },
  },
};
</script>
