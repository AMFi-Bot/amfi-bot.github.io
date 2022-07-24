<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import ErrorsComponent from "./components/ErrorsComponent.vue";

import { useUserStore } from "./stores/user";
const userStore = useUserStore();
userStore.loadUser();
</script>

<template>
  <HeaderComponent></HeaderComponent>

  <main>
    <RouterView />
  </main>

  <FooterComponent></FooterComponent>

  <ErrorsComponent></ErrorsComponent>
</template>
