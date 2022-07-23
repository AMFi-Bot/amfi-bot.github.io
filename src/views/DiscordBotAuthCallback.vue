<script setup>
import LoadingComponent from "../components/LoadingComponent.vue";
</script>

<template><LoadingComponent></LoadingComponent></template>

<script>
import { useDiscordGuildsStore } from "../stores/discordGuilds";
const discordGuildsStore = useDiscordGuildsStore();
export default {
  async mounted() {
    await discordGuildsStore.loginGuildCallback(window.location.search);
  },
};
</script>
