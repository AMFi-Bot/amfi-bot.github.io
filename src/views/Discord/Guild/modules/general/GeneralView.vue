<script setup lang="ts">
import ModuleComponentVue from "@/components/Discord/Guild/ModuleComponent.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <ModuleComponentVue>
    <div :class="$style.welcome">General</div>
    <RouterLink :to="{ name: 'DGGLogging' }" :class="$style.logging"
      >Logging</RouterLink
    >
  </ModuleComponentVue>
</template>

<style module lang="scss">
@import "@/assets/scss/library";

.logging {
  background-color: #191919;

  border: 3px solid #5a0071;

  min-width: 80%;
  min-height: 50px;
  border-radius: 7px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  padding: 5px 15px;
}
</style>
