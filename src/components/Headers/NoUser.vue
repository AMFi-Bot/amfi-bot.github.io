<script setup lang="ts">
import { onMounted } from "vue";

import { useUserStore } from "@/stores/user";
import DropdownComponent from "../DropdownComponent.vue";
const userStore = useUserStore();

onMounted(() => {
  userStore.load_telegram_widget_script("telegram_auth_mount_point");
});
</script>

<template>
  <!-- Adaptive design support -->
  <DropdownComponent
    :position="'bottom-right'"
    :elem_class="'login_dropdown'"
    :content_class="'login_panel'"
  >
    <template #dropdownTitle> Login </template>
    <template #default>
      <div class="login_type telegram telegram_auth_mount_point">
        <div>Loading telegram auth form...</div>
      </div>
      <div class="login_type discord" @click="userStore.login_discord()">
        <img src="/img/dslogo_white.svg" alt="" />
        <label class="login_title">Log in with Discord</label>
      </div>
    </template>
  </DropdownComponent>
</template>
