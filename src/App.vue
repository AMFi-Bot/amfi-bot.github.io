<script setup lang="ts">
import { RouterView } from "vue-router";

import ErrorsComponent from "./components/ErrorsComponent.vue";

import { useUserStore } from "./stores/user";
import { computed } from "vue";
import { useRoute } from "vue-router";
const userStore = useUserStore();
userStore.loadUser();

const layout = computed(() => {
  return useRoute().meta.layout || "DefaultLayout";
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>

  <ErrorsComponent></ErrorsComponent>
</template>
