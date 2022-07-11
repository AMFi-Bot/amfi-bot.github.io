<script setup>
import axios from "axios";
</script>

<template>
  <div class="login">
    <h2 class="log-title">Вход</h2>
    <div class="login_extras">
      <div class="lelem with-discord">
        <a class="wrapper" href="/auth/services/discord/redirect">
          <img src="/img/dslogo_white.svg" alt="" width="25px" />
          <label class="srvname discord-srvname">Log in with Discord</label>
        </a>
      </div>
      <div class="lelem with-tg">
        <a class="wrapper" href="#" onclick="return TWidgetLogin.auth();">
          <img src="/img/tg_logo.svg" alt="" />
          <label class="srvname tg-srvname">Log in with Telegram</label>
        </a>
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
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  mounted() {
    axios.get("/sanctum/csrf-cookie");
  },

  methods: {
    async submit() {
      axios
        .post("/auth/login", this.form, {
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          console.log(this.form);
          console.log(response);
        })
        .catch((error) => {
          console.log(this.form);
          console.log(error);
        });
    },
  },
};
</script>
