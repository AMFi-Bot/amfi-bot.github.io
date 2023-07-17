<script setup lang="ts">
import router from "@/router";
</script>

<template>
  <div :class="$style.module">
    <div :class="$style.previousPage" @click="router.back">
      <div :class="$style.arrow"></div>
    </div>

    <div :class="$style.board"><slot /></div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";

.module {
  width: 100%;
  display: flex;
  flex-direction: row;

  .previousPage {
    cursor: pointer;
    margin-top: -20px;
    margin-left: 5px;

    .arrow {
      position: relative;
      width: 40px;
      height: 40px;
      cursor: pointer;
      overflow: hidden;

      $arrow-color: $dark_3;
      $arrow-width: 4px;

      &:after {
        position: absolute;
        display: block;
        content: "";
        color: $arrow-color;
        width: 30px;
        height: 20px;
        top: calc($arrow-width / 2);
        border-bottom: solid $arrow-width;
        transform: translatex(4px);
      }

      &:before {
        position: absolute;
        display: block;
        content: "";
        color: $arrow-color;
        width: 20px;
        height: 20px;
        border-top: solid $arrow-width;
        border-left: solid $arrow-width;
        top: 50%;
        left: 2px;
        transform-origin: 0% 0%;
        transform: rotatez(-45deg);
      }
    }

    .home {
      margin-top: 10px;
    }
  }

  .board {
    display: flex;
    flex-direction: column;

    width: 100%;

    align-items: center;
  }
}
</style>
