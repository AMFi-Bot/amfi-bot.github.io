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
      <div class="relem with-google">
        <a class="wrapper" href="/auth/services/google/redirect">
          <img
            src="/img/btn_google_dark_normal_ios.svg"
            alt=""
            style="width: 35px; margin-left: 3px"
          />
          <label class="srvname tg-srvname" style="padding-left: 9px"
            >Sign up with Google</label
          >
        </a>
      </div>
    </div>

    <form class="register-form" method="POST" action="/api/auth/register">
      <div class="form-body-wrapper">
        <div class="form-input">
          <label class="form-name">Username</label>
          <div class="input-wrapper">
            <input
              type="text"
              name="name"
              aria-label="Username"
              maxlength="255"
              value=""
              autocomplete="off"
            />
          </div>
        </div>
        <div class="form-input">
          <label class="form-name">E-mail</label>
          <div class="input-wrapper">
            <input
              type="email"
              name="email"
              aria-label="E-mail"
              maxlength="255"
              value=""
              autocomplete="on"
            />
          </div>
        </div>
        <div class="form-input">
          <label class="form-name">Password</label>
          <div class="input-wrapper">
            <input
              type="password"
              name="password"
              aria-label="Password"
              minlength="8"
              maxlength="999"
              value=""
              autocomplete="new-password"
            />
          </div>
        </div>
        <div class="form-input">
          <label class="form-name">Confirm password</label>
          <div class="input-wrapper">
            <input
              type="password"
              name="password_confirmation"
              aria-label="Password"
              minlength="8"
              maxlength="999"
              value=""
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
  methods: {
    //register() {}, @click="register"
  },
};
</script>
