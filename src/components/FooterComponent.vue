<template>
  <div id="footer">
    <div id="footer-component">
      <div class="up_grid">
        <div class="grid_elem dropdown_elem" id="_ft_language_sb">
          <div class="language_label dropdown_title" @click="toggleLanguages">
            <i
              class="dropdown_arrow"
              :class="languages_visible ? 'dropdown_shown' : 'dropdown_hidden'"
            ></i>
            <span class="title">{{ $t("Language") }}/Language</span>
          </div>
          <div
            class="languages_list dropdown_list up"
            v-show="languages_visible"
          >
            <span class="en language" @click="switchLanguage('en')">
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
            </span>
            <span class="ru language" @click="switchLanguage('ru')">
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
            </span>
          </div>
        </div>
        <a class="grid_elem" href="/tos">
          {{ $t("Check ToS") }}
        </a>
        <a class="grid_elem" href="/r_bug">{{ $t("Report a bug") }}</a>
        <a class="grid_elem" href="/sug_ftrs">{{
          $t("Suggest new features")
        }}</a>
      </div>
      <div class="down_panel">
        <div class="links_panel">
          <a
            class="link_elem discord_logo logo element"
            a
            href="https://discord.gg/3qZCnzNXcq"
          >
            <img height="68" width="68" src="/img/discord_logo.png" />
          </a>
          <a
            class="link_elem github_logo logo element"
            href="https://github.com/Waujito"
          >
            <img height="50" width="50" src="/img/github_logo.png" />
          </a>
          <a
            class="link_elem telegram_logo logo element"
            href="https://t.me/cat_bot_ds"
          >
            <img height="70" width="70" src="/img/telegram_logo.png" />
          </a>
        </div>
        <div class="copyrights element">
          <div class="copyright" style="margin-bottom: 5px">
            Icons made by
            <a
              href="https://www.flaticon.com/authors/pixel-perfect"
              title="Pixel perfect"
              >Pixel perfect</a
            >,
            <a
              href="https://www.flaticon.com/authors/aswell-studio"
              title="Aswell Studio"
              >Aswell Studio</a
            >,
            <a href="https://www.freepik.com" title="Freepik">Freepik</a>
            from
            <a href="https://www.flaticon.com/" title="Flaticon"
              >www.flaticon.com</a
            >
          </div>
          <div class="copyright">
            © Vetrov V. D., 2021 - 2022 {{ $t("All rights reserved") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("Footer mounted");
  },
  data() {
    return {
      languages_visible: false,
    };
  },
  methods: {
    switchLanguage(lang) {
      this.$cookies.set("language", lang, 2419200);

      console.log(lang);
      console.log(this.$cookies.get("language"));
    },
    closeCart(e) {
      if (!document.getElementById("_ft_language_sb").contains(e.target)) {
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
