<script setup lang="ts">
import { onMounted } from "vue";

import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

onMounted(() => {
  userStore.load_telegram_widget_script("telegram_auth_mount_point");
}); //
</script>

<template>
  <div class="login_panel">
    <div class="login_type discord">
      <img src="/img/dslogo_white.svg" alt="" />
      <label class="login_title">Log in with Discord</label>
    </div>
    <div class="login_type telegram telegram_auth_mount_point">
      <div>Loading telegram auth form...</div>
    </div>
  </div>
</template>
