<script setup lang="ts">
import LoadingComponentVue from "../components/LoadingComponent.vue";
</script>

<template>
  <div class="loaderView">
    <LoadingComponentVue
      :loader-type="'dotted'"
      :dotted-animation-duration="'15s'"
    ></LoadingComponentVue>
  </div>
</template>

<style lang="scss">
.loaderView {
  min-width: 100px;
  min-height: 100px;

  @media (min-width: 300px) {
    width: 100px;
    height: 100px;
  }
  @media (min-width: 600px) {
    width: 300px;
    height: 300px;

    .dropdown-point {
      &::after {
        width: 10px !important;
        height: 10px !important;
      }
    }
  }
  @media (min-width: 900px) {
    width: 500px;
    height: 500px;

    .dropdown-point {
      &::after {
        width: 20px !important;
        height: 20px !important;
      }
    }
  }
}
</style>
