<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<template>
  <div :class="$style.login_button" @click="userStore.loginFlow()">Log In</div>
</template>

<style module lang="scss">
@import "/src/assets/scss/library";

.login_button {
  @include button(
    $lightblue_button_normal,
    $lightblue_button_hover,
    $lightblue_button_pressed
  );
  @include setup_button;
  padding: 10px 20px;
}
</style>
