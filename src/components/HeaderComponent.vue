<template>
  <div id="menu">
    <div id="menu_panel">
      <RouterLink id="menu_name" to="/">AFMi-Bot</RouterLink>
      <div class="menu_ops">
        <a href="/moderation" class="_mn_ops_elem __mn__moderation">
          <b>{{ $t("Moderation") }}</b>
        </a>

        <a href="/tutorials" class="_mn_ops_elem __mn__tutorials">
          <b>{{ $t("Tutorials") }}</b>
        </a>

        <a href="/premium" class="_mn_ops_elem __mn__premium">
          <b class="___mn__premium_title">{{ $t("Premium") }}</b>
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
      <div class="user" v-if="user" @click="toggleCart">
        <img class="_usr_avatar" :src="user.avatar" v-if="user.avatar" />
        <div class="_usr_name">
          {{ user.name }}
          <div class="_usr_type" v-if="user.privilege !== 0">
            <img
              height="20px"
              width="20px"
              v-bind:src="
                user.privilege === -1
                  ? '/img/administrator.svg'
                  : '/img/premium-yellow.svg'
              "
            />
            <!--
                        <script>
                            tippy('._usr_type img', {
                                content: "{{($user.privelege == -1)
                                ?"Администратор":
                                "Привелегированый пользователь"}}",
                            })
                        </script>
                        -->
          </div>
        </div>
      </div>
      <div class="mn_to_auth" v-else>
        <RouterLink to="/login">{{ $t("Log In") }}</RouterLink>
        <RouterLink to="/register">{{ $t("Sign Up") }}</RouterLink>
      </div>
      <ul id="cart" v-show="cart_visible">
        <a href="/dashboard/" class="dashboard_link">
          {{ $t("Dashboard") }}
        </a>
        <a href="/rank/" class="rank_link">{{ $t("My rank") }}</a>
        <a href="/premium/" class="premium_link">{{ $t("Premium") }}</a>
        <a href="/user/account/settings/" class="settings_link">
          {{ $t("Settings") }}
        </a>
        <div>
          <li class="language" @click="toggleLanguages">
            {{ $t("Language") }}/Language
          </li>
          <ul id="languages" class="languages" v-show="languages_visible">
            <li class="en">
              <span aria-label="🇺🇸, us, flag-us" class="emoji-mart-emoji">
                <span
                  style="
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background-image: url('https://unpkg.com/emoji-datasource-twitter@5.0.1/img/twitter/sheets-256/64.png');
                    background-size: 5700% 5700%;
                    background-position: 7.14286% 76.7857%;
                  "
                >
                </span>
              </span>
              English
            </li>
            <li class="ru">
              <span aria-label="🇷🇺, ru, flag-ru" class="emoji-mart-emoji">
                <span
                  style="
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background-image: url('https://unpkg.com/emoji-datasource-twitter@5.0.1/img/twitter/sheets-256/64.png');
                    background-size: 5700% 5700%;
                    background-position: 5.35714% 100%;
                  "
                >
                </span>
              </span>
              Русский
            </li>
          </ul>
        </div>
        <a
          class="mn_logout_link"
          href="/logout"
          style="color: rgb(167, 42, 57)"
        >
          {{ $t("Log out") }}
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("Menu mounted");
  },
  props: ["user"],
  data() {
    return {
      cart_visible: false,
      languages_visible: false,
    };
  },
  methods: {
    closeCart(e) {
      if (!document.getElementById("user_ops").contains(e.target)) {
        this.cart_visible = false;
        this.languages_visible = false;
      }
    },
    toggleCart() {
      this.cart_visible = !this.cart_visible;
      if (!this.cart_visible) {
        this.languages_visible = false;
      }
    },
    toggleLanguages() {
      this.languages_visible = !this.languages_visible;
    },
  },
  created() {
    document.addEventListener("click", this.closeCart);
  },
};
</script>

<style></style>
