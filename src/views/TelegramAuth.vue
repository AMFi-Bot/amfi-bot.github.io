<script setup lang="ts">
import LoadingComponent from "@/components/LoadingComponent.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
await userStore.login_telegram(window.location.search);
</script>

<template><LoadingComponent></LoadingComponent></template>
