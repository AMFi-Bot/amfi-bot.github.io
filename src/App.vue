<script setup>
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import ErrorsComponent from "./components/ErrorsComponent.vue";
</script>

<template>
  <HeaderComponent
    v-if="!popup_routers[$router.currentRoute.value.name]"
  ></HeaderComponent>

  <main>
    <RouterView />
  </main>

  <FooterComponent
    v-if="!popup_routers[$router.currentRoute.value.name]"
  ></FooterComponent>

  <ErrorsComponent></ErrorsComponent>
</template>

<script>
import _ from "lodash";

export default {
  async mounted() {
    let { useUserStore } = await import("./stores/user");
    const userStore = useUserStore();
    userStore.loadUser();
  },
  data() {
    return {
      popup_routers: {
        loading: true,
        discord_auth: true,
        telegram_auth: true,
      },
    };
  },
};
</script>
