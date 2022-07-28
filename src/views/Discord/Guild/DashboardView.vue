<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild";
import { ref } from "vue";
import { useRoute } from "vue-router";

const discordGuildStore = useDiscordGuildStore();

const guild = ref(
  discordGuildStore.getGuild(<string>useRoute().params.guild_id)
);
</script>

<template>Dashboard</template>
