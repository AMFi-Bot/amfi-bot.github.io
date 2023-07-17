<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goUp() {
  const path = router.currentRoute.value.path.endsWith("/") ? "../" : "./";

  if (router.resolve(path).meta.type !== "discordGuild")
    throw new Error("Cannot navigate outside of discord guild scope");
  else router.push(path);
}
</script>

<template>
  <div :class="$style.module">
    <div :class="$style.previousPage" @click="goUp">
      <div :class="$style.arrow"></div>
    </div>

    <div :class="[$style.board, 'discordGuildModule']">
      <div><slot /></div>
    </div>
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

    > div {
      display: flex;
      flex-direction: column;

      align-items: center;

      min-width: 80%;

      background-color: $dark_2;
      border-radius: 8px;

      padding: 20px;
    }
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/library";

.discordGuildModule {
  .toggler {
    border: 2px solid $dark_3;
    height: 54px;
    width: 104px;
  }
}
</style>
