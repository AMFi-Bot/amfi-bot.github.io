<script setup lang="ts">
import { useErrorsStore } from "@/stores/errors";
import { useUserStore } from "../stores/user";
import LoadingView from "./LoadingView.vue";

const userStore = useUserStore();
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

await userStore.loginFlowCallback(code);
</script>

<template><LoadingView /></template>
