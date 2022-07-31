<script setup lang="ts">
import "@/assets/scss/auth.scss";

import { useUserStore } from "@/stores/user";
import { onMounted, reactive } from "vue";
const userStore = useUserStore();

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

onMounted(() => {
  userStore.load_telegram_widget_script();
});

const submit = async () => {
  if (form.password !== form.password_confirmation) return;

  console.log(await userStore.register(form));
};
</script>

<template>
  <div class="register">
    <h2 class="reg-title">Регистрация</h2>
    <div class="register_extras">
      <div class="relem with-discord">
        <a class="wrapper" @click="userStore.login_discord">
          <img src="/img/dslogo_white.svg" alt="" width="25px" />
          <label class="srvname discord-srvname">Sign up with Discord</label>
        </a>
      </div>
      <div class="relem with-tg telegram_load">
        <div>Loading telegram authenticating...</div>
      </div>
    </div>

    <form class="register-form" @submit.prevent="submit">
      <div class="form-body-wrapper">
        <div class="form-input">
          <label class="form-name">Username</label>
          <div class="input-wrapper">
            <input
              type="text"
              v-model="form.name"
              placeholder="Print username here"
            />
          </div>
        </div>
        <div class="form-input">
          <label class="form-name">E-mail</label>
          <div class="input-wrapper">
            <input
              type="email"
              v-model="form.email"
              placeholder="Print email here"
            />
          </div>
        </div>
        <div class="form-input">
          <label class="form-name">Password</label>
          <div class="input-wrapper">
            <input
              type="password"
              placeholder="Print password here"
              v-model="form.password"
            />
          </div>
        </div>
        <div class="form-input">
          <label class="form-name">Confirm password</label>
          <div class="input-wrapper">
            <input
              type="password"
              placeholder="Print your password password again"
              v-model="form.password_confirmation"
            />
          </div>
        </div>
        <div class="submit-wrapper">
          <button type="submit" class="submit-button">
            <label>Next</label>
          </button>
        </div>
        <a href="/login" class="alr-registered link">Already registered?</a>
      </div>
    </form>
  </div>
</template>
