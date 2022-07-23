<script setup>
import "@/assets/scss/dashboard.scss";
</script>

<template>
  <div id="dashboard" class="dashboard" v-if="userStore">
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
          :class="userStore.telegram_id ? 'green_button' : ''"
        >
          <RouterLink to="/telegram/dashboard" v-if="userStore.telegram_id">
            Set up
          </RouterLink>
          <div v-else>
            <div class="telegram_login_mount">
              <div>Loading telegram authenticating...</div>
            </div>
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
          :class="userStore.discord_id ? 'green_button' : 'darkblue_button'"
        >
          <RouterLink to="/discord/dashboard" v-if="userStore.discord_id">
            Set up
          </RouterLink>
          <div v-else @click="userStore.login_discord">
            Log In Discord and set up
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async mounted() {
    console.log("Dashboard is mounted");

    const { useUserStore } = await import("../stores/user");

    const userStore = useUserStore();
    this.userStore = userStore;

    if (!userStore.telegram_id)
      setTimeout(() => {
        userStore.load_telegram_widget_script("telegram_login_mount");
      }, 1000);
  },
  data() {
    return {
      userStore: false,
    };
  },
  methods: {},
};
</script>
