<template>Loading...</template>

<script>
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
export default {
  async mounted() {
    await userStore.login_telegram(window.location.search);
  },
};
</script>
