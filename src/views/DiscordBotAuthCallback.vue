<script setup lang="ts">
import { useDiscordGuildsStore } from "../stores/discordGuilds";
import LoadingView from "./LoadingView.vue";

const discordGuildsStore = useDiscordGuildsStore();
await discordGuildsStore.loginGuildCallback(window.location.search);
</script>

<template><LoadingView /></template>
