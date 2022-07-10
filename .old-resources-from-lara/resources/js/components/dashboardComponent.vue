<template>
  <div id="dashboard" class="dashboard">
    {{ user }}
    <div class="setupMessengers">
      <div class="setupMessenger setupTelegram">
        <div class="msgDesc">
          <h2 class="mainText">Set up Telegram</h2>
          <img
            class="msgLogo"
            src="/img/tg_logo.svg"
            width="50"
            height="50"
            alt=""
          />
          <p class="desc">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
            impedit.
          </p>
        </div>
        <div
          class="setup_button"
          v-bind:class="user.telegram_id ? 'green_button' : 'darkblue_button'"
        >
          <a href="/telegram" v-if="user.telegram_id"> Set up </a>
          <div v-else v-on:click="loginTelegram">
            Log In telegram and set up
          </div>
        </div>
      </div>

      <div class="setupMessenger setupDiscord">
        <div class="msgDesc">
          <h2 class="mainText">Set up Discord</h2>
          <img
            class="msgLogo"
            src="/img/discord_logo.svg"
            width="70"
            height="70"
            alt=""
            style="margin-bottom: -10px; margin-top: -5px"
          />
          <p class="desc">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae,
            impedit.
          </p>
        </div>
        <div
          class="setup_button"
          v-on:click="hello"
          v-bind:class="user.discord_id ? 'green_button' : 'darkblue_button'"
        >
          <a href="/discord" v-if="user.discord_id"> Set up </a>
          <div v-else v-on:click="loginDiscord">Log In Discord and set up</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    apiKey: [String, Boolean],
    key_sha256_checksum: [String, Boolean],
  },
  mounted() {
    console.log("Dashboard is mounted!");
    // Store apiKey if it is exists
    if (
      this.apiKey &&
      this.key_sha256_checksum &&
      this.apiKey !== "false" &&
      window.sha256(atob(this.apiKey)) == this.key_sha256_checksum
    ) {
      this.$cookies.set("apiKey", this.apiKey, 2419200);
      this.$cookies.set(
        "key_sha256_checksum",
        this.key_sha256_checksum,
        2419200
      );
      console.log("apiKey saved");
      // If api key does not exist or not matches checksum (re)generate it
    } else if (
      !this.$cookies.get("apiKey") ||
      !this.$cookies.get("key_sha256_checksum") ||
      this.$cookies.get("apiKey") == "false" ||
      !window.sha256(atob(this.$cookies.get("apiKey"))) ==
        this.$cookies.get("key_sha256_checksum")
    ) {
      console.debug("Accessing generating api keys");
      window.regenerateApiKey();
    }
  },
  methods: {
    hello() {
      console.log("azaza");
    },
    loginDiscord() {
      window.location = "/auth/services/discord/redirect";
    },
    loginTelegram() {
      window.location = "/auth/services/telegram/redirect";
    },
  },
};
</script>

<style>
</style>
