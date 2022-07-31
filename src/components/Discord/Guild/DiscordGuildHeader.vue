<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { setI18nLanguage } from "@/i18n";
import { useI18n } from "vue-i18n";

const userStore = useUserStore();
const i18n = useI18n();
</script>

<template>
  <div id="menu">
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
      <tippy
        class="user"
        v-else-if="userStore.logged"
        v-tippy="{
          interactive: true,
          arrow: false,
          placement: 'bottom',
        }"
      >
        <img
          class="_usr_avatar"
          :src="userStore.avatar"
          v-if="userStore.avatar"
        />
        <div class="_usr_name">
          {{ userStore.name }}
          <div class="_usr_type" v-if="userStore.privilege !== 0">
            <img
              height="20px"
              width="20px"
              v-bind:src="
                userStore.privilege === -1
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
        <template #content>
          <ul id="cart">
            <RouterLink to="/dashboard" class="cart_link">
              {{ $t("dashboard") }}
            </RouterLink>
            <RouterLink to="/premium" class="cart_link">{{
              $t("premium")
            }}</RouterLink>
            <RouterLink to="/user/account/settings" class="cart_link">
              {{ $t("user_settings") }}
            </RouterLink>
            <tippy
              class="cart_link"
              v-tippy="{
                interactive: true,
                placement: 'left',
                arrow: false,
                theme: 'right-10',
              }"
            >
              {{ $t("language") }}/Language
              <template #content>
                <ul id="cart_languages">
                  <li class="en" @click="setI18nLanguage(i18n, 'en')">
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
                  <li class="ru" @click="setI18nLanguage(i18n, 'ru')">
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
              </template>
            </tippy>

            <div @click="userStore.logout()" class="cart_link logout_link">
              {{ $t("log_out") }}
            </div>
          </ul>
        </template>
      </tippy>

      <div class="mn_to_auth" v-else>
        <RouterLink to="/login" class="login_link">{{
          $t("log_in")
        }}</RouterLink>
        <RouterLink to="/register" class="register_link darkblue_button">{{
          $t("sign_up")
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>
