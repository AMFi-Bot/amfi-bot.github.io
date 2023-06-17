<script setup lang="ts">
import { registerGuildCallback } from "@/helpers/discord/loginGuild";
import LoadingView from "./LoadingView.vue";

const uri_query_arr = window.location.href.split("?");

const redirect_uri = uri_query_arr[0],
  query_string = uri_query_arr[1];

await registerGuildCallback(redirect_uri, query_string);
</script>

<template><LoadingView /></template>
