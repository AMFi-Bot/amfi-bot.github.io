<script setup lang="ts">
import { useDiscordGuildStore } from "@/stores/discordGuild";
import { ref } from "vue";
import { useRoute } from "vue-router";

const discordGuildStore = useDiscordGuildStore();

const id_param = useRoute().params.guild_id;
const guild_id = typeof id_param == "string" ? id_param : id_param[0];
const guild = ref(discordGuildStore.getGuild(guild_id));
</script>

<template>Dashboard</template>
