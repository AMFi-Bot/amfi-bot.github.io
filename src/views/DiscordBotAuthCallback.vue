<script setup lang="ts">
import { loginGuildCallback } from "@/helpers/discord/loginGuild";
import LoadingView from "./LoadingView.vue";

await loginGuildCallback(window.location.search);
</script>

<template><LoadingView /></template>
