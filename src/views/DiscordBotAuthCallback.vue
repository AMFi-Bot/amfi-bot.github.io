<script setup lang="ts">
import { registerGuildCallback } from "@/helpers/discord/loginGuild";
import LoadingView from "./LoadingView.vue";

await registerGuildCallback(window.location.search);
</script>

<template><LoadingView /></template>
