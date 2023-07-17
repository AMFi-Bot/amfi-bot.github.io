<script setup lang="ts"></script>

<template>
  <div :class="$style.board">
    <div :class="$style.welcome">Guild Dashboard</div>
    <RouterLink :to="{ name: 'DiscordGuildGeneral' }" :class="$style.general"
      >General</RouterLink
    >
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";
.board {
  display: flex;
  flex-direction: column;

  width: 100%;

  align-items: center;

  .general {
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
}
</style>
