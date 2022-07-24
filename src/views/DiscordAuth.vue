<script setup lang="ts">
import LoadingComponent from "../components/LoadingComponent.vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
await userStore.discord_callback(window.location.search);
</script>

<template><LoadingComponent></LoadingComponent></template>
