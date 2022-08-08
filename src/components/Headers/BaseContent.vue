<script setup lang="ts">
import DropdownComponent from "../DropdownComponent.vue";
</script>

<template>
  <div class="header">
    <div class="menu_panel">
      <DropdownComponent
        position="bottom-left"
        :elem_class="'menu_dropdown'"
        :content_class="'menu_ops'"
      >
        <template #dropdownTitle>...</template>
        <template #default>
          <a href="/tutorials">
            <span>{{ $t("tutorials") }}</span>
          </a>

          <a href="/premium" class="premium">
            <span>{{ $t("premium") }}</span>
            <img src="/img/premium-yellow.svg" class="premium_icon" alt="" />
          </a>
        </template>
      </DropdownComponent>
      <RouterLink class="bot_name" to="/">AMFi-Bot</RouterLink>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>
