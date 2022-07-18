<script setup>
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import ErrorsComponent from "./components/ErrorsComponent.vue";
</script>

<template>
  <HeaderComponent></HeaderComponent>

  Hello World
  <main>
    <RouterView />
  </main>

  <FooterComponent></FooterComponent>

  <ErrorsComponent></ErrorsComponent>
</template>

<script>
import _ from "lodash";

export default {
  async mounted() {
    let { default: js_cookie } = await import("js-cookie");
    let { useUserStore, noUser } = await import("./stores/user");

    if (js_cookie.get("XSRF-TOKEN")) {
      const userStore = useUserStore();
      userStore.loadUser();
    }
  },
};
</script>
