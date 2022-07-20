<script setup>
import LoadingComponent from "../components/LoadingComponent.vue";
</script>

<template><LoadingComponent></LoadingComponent></template>

<script>
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
export default {
  async mounted() {
    await userStore.discord_callback(window.location.search);
  },
};
</script>
