<script setup lang="ts">
import { useErrorsStore } from "@/stores/errors";
import LoadingView from "./LoadingView.vue";
import { OAuth2Callback } from "@/helpers/auth/oauth2";

const errorsStore = useErrorsStore();

// Get an authorization code from the query string
const query_string = window.location.search;

const code_param = query_string
  .replace(/^\?/, "")
  .split("&")
  .find((val) => val.startsWith("code"));

if (!code_param) {
  errorsStore.addError(
    "A query string cannot be parsed to the authorization code"
  );
  throw new Error("authorization code param does not exist");
}

const code: string = code_param.split("=")[1];

await OAuth2Callback(code);
</script>

<template><LoadingView /></template>
