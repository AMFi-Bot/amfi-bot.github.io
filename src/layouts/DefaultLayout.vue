<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
  <HeaderComponent></HeaderComponent>

  <div class="content">
    <slot />
  </div>

  <FooterComponent></FooterComponent>
</template>
