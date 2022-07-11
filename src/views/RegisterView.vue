<script setup>
import axios from "axios";
</script>

<template>
  <div class="register">
    <h2 class="reg-title">Регистрация</h2>
    <div class="register_extras">
      <div class="relem with-discord">
        <a class="wrapper" href="/api/auth/ext_services/discord/redirect">
          <img src="/img/dslogo_white.svg" alt="" width="25px" />
          <label class="srvname discord-srvname">Sign up with Discord</label>
        </a>
      </div>
      <div class="relem with-tg" id="telegram_load">
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

<script>
export default {
  mounted() {
    console.log("register component mounted");

    axios.get("/sanctum/csrf-cookie");

    // load telegram script

    let telegram_widget_script = document.createElement("script");
    telegram_widget_script.setAttribute(
      "src",
      "https://telegram.org/js/telegram-widget.js?19"
    );
    telegram_widget_script.setAttribute(
      "data-telegram-login",
      "ThisIsTheCatBot"
    );
    telegram_widget_script.setAttribute("data-size", "large");
    telegram_widget_script.setAttribute(
      "data-auth-url",
      "http://my-app-dev.com/api/auth/ext_services/telegram/callback"
    );
    telegram_widget_script.setAttribute("data-request-access", "write");
    telegram_widget_script.setAttribute("data-userpic", "false");
    let load_tg_widget_elem = document.getElementById("telegram_load");

    load_tg_widget_elem.replaceChildren(telegram_widget_script);
  },

  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
    };
  },

  methods: {
    async submit() {
      if (this.form.password !== this.form.password_confirmation) return;

      axios
        .post("/auth/register", this.form, {
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
