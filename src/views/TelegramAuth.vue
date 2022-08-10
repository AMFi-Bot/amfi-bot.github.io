<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import LoadingView from "./LoadingView.vue";

const userStore = useUserStore();
userStore.login_telegram(window.location.search);
</script>

<template><LoadingView /></template>
