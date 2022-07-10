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

      <div class="lelem with-google">
        <a class="wrapper" href="/auth/services/google/redirect">
          <img
            src="/img/btn_google_dark_normal_ios.svg"
            alt=""
            style="width: 35px; margin-left: 3px"
          />
          <label class="srvname tg-srvname" style="padding-left: 9px"
            >Log in with Google</label
          >
        </a>
      </div>
    </div>

    <form class="login-form" method="POST">
      @csrf

      <div class="form-body-wrapper">
        <div class="form-input">
          <label class="form-name">E-mail</label>
          <div class="input-wrapper">
            <input
              type="email"
              name="email"
              aria-label="E-mail"
              maxlength="255"
              value=""
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
              maxlength="999"
              value=""
              autocomplete="current-password"
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
