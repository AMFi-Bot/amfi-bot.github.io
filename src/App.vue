<script setup>
import { RouterView } from "vue-router";
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
import ErrorsComponent from "./components/ErrorsComponent.vue";
</script>

<template>
  <HeaderComponent></HeaderComponent>

  Hello World
  <main>
    <RouterView />
  </main>

  <FooterComponent></FooterComponent>

  <ErrorsComponent></ErrorsComponent>
</template>
