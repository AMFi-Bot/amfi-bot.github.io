<script setup lang="ts">
import LoadingComponent from "../components/LoadingComponent.vue";
import { useDiscordGuildsStore } from "../stores/discordGuilds";

const discordGuildsStore = useDiscordGuildsStore();
await discordGuildsStore.loginGuildCallback(window.location.search);
</script>

<template><LoadingComponent></LoadingComponent></template>
