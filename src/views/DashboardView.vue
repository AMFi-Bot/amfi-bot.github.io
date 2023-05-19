<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
import TelegramLogo from "../components/Icons/TelegramLogo.vue";
import DiscordLogoWhite from "../components/Icons/DiscordLogoWhite.vue";

const userStore = useUserStore();

const userState = computed(() => userStore.user.state);
</script>

<template>
  <div :class="$style.dashboard" v-if="userStore">
    <div :class="$style.setupMessengers">
      <div :class="[$style.setupMessenger, $style.setupTelegram]">
        <div :class="$style.messengerDescription">
          <h2 :class="$style.title">Set up Telegram</h2>
          <TelegramLogo :class="[$style.logo, $style.telegram_logo]" />
          <p :class="$style.desc">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
            impedit.
          </p>
        </div>
        <div
          :class="[
            $style.setup_button,
            userState == 'telegram' ? $style.green_button : undefined,
          ]"
        >
          <RouterLink to="/telegram/dashboard" v-if="userState == 'telegram'">
            Set up
          </RouterLink>
          <div v-else>
            <div class="telegram_login_mount">
              <div>Loading telegram authenticating...</div>
            </div>
          </div>
        </div>
      </div>

      <div :class="[$style.setupMessenger, $style.setupDiscord]">
        <div :class="$style.messengerDescription">
          <h2 :class="$style.title">Set up Discord</h2>
          <DiscordLogoWhite :class="[$style.logo, $style.discord_logo]" />
          <p :class="$style.desc">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
            impedit.
          </p>
        </div>
        <div
          :class="[
            $style.setup_button,
            userState == 'discord'
              ? $style.green_button
              : $style.darkblue_button,
          ]"
        >
          <RouterLink to="/discord/dashboard" v-if="userState == 'discord'">
            Set up
          </RouterLink>
          <div v-else @click="userStore.loginFlow">
            Log In Discord and set up
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";

.dashboard {
  display: flex;
  flex-direction: column;

  margin: 25px;

  .setupMessengers {
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media (max-width: 540px) {
      flex-direction: column-reverse;
      align-items: center;
    }

    gap: 25px;

    margin-top: 10px;

    width: 100%;

    > .setupMessenger {
      display: flex;
      flex-direction: column;

      justify-content: space-between;
      align-items: center;

      min-height: 290px;
      max-width: 315px;

      border-radius: $border_radius_1;
      padding: 10px;

      background-color: $dark_2;

      .messengerDescription {
        display: flex;
        flex-direction: column;

        align-items: center;

        gap: 5px;

        .title {
          font-size: 24px;
          color: $font_color_1;
        }

        .logo {
          width: 50px;
          height: 50px;
        }

        .desc {
          font-size: 20px;
          color: $font_color_2;
          text-align: center;
        }
      }

      .setup_button {
        @include setup_button();
        align-self: center;
        margin-bottom: 10px;
        margin-top: 20px;

        min-width: 100px;
        min-height: 35px;

        &.green_button {
          @extend %green_button;
        }
        &.darkblue_button {
          @extend %darkblue_button;
        }
      }
    }
  }
}
</style>
