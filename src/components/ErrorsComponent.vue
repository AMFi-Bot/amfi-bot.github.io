<script setup lang="ts">
import { useErrorsStore } from "../stores/errors";
const errorsStore = useErrorsStore();
</script>

<template>
  <div :class="$style['errors-container']">
    <div
      :class="$style.error"
      v-for="error in errorsStore.errors"
      :key="error.id"
    >
      {{ error.text }} {{ error.count > 1 ? `(${error.count})` : "" }}

      <i
        :class="$style.removeError"
        @click="errorsStore.removeError(error.id)"
      ></i>
    </div>
  </div>
</template>

<style module lang="scss">
@import "@/assets/scss/library";

.errors-container {
  position: fixed;
  right: 20px;
  top: 90px;

  max-height: 300px;
  overflow-y: scroll;

  scrollbar-width: none;

  overflow-x: hidden;
}

.error {
  background-color: $red_color_1;
  border-radius: 10px;
  color: white;
  min-height: 70px;
  width: 190px;
  padding: 10px 20px;
  margin-bottom: 20px;

  word-wrap: break-word;

  position: relative;

  .removeError {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    font-size: 0;
    cursor: pointer;
    height: 25px;
    width: 25px;

    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 3px;
      height: 12px;
      background-color: #f0f0f0;
      transform: rotate(45deg) translate(-50%, -50%);
      transform-origin: top left;
      content: "";
    }

    &:after {
      transform: rotate(-45deg) translate(-50%, -50%);
    }
  }
}
</style>
