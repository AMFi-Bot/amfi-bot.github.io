<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <HeaderComponent></HeaderComponent>

  <main>
    <slot />
  </main>

  <FooterComponent></FooterComponent>
</template>
