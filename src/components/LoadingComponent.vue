<script setup lang="ts">
import { computed, useCssModule } from "vue";

const props = defineProps<{
  loaderType: "dotted" | "dualRing" | "line";
  loaderColor?: string;
  /**
   *
   * @param dottedAnimationType "cycled" - animation looped as cycle
   *  "threeIterations" - animation looped too but disappers for a 1 second after three iterations
   */
  dottedAnimationType?: "cycled" | "threeIterations";

  dotsOpacity?: string;
  dotsWidth?: string;
  dottedAnimationDuration?: string;
  lineWidth?: string;
}>();

const dotsAmount = computed(() => 9);
const dottedAnimationType = computed(
  () => props.dottedAnimationType || "threeIterations"
);
const dottedAnimationDuration = computed(
  () =>
    props.dottedAnimationDuration ||
    (dottedAnimationType.value === "threeIterations" ? "8s" : "3s")
);
const loaderColor = computed(() => props.loaderColor || "#dcddde");
const dotsOpacity = computed(() => props.dotsOpacity || "0.5");
const dotsWidth = computed(() => props.dotsWidth || "5px");
const lineWidth = computed(
  () => props.lineWidth || (props.loaderType === "line" ? "4px" : "6px")
);

const dottedModule =
  dottedAnimationType.value === "threeIterations"
    ? useCssModule("dotted")
    : useCssModule("dottedCycled");

const dualRingModule = useCssModule("dualRing");
const lineModule = useCssModule("line");
</script>

<template>
  <div
    :class="dottedModule['dotted-loader-wrapper']"
    v-if="loaderType === 'dotted'"
  >
    <div :class="dottedModule['dotted-loader']">
      <div
        class="dropdown-point"
        :style="{ animationDelay: `${-0.05 * n}s` }"
        v-for="n in dotsAmount"
        :key="n"
      ></div>
    </div>
  </div>
  <div :class="lineModule['line-loader']" v-else-if="loaderType === 'line'">
    <svg :class="lineModule['circular']" viewBox="25 25 50 50">
      <circle
        :class="lineModule['path']"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        :stroke-width="lineWidth"
        stroke-miterlimit="10"
      />
    </svg>
  </div>
  <div :class="dualRingModule['dual-ring-loader']" v-else></div>
</template>

<style module="dotted" lang="scss">
@import "@/assets/scss/library";

@keyframes dottedLoaderAnimation {
  from {
    transform: rotate(0deg);
    opacity: 0;
  }

  16% {
    opacity: v-bind("dotsOpacity");
  }

  32% {
    transform: rotate(360deg);
  }

  64% {
    transform: rotate(720deg);
  }
  80% {
    opacity: v-bind("dotsOpacity");
  }

  96% {
    transform: rotate(1080deg);
    opacity: 0;
  }

  to {
    transform: rotate(1080deg);
    opacity: 0;
  }
}

.dotted-loader-wrapper {
  display: block;
  position: relative;

  width: 100%;

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .dotted-loader {
    display: inline-block;
    width: 70%;
    height: 70%;
    margin: 15%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    border-radius: $circle;

    transform: rotate(225deg);

    div {
      content: "";

      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      display: flex;

      width: 100%;
      height: 100%;
      border-radius: $circle;

      opacity: v-bind("dotsOpacity");

      animation: dottedLoaderAnimation v-bind("dottedAnimationDuration")
        cubic-bezier(0.32, 0.91, 0.64, 0.03) infinite;

      &::after {
        content: "";
        display: block;
        width: v-bind("dotsWidth");
        height: v-bind("dotsWidth");
        border-radius: $circle;
        background: v-bind("loaderColor");
      }
    }
  }
}
</style>

<style module="dottedCycled" lang="scss">
@import "@/assets/scss/library";

@keyframes dottedLoaderCycledAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.dotted-loader-wrapper {
  display: block;
  position: relative;

  width: 100%;

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .dotted-loader {
    display: inline-block;
    width: 70%;
    height: 70%;
    margin: 15%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    border-radius: $circle;

    transform: rotate(225deg);

    div {
      content: "";

      position: absolute;
      top: 0;
      left: 0;

      display: flex;

      width: 100%;
      height: 100%;
      border-radius: $circle;

      opacity: v-bind("dotsOpacity");

      animation: dottedLoaderCycledAnimation v-bind("dottedAnimationDuration")
        cubic-bezier(0.32, 0.91, 0.64, 0.03) infinite;

      &::after {
        content: "";
        display: block;
        width: v-bind("dotsWidth");
        height: v-bind("dotsWidth");
        border-radius: $circle;
        background: v-bind("loaderColor");
      }
    }
  }
}
</style>

<style module="dualRing" lang="scss">
@keyframes dualRingLoader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.dual-ring-loader {
  display: block;
  position: relative;
  width: 100%;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    border-radius: 50%;
    border: v-bind("lineWidth") solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: dualRingLoader 1.2s linear infinite;
  }
}
</style>

<style module="line" lang="scss">
@import "@/assets/scss/library";

.line-loader {
  position: relative;
  margin: 0 auto;
  width: 100%;

  &:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .circular {
    animation: rotate 2s linear infinite;
    height: 100%;
    width: 100%;
    transform-origin: center center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    .path {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
      stroke-linecap: round;
      stroke: $font_color_1;
    }
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
