<script setup lang="ts">
import { useUserStore } from "../stores/user";
import LoadingView from "./LoadingView.vue";

const userStore = useUserStore();
await userStore.discord_callback(window.location.search);
</script>

<template><LoadingView /></template>
