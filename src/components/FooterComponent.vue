<script setup lang="ts">
import { setI18nLanguage } from "@/i18n";
import { useI18n } from "vue-i18n";
const i18n = useI18n();
</script>

<template>
  <div id="footer">
    <div id="footer-component">
      <div class="up_grid">
        <tippy
          class="grid_elem"
          v-tippy="{
            placement: 'top-start',
            interactive: true,
          }"
        >
          {{ $t("language") }}/Language

          <template #content>
            <div id="footer_languages">
              <span class="en" @click="setI18nLanguage(i18n, 'en')">
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
              <span class="ru" @click="setI18nLanguage(i18n, 'ru')">
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
          </template>
        </tippy>

        <a class="grid_elem" href="/tos">
          {{ $t("check_tos") }}
        </a>
        <a class="grid_elem" href="/r_bug">{{ $t("report_bug") }}</a>
        <a class="grid_elem" href="/sug_ftrs">{{ $t("suggest_features") }}</a>
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
            © Vetrov V. D., 2021 - 2022 {{ $t("rights_reserved") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
