<script setup lang="ts">
import { RouterView } from "vue-router";
import ErrorsComponent from "./components/ErrorsComponent.vue";

import { computed } from "vue";
import { useRoute } from "vue-router";

const layout = computed(() => {
  return useRoute().meta.layout || "DefaultLayout";
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>

  <ErrorsComponent></ErrorsComponent>
</template>

<style global lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto");

@import "@/assets/scss/nullstyle";
@import "@/assets/scss/library";

* {
  scrollbar-color: rgba(0, 0, 0, 0.5) rgba(66, 64, 64, 0.75);
  /* «цвет ползунка» «цвет полосы скроллбара» */
  scrollbar-width: thin;
  /* толщина */
  font-family: Roboto, "Lucida Grande", Helvetica, Arial, sans-serif !important;
}

html {
  min-height: 100%;
  display: flex;
}

body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

body {
  background-color: #34383c;
  color: white;
  font-size: 14px;
}

#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none;
  color: white;
}

.link {
  color: #00aff4;

  &:hover {
    text-decoration: underline;
  }
}

footer {
  display: flex;
  width: 100%;
}

.content {
  flex: 1 0 auto;

  display: flex;
  flex-direction: column;

  align-items: center;

  margin: 20px 0;
  position: relative;

  width: 100%;
}

/* полоса прокрутки (скроллбар) */
::-webkit-scrollbar {
  width: 8px;
  /* ширина для вертикального скролла */
  background-color: rgba(66, 64, 64, 0.75);
}

/* ползунок скроллбара */
::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 16px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
  }
}

/* Стрелки */

::-webkit-scrollbar-button {
  &:vertical:start:decrement,
  &:vertical:end:increment,
  &:horizontal:start:decrement,
  &:horizontal:end:increment {
    display: none;
  }
}

.scrollbar_y,
.scrollbar_x {
  overflow-y: auto;
  scrollbar-color: rgba(0, 0, 0, 0.5) rgba(66, 64, 64, 0.75);
  /* «цвет ползунка» «цвет полосы скроллбара» */
  scrollbar-width: thin;
  /* толщина */
}

.languages li span,
._ft_language span {
  margin-right: 5px;
}

.separator_1 {
  width: 100%;
  height: 0;
  border-top: thin solid rgba(255, 255, 255, 0.85);
  align-self: center;
}
</style>
